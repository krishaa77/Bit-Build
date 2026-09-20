from datetime import datetime
from typing import List, Dict, Any

def generate_alerts(bins_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """Generate alerts based on bin data"""
    alerts = []
    
    for bin_data in bins_data:
        # Overflow risk alert
        if bin_data.get("hours_to_overflow", 999) < 12:
            alerts.append({
                "alert_id": f"ALT-{len(alerts)+1:03d}",
                "type": "OVERFLOW_RISK",
                "severity": "CRITICAL",
                "bin_id": bin_data.get("bin_id"),
                "location": bin_data.get("location_name", "Unknown"),
                "timestamp": datetime.now().isoformat(),
                "description": f"Bin {bin_data.get('bin_id')} predicted to overflow in {bin_data.get('hours_to_overflow', 0):.1f} hours",
                "recommended_action": "Schedule immediate collection",
                "resolved": False
            })
        
        # High fill alert
        if bin_data.get("fill_percentage", 0) > 90:
            alerts.append({
                "alert_id": f"ALT-{len(alerts)+1:03d}",
                "type": "HIGH_FILL",
                "severity": "HIGH",
                "bin_id": bin_data.get("bin_id"),
                "location": bin_data.get("location_name", "Unknown"),
                "timestamp": datetime.now().isoformat(),
                "description": f"Bin {bin_data.get('bin_id')} fill level at {bin_data.get('fill_percentage', 0)}%",
                "recommended_action": "Prioritize for next collection cycle",
                "resolved": False
            })
    
    # Add unusual waste generation alert (simulated)
    alerts.append({
        "alert_id": f"ALT-{len(alerts)+1:03d}",
        "type": "UNUSUAL_WASTE",
        "severity": "MEDIUM",
        "bin_id": "ZONE-3",
        "location": "Commercial Zone 3",
        "timestamp": datetime.now().isoformat(),
        "description": "Zone 3 generating 35% more waste than historical average",
        "recommended_action": "Consider increasing collection frequency in this zone",
        "resolved": False
    })
    
    return alerts