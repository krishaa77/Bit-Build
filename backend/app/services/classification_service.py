import torch
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import io
from datetime import datetime

# Waste category mapping (ImageNet classes -> Waste categories)
WASTE_CATEGORIES = {
    "Plastic": ["pop_bottle", "beer_bottle", "plastic_bag", "bucket", "lab_coat"],
    "Paper": ["cardboard_box", "envelope", "paper_towel", "notebook", "book"],
    "Metal": ["pop_can", "beer_can", "frying_pan", "pot", "knife"],
    "Glass": ["wine_bottle", "glass_container", "vase"],
    "Organic": ["banana", "apple", "broccoli", "carrot", "corn", "pizza", "pretzel", "hot_dog", "cake", "cookie"],
    "Other": ["trash_can", "recycling_bin", "other"]
}

# Handle recommendations
HANDLING_GUIDES = {
    "Plastic": {"recyclable": "YES", "handling": "Send to plastic recycling stream. Rinse before recycling."},
    "Paper": {"recyclable": "YES", "handling": "Send to paper recycling. Remove plastic coatings if possible."},
    "Metal": {"recyclable": "YES", "handling": "Send to metal recycling. Aluminum cans are highly recyclable."},
    "Glass": {"recyclable": "YES", "handling": "Send to glass recycling. Separate by color if possible."},
    "Organic": {"recyclable": "COMPOST", "handling": "Send to composting or organic waste processing."},
    "Other": {"recyclable": "NO", "handling": "Send to landfill or specialized waste processing."}
}

# Load pretrained model (cached)
_model = None
_device = None

def _get_model():
    global _model, _device
    if _model is None:
        _device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        _model = models.mobilenet_v2(weights=models.MobileNet_V2_Weights.IMAGENET1K_V1)
        _model.eval()
        _model.to(_device)
    return _model, _device

def _preprocess_image(image_bytes: bytes):
    """Preprocess image for MobileNetV2"""
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    preprocess = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    return preprocess(image).unsqueeze(0)

def _map_to_waste_category(class_idx: int, class_name: str) -> str:
    """Map ImageNet class to waste category"""
    class_name_lower = class_name.lower().replace("_", " ")
    
    for category, keywords in WASTE_CATEGORIES.items():
        for keyword in keywords:
            if keyword in class_name_lower:
                return category
    
    # Default based on common waste patterns
    if any(x in class_name_lower for x in ["bottle", "container", "bag"]):
        return "Plastic"
    elif any(x in class_name_lower for x in ["paper", "cardboard", "book"]):
        return "Paper"
    elif any(x in class_name_lower for x in ["can", "metal", "pan"]):
        return "Metal"
    elif any(x in class_name_lower for x in ["glass", "vase", "bottle"]):
        return "Glass"
    elif any(x in class_name_lower for x in ["food", "fruit", "vegetable", "pizza"]):
        return "Organic"
    
    return "Other"

def classify_image(image_bytes: bytes) -> dict:
    """Classify waste image and return prediction"""
    model, device = _get_model()
    
    # Preprocess
    input_tensor = _preprocess_image(image_bytes).to(device)
    
    # Predict
    with torch.no_grad():
        outputs = model(input_tensor)
        probabilities = F.softmax(outputs[0], dim=0)
        top5_prob, top5_idx = torch.topk(probabilities, 5)
    
    # Get top prediction
    top_idx = top5_idx[0].item()
    top_prob = top5_prob[0].item()
    
    # Get ImageNet class name
    from torchvision.models import MobileNet_V2_Weights
    weights = MobileNet_V2_Weights.IMAGENET1K_V1
    class_name = weights.meta["categories"][top_idx]
    
    # Map to waste category
    waste_category = _map_to_waste_category(top_idx, class_name)
    
    # Get handling info
    handling = HANDLING_GUIDES.get(waste_category, HANDLING_GUIDES["Other"])
    
    return {
        "category": waste_category,
        "confidence": round(top_prob * 100, 1),
        "imagenet_class": class_name.replace("_", " "),
        "recyclable": handling["recyclable"],
        "handling": handling["handling"],
        "timestamp": datetime.utcnow().isoformat()
    }