from . import mock_data
def list_bins(): return mock_data.get_bins()
def get_bin(bin_id: str):
    for b in list_bins():
        if b["bin_id"] == bin_id: return b
    return None
def list_vehicles(): return mock_data.get_vehicles()
def get_dashboard():
    bins = list_bins()
    vehicles = list_vehicles()
    status_counts = {"LOW": 0, "MEDIUM": 0, "HIGH": 0, "CRITICAL": 0}
    for b in bins: status_counts[b["status"]] = status_counts.get(b["status"], 0) + 1
    total_collected = sum(c["collected_quantity_kg"] for c in mock_data.get_collections())
    total_waste = sum(t["quantity_kg"] for t in mock_data.get_waste_by_type())
    recyclable = sum(t["quantity_kg"] for t in mock_data.get_waste_by_type() if t["waste_type"] in ("Plastic", "Paper", "Metal", "Glass"))
    recycling_pct = round((recyclable / total_waste) * 100, 1) if total_waste else 0
    return {"summary": {"total_bins": len(bins), "critical_bins": status_counts["CRITICAL"], "high_priority_bins": status_counts["HIGH"], "medium_priority_bins": status_counts["MEDIUM"], "available_vehicles": sum(1 for v in vehicles if v["status"] == "Available"), "total_waste_collected_kg": total_collected, "recycling_percentage": recycling_pct, "active_alerts": status_counts["CRITICAL"]}, "waste_over_time": mock_data.get_daily_waste(), "waste_by_type": mock_data.get_waste_by_type(), "status_distribution": [{"status": k, "count": v} for k, v in status_counts.items()]}
