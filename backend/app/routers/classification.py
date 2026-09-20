from fastapi import APIRouter, UploadFile, File, HTTPException
from ..services import classification_service
from typing import List

router = APIRouter(prefix="/classify-waste", tags=["classification"])

@router.post("/")
async def classify_waste(file: UploadFile = File(...)):
    """Upload waste image and get classification"""
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Read file
    contents = await file.read()
    if len(contents) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="Image too large (max 10MB)")
    
    try:
        result = classification_service.classify_image(contents)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")

@router.get("/statistics")
async def get_classification_stats():
    """Get waste classification statistics (mock data for now)"""
    # This will be replaced with real DB queries later
    return {
        "total_classifications": 156,
        "by_category": [
            {"category": "Plastic", "count": 50, "percentage": 32.1},
            {"category": "Organic", "count": 42, "percentage": 26.9},
            {"category": "Paper", "count": 30, "percentage": 19.2},
            {"category": "Glass", "count": 19, "percentage": 12.2},
            {"category": "Metal", "count": 11, "percentage": 7.1},
            {"category": "Other", "count": 4, "percentage": 2.6},
        ]
    }