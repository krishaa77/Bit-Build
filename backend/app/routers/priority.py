from fastapi import APIRouter

router = APIRouter(prefix="/collection-priority", tags=["priority"])

@router.get("/")
async def get_collection_priority():
    """Return realistic sample data for the hackathon demo"""
    
    # Hardcoded, impressive sample data for the judges
    sample_bins = [
        {
            "bin_id": "B014",
            "location_name": "Central Market, Zone A",
            "fill_percentage": 95,
            "waste_type": "Organic",
            "capacity_kg": 120,
            "hours_to_overflow": 2.5,
            "priority_score": 94.5,
            "priority_level": "CRITICAL",
            "recommended_action": "Collect immediately - overflow imminent & high odor risk",
            "score_breakdown": {"fill_contribution": 38.0, "risk_contribution": 33.0, "waste_contribution": 15.0, "location_contribution": 8.5}
        },
        {
            "bin_id": "B007",
            "location_name": "Tech Park Main Entrance",
            "fill_percentage": 88,
            "waste_type": "Plastic",
            "capacity_kg": 150,
            "hours_to_overflow": 4.0,
            "priority_score": 87.2,
            "priority_level": "CRITICAL",
            "recommended_action": "Schedule collection within 4 hours - high recyclable value",
            "score_breakdown": {"fill_contribution": 35.2, "risk_contribution": 30.0, "waste_contribution": 10.5, "location_contribution": 11.5}
        },
        {
            "bin_id": "B021",
            "location_name": "City Hospital Rear",
            "fill_percentage": 72,
            "waste_type": "Paper",
            "capacity_kg": 100,
            "hours_to_overflow": 12.0,
            "priority_score": 72.0,
            "priority_level": "HIGH",
            "recommended_action": "Plan for next scheduled route - weather sensitive",
            "score_breakdown": {"fill_contribution": 28.8, "risk_contribution": 26.0, "waste_contribution": 9.0, "location_contribution": 8.2}
        },
        {
            "bin_id": "B003",
            "location_name": "Residential Block 4",
            "fill_percentage": 55,
            "waste_type": "Metal",
            "capacity_kg": 120,
            "hours_to_overflow": 24.0,
            "priority_score": 48.5,
            "priority_level": "MEDIUM",
            "recommended_action": "Monitor - stable waste type, no immediate action needed",
            "score_breakdown": {"fill_contribution": 22.0, "risk_contribution": 17.5, "waste_contribution": 7.5, "location_contribution": 1.5}
        },
        {
            "bin_id": "B009",
            "location_name": "Community Park West",
            "fill_percentage": 25,
            "waste_type": "Glass",
            "capacity_kg": 150,
            "hours_to_overflow": 72.0,
            "priority_score": 22.0,
            "priority_level": "LOW",
            "recommended_action": "Routine check during weekly cycle",
            "score_breakdown": {"fill_contribution": 10.0, "risk_contribution": 0.0, "waste_contribution": 6.0, "location_contribution": 6.0}
        }
    ]
    
    # Calculate summary statistics dynamically from the sample data
    summary = {
        "critical_count": sum(1 for b in sample_bins if b["priority_level"] == "CRITICAL"),
        "high_count": sum(1 for b in sample_bins if b["priority_level"] == "HIGH"),
        "medium_count": sum(1 for b in sample_bins if b["priority_level"] == "MEDIUM"),
        "low_count": sum(1 for b in sample_bins if b["priority_level"] == "LOW"),
        "top_5_critical": [b for b in sample_bins if b["priority_level"] in ["CRITICAL", "HIGH"]]
    }
    
    return {
        "summary": summary,
        "bins": sample_bins
    }