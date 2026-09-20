"""
Simulated prototype data for EcoRoute AI Version 1.
All data is MOCK — not live municipal or IoT data.
Coordinates are clustered around a demo campus area (Ahmedabad, India region).
"""
from datetime import datetime, timedelta

# Campus center ~ 22.5646, 72.9289
MOCK_BINS = [
    {"bin_id": "B001", "location_name": "Campus Gate",         "latitude": 22.5646, "longitude": 72.9289, "capacity_kg": 100, "fill_percentage": 92, "waste_type": "Plastic",  "last_collection": datetime.now() - timedelta(hours=14)},
    {"bin_id": "B002", "location_name": "Main Hostel",         "latitude": 22.5638, "longitude": 72.9301, "capacity_kg": 150, "fill_percentage": 54, "waste_type": "Organic",  "last_collection": datetime.now() - timedelta(hours=6)},
    {"bin_id": "B003", "location_name": "Library",             "latitude": 22.5651, "longitude": 72.9275, "capacity_kg": 100, "fill_percentage": 31, "waste_type": "Paper",    "last_collection": datetime.now() - timedelta(hours=2)},
    {"bin_id": "B004", "location_name": "Admin Building",      "latitude": 22.5660, "longitude": 72.9295, "capacity_kg": 120, "fill_percentage": 78, "waste_type": "Paper",    "last_collection": datetime.now() - timedelta(hours=10)},
    {"bin_id": "B005", "location_name": "Sports Complex",      "latitude": 22.5625, "longitude": 72.9270, "capacity_kg": 200, "fill_percentage": 95, "waste_type": "Plastic",  "last_collection": datetime.now() - timedelta(hours=20)},
    {"bin_id": "B006", "location_name": "Cafeteria",           "latitude": 22.5642, "longitude": 72.9310, "capacity_kg": 180, "fill_percentage": 88, "waste_type": "Organic",  "last_collection": datetime.now() - timedelta(hours=8)},
    {"bin_id": "B007", "location_name": "Parking Lot A",       "latitude": 22.5670, "longitude": 72.9260, "capacity_kg": 150, "fill_percentage": 42, "waste_type": "Other",    "last_collection": datetime.now() - timedelta(hours=4)},
    {"bin_id": "B008", "location_name": "Parking Lot B",       "latitude": 22.5675, "longitude": 72.9320, "capacity_kg": 150, "fill_percentage": 67, "waste_type": "Metal",    "last_collection": datetime.now() - timedelta(hours=12)},
    {"bin_id": "B009", "location_name": "Engineering Block",   "latitude": 22.5655, "longitude": 72.9305, "capacity_kg": 120, "fill_percentage": 83, "waste_type": "Plastic",  "last_collection": datetime.now() - timedelta(hours=9)},
    {"bin_id": "B010", "location_name": "Science Block",       "latitude": 22.5630, "longitude": 72.9280, "capacity_kg": 100, "fill_percentage": 25, "waste_type": "Glass",    "last_collection": datetime.now() - timedelta(hours=1)},
    {"bin_id": "B011", "location_name": "Arts Block",          "latitude": 22.5620, "longitude": 72.9295, "capacity_kg": 100, "fill_percentage": 48, "waste_type": "Paper",    "last_collection": datetime.now() - timedelta(hours=5)},
    {"bin_id": "B012", "location_name": "Medical Center",      "latitude": 22.5665, "longitude": 72.9315, "capacity_kg": 80,  "fill_percentage": 91, "waste_type": "Other",    "last_collection": datetime.now() - timedelta(hours=18)},
    {"bin_id": "B013", "location_name": "Student Center",      "latitude": 22.5640, "longitude": 72.9265, "capacity_kg": 140, "fill_percentage": 72, "waste_type": "Plastic",  "last_collection": datetime.now() - timedelta(hours=7)},
    {"bin_id": "B014", "location_name": "Auditorium",          "latitude": 22.5615, "longitude": 72.9310, "capacity_kg": 160, "fill_percentage": 58, "waste_type": "Paper",    "last_collection": datetime.now() - timedelta(hours=11)},
    {"bin_id": "B015", "location_name": "Research Lab",        "latitude": 22.5680, "longitude": 72.9285, "capacity_kg": 90,  "fill_percentage": 96, "waste_type": "Glass",    "last_collection": datetime.now() - timedelta(hours=22)},
    {"bin_id": "B016", "location_name": "Canteen",             "latitude": 22.5635, "longitude": 72.9325, "capacity_kg": 200, "fill_percentage": 81, "waste_type": "Organic",  "last_collection": datetime.now() - timedelta(hours=6)},
    {"bin_id": "B017", "location_name": "Gym",                 "latitude": 22.5628, "longitude": 72.9255, "capacity_kg": 100, "fill_percentage": 37, "waste_type": "Plastic",  "last_collection": datetime.now() - timedelta(hours=3)},
    {"bin_id": "B018", "location_name": "Swimming Pool",       "latitude": 22.5618, "longitude": 72.9265, "capacity_kg": 80,  "fill_percentage": 63, "waste_type": "Other",    "last_collection": datetime.now() - timedelta(hours=9)},
    {"bin_id": "B019", "location_name": "Faculty Quarters",    "latitude": 22.5672, "longitude": 72.9305, "capacity_kg": 120, "fill_percentage": 44, "waste_type": "Organic",  "last_collection": datetime.now() - timedelta(hours=5)},
    {"bin_id": "B020", "location_name": "Main Road Junction",  "latitude": 22.5650, "longitude": 72.9330, "capacity_kg": 180, "fill_percentage": 76, "waste_type": "Metal",    "last_collection": datetime.now() - timedelta(hours=13)},
]

MOCK_VEHICLES = [
    {"vehicle_id": "V001", "capacity_kg": 1000, "current_load_kg": 420, "latitude": 22.5640, "longitude": 72.9290, "status": "Available"},
    {"vehicle_id": "V002", "capacity_kg": 1500, "current_load_kg": 850, "latitude": 22.5655, "longitude": 72.9310, "status": "Collecting"},
    {"vehicle_id": "V003", "capacity_kg": 1200, "current_load_kg": 120, "latitude": 22.5625, "longitude": 72.9280, "status": "Available"},
]

# Generate waste records for last 7 days
def _generate_waste_records():
    records = []
    base_date = datetime.now()
    waste_types = ["Plastic", "Paper", "Metal", "Glass", "Organic", "Other"]
    # Average daily kg per type (realistic campus scale)
    daily_avg = {"Plastic": 180, "Paper": 140, "Metal": 45, "Glass": 35, "Organic": 260, "Other": 60}
    for day_offset in range(7):
        date = base_date - timedelta(days=6-day_offset)
        for wtype in waste_types:
            base = daily_avg[wtype]
            # Small daily variance
            variance = (day_offset * 7 + hash(wtype) % 30) - 15
            qty = max(10, base + variance)
            records.append({
                "bin_id": f"B{(day_offset % 20) + 1:03d}",
                "waste_type": wtype,
                "quantity_kg": qty,
                "recorded_at": date.replace(hour=18, minute=0, second=0, microsecond=0)
            })
    return records

MOCK_WASTE_RECORDS = _generate_waste_records()

MOCK_COLLECTIONS = [
    {"bin_id": "B003", "vehicle_id": "V001", "collected_quantity_kg": 31,  "collection_time": datetime.now() - timedelta(hours=2)},
    {"bin_id": "B010", "vehicle_id": "V001", "collected_quantity_kg": 25,  "collection_time": datetime.now() - timedelta(hours=1)},
    {"bin_id": "B002", "vehicle_id": "V002", "collected_quantity_kg": 81,  "collection_time": datetime.now() - timedelta(hours=6)},
    {"bin_id": "B016", "vehicle_id": "V002", "collected_quantity_kg": 164, "collection_time": datetime.now() - timedelta(hours=6)},
    {"bin_id": "B017", "vehicle_id": "V003", "collected_quantity_kg": 37,  "collection_time": datetime.now() - timedelta(hours=3)},
]

# Precomputed dashboard aggregates
def _build_dashboard():
    from models.schemas import (
        DashboardStats, WasteOverTimePoint, WasteByTypePoint,
        BinStatusDistribution, DashboardResponse, calculate_status
    )

    # Bin status distribution
    status_counts = {"Low": 0, "Medium": 0, "High": 0, "Critical": 0}
    for b in MOCK_BINS:
        status_counts[calculate_status(b["fill_percentage"])] += 1

    status_distribution = [
        BinStatusDistribution(status="Low",      count=status_counts["Low"],      color="#10b981"),
        BinStatusDistribution(status="Medium",   count=status_counts["Medium"],   color="#eab308"),
        BinStatusDistribution(status="High",     count=status_counts["High"],     color="#f97316"),
        BinStatusDistribution(status="Critical", count=status_counts["Critical"], color="#ef4444"),
    ]

    # Waste by type (sum of records)
    type_totals = {t: 0.0 for t in ["Plastic", "Paper", "Metal", "Glass", "Organic", "Other"]}
    for r in MOCK_WASTE_RECORDS:
        type_totals[r["waste_type"]] += r["quantity_kg"]

    type_colors = {
        "Plastic": "#3b82f6", "Paper": "#f59e0b", "Metal": "#6b7280",
        "Glass": "#06b6d4", "Organic": "#10b981", "Other": "#8b5cf6"
    }
    waste_by_type = [
        WasteByTypePoint(type=t, quantity=round(type_totals[t], 1), color=type_colors[t])
        for t in type_totals
    ]

    # Waste over time (last 7 days)
    daily_totals = {}
    for r in MOCK_WASTE_RECORDS:
        day = r["recorded_at"].strftime("%Y-%m-%d")
        if day not in daily_totals:
            daily_totals[day] = {t: 0.0 for t in type_totals}
        daily_totals[day][r["waste_type"]] += r["quantity_kg"]

    waste_over_time = []
    for day in sorted(daily_totals.keys()):
        totals = daily_totals[day]
        total = sum(totals.values())
        waste_over_time.append(WasteOverTimePoint(
            date=day,
            plastic=round(totals["Plastic"], 1),
            paper=round(totals["Paper"], 1),
            metal=round(totals["Metal"], 1),
            glass=round(totals["Glass"], 1),
            organic=round(totals["Organic"], 1),
            other=round(totals["Other"], 1),
            total=round(total, 1),
        ))

    total_waste = sum(r["quantity_kg"] for r in MOCK_WASTE_RECORDS)
    recyclable = sum(type_totals[t] for t in ["Plastic", "Paper", "Metal", "Glass"])
    recycling_pct = (recyclable / total_waste * 100) if total_waste > 0 else 0

    stats = DashboardStats(
        total_bins=len(MOCK_BINS),
        critical_bins=status_counts["Critical"],
        high_priority_bins=status_counts["High"],
        medium_priority_bins=status_counts["Medium"],
        available_vehicles=sum(1 for v in MOCK_VEHICLES if v["status"] == "Available"),
        total_waste_collected_kg=round(sum(c["collected_quantity_kg"] for c in MOCK_COLLECTIONS), 1),
        recycling_percentage=round(recycling_pct, 1),
        active_alerts=status_counts["Critical"],
    )

    return DashboardResponse(
        stats=stats,
        waste_over_time=waste_over_time,
        waste_by_type=waste_by_type,
        bin_status_distribution=status_distribution,
        data_source="mock",
    )

MOCK_DASHBOARD = _build_dashboard()