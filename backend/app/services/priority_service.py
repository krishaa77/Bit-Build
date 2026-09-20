from typing import List, Dict, Any

# Waste type urgency weights (0-1 scale)
WASTE_URGENCY = {
    "Organic": 1.0,      # Highest urgency - smells, pests
    "Plastic": 0.7,      # Medium-high - recyclable value
    "Paper": 0.6,        # Medium - weather sensitive
    "Metal": 0.5,        # Medium-low - stable
    "Glass": 0.4,        # Low - stable but heavy
    "Other": 0.3         # Lowest urgency
}

def calculate_priority_score(bin_data: Dict[str, Any]) -> Dict[str, Any]:
    """Calculate priority score using deterministic formula"""
    
    # 1. Current Fill Level (40%) - normalized to 0-100
    fill_score = bin_data.get("fill_percentage", 0) * 0.4
    
    # 2. Overflow Risk (35%) - inverse of hours to overflow
    hours_to_overflow = bin_data.get("hours_to_overflow", 999)
    if hours_to_overflow <= 0:
        risk_score = 35.0  # Already overflowing
    elif hours_to_overflow >= 48:
        risk_score = 0.0   # Safe for 2+ days
    else:
        # Linear scale: 0h=35pts, 48h=0pts
        risk_score = max(0, 35.0 * (1 - hours_to_overflow / 48))
    
    # 3. Waste Type Urgency (15%)
    waste_type = bin_data.get("waste_type", "Other")
    urgency_weight = WASTE_URGENCY.get(waste_type, 0.3)
    waste_score = urgency_weight * 15.0
    
    # 4. Location Factor (10%) - simplified as distance from depot
    # In production, this would use actual GPS coordinates
    location_factor = 0.5  # Default mid-range
    location_score = location_factor * 10.0
    
    # Calculate total score (0-100)
    total_score = min(100, max(0, fill_score + risk_score + waste_score + location_score))
    
    # Determine priority level
    if total_score >= 80:
        level = "CRITICAL"
        action = "Collect immediately - overflow imminent"
    elif total_score >= 60:
        level = "HIGH"
        action = "Schedule collection within 4 hours"
    elif total_score >= 40:
        level = "MEDIUM"
        action = "Plan for next scheduled route"
    else:
        level = "LOW"
        action = "Monitor - no immediate action needed"
    
    return {
        "bin_id": bin_data.get("bin_id"),
        "location_name": bin_data.get("location_name"),
        "fill_percentage": bin_data.get("fill_percentage", 0),
        "waste_type": waste_type,
        "capacity_kg": bin_data.get("capacity_kg"),
        "hours_to_overflow": hours_to_overflow,
        "priority_score": round(total_score, 1),
        "priority_level": level,
        "recommended_action": action,
        "score_breakdown": {
            "fill_contribution": round(fill_score, 1),
            "risk_contribution": round(risk_score, 1),
            "waste_contribution": round(waste_score, 1),
            "location_contribution": round(location_score, 1)
        }
    }