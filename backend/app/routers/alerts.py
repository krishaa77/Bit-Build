from fastapi import APIRouter
from ..services.alerts_service import generate_alerts
from ..services.mock_data import get_all_bins_with_predictions

router = APIRouter(prefix="/alerts", tags=["alerts"])

@router.get("/")
async def get_alerts():
    """Get all active alerts"""
    bins_data = get_all_bins_with_predictions()
    alerts = generate_alerts(bins_data)
    
    summary = {
        "critical": sum(1 for a in alerts if a["severity"] == "CRITICAL"),
        "high": sum(1 for a in alerts if a["severity"] == "HIGH"),
        "medium": sum(1 for a in alerts if a["severity"] == "MEDIUM"),
        "total": len(alerts)
    }
    
    return {"alerts": alerts, "summary": summary}

@router.post("/{alert_id}/resolve")
async def resolve_alert(alert_id: str):
    """Mark alert as resolved"""
    return {"status": "resolved", "alert_id": alert_id}