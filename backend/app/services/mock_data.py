from datetime import datetime, timedelta
_NOW = datetime.utcnow()
def _hours_ago(h: int) -> str:
    return (_NOW - timedelta(hours=h)).strftime("%Y-%m-%d %H:%M:%S")
_RAW_BINS = [
    ("B001", "Campus Gate", 22.56460, 72.92890, 100, 92, "Plastic", 2),
    ("B002", "Main Hostel", 22.56380, 72.93010, 150, 54, "Organic", 6),
    ("B003", "Library", 22.56510, 72.92750, 100, 31, "Paper", 12),
    ("B004", "Canteen Block A", 22.56420, 72.92960, 200, 96, "Organic", 1),
    ("B005", "Sports Ground", 22.56340, 72.92810, 120, 18, "Plastic", 24),
    ("B006", "Admin Building", 22.56490, 72.92830, 100, 78, "Paper", 4),
    ("B007", "Parking Lot North", 22.56530, 72.92920, 150, 42, "Metal", 10),
    ("B008", "Parking Lot South", 22.56320, 72.92980, 150, 66, "Plastic", 8),
    ("B009", "Research Lab", 22.56475, 72.92790, 80, 88, "Glass", 3),
    ("B010", "Auditorium", 22.56400, 72.92870, 180, 25, "Other", 18),
    ("B011", "Faculty Quarters", 22.56360, 72.92760, 120, 71, "Organic", 5),
    ("B012", "Guest House", 22.56550, 72.92860, 100, 48, "Paper", 14),
    ("B013", "Medical Center", 22.56440, 72.93040, 90, 94, "Other", 1),
    ("B014", "Workshop", 22.56390, 72.92720, 160, 57, "Metal", 9),
    ("B015", "Boys Hostel Block B", 22.56310, 72.93050, 180, 83, "Organic", 3),
    ("B016", "Girls Hostel Block A", 22.56290, 72.92900, 170, 39, "Plastic", 16),
    ("B017", "Central Lawn", 22.56430, 72.92850, 130, 12, "Organic", 30),
    ("B018", "Bus Stop", 22.56570, 72.92970, 110, 74, "Plastic", 6),
    ("B019", "Staff Canteen", 22.56450, 72.92990, 140, 91, "Organic", 2),
    ("B020", "Innovation Hub", 22.56500, 72.92810, 100, 62, "Paper", 7),
]
def get_bins():
    from app.utils.status import compute_status
    bins = []
    for b in _RAW_BINS:
        bin_id, loc, lat, lng, cap, fill, wtype, h = b
        bins.append({"bin_id": bin_id, "location_name": loc, "latitude": lat, "longitude": lng, "capacity_kg": cap, "fill_percentage": fill, "waste_type": wtype, "last_collection": _hours_ago(h), "status": compute_status(fill), "created_at": _hours_ago(24 * 30)})
    return bins
def get_vehicles():
    return [{"vehicle_id": "V001", "capacity_kg": 1000, "current_load_kg": 420, "latitude": 22.56410, "longitude": 72.92840, "status": "Available"}, {"vehicle_id": "V002", "capacity_kg": 1500, "current_load_kg": 850, "latitude": 22.56470, "longitude": 72.92940, "status": "Collecting"}, {"vehicle_id": "V003", "capacity_kg": 1200, "current_load_kg": 60, "latitude": 22.56350, "longitude": 72.92780, "status": "Returning"}]
def get_daily_waste():
    return [{"date": d, "quantity_kg": q} for d, q in zip(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], [1240, 1380, 1510, 1420, 1680, 1820, 1590])]
def get_waste_by_type():
    return [{"waste_type": "Plastic", "quantity_kg": 2840}, {"waste_type": "Organic", "quantity_kg": 3620}, {"waste_type": "Paper", "quantity_kg": 1980}, {"waste_type": "Metal", "quantity_kg": 620}, {"waste_type": "Glass", "quantity_kg": 410}, {"waste_type": "Other", "quantity_kg": 890}]
def get_collections():
    return [{"id": 1, "bin_id": "B004", "vehicle_id": "V002", "collected_quantity_kg": 180, "collection_time": _hours_ago(1)}, {"id": 2, "bin_id": "B013", "vehicle_id": "V002", "collected_quantity_kg": 85, "collection_time": _hours_ago(1)}]
