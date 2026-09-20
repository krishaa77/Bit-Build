import math
from typing import List, Dict, Any

# Sample depot location
DEPOT = {"latitude": 23.0225, "longitude": 72.5714, "name": "Central Depot"}

# Sample vehicles
VEHICLES = [
    {"vehicle_id": "V001", "capacity_kg": 1000, "status": "Available", "current_lat": 23.0225, "current_lng": 72.5714},
    {"vehicle_id": "V002", "capacity_kg": 1500, "status": "Available", "current_lat": 23.0350, "current_lng": 72.5800},
    {"vehicle_id": "V003", "capacity_kg": 800, "status": "Maintenance", "current_lat": 23.0100, "current_lng": 72.5600},
]

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two points in km"""
    R = 6371  # Earth's radius in km
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    a = math.sin(delta_phi/2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    
    return R * c

def optimize_route(selected_bins: List[Dict[str, Any]], vehicle_id: str) -> Dict[str, Any]:
    """
    Optimize collection route using nearest-neighbor heuristic
    (Simulates OR-Tools behavior for hackathon demo)
    """
    # Find vehicle
    vehicle = next((v for v in VEHICLES if v["vehicle_id"] == vehicle_id), None)
    if not vehicle:
        return {"error": "Vehicle not found"}
    
    if vehicle["status"] != "Available":
        return {"error": f"Vehicle {vehicle_id} is {vehicle['status']}"}
    
    # Filter bins by priority (Critical > High > Medium)
    priority_order = {"CRITICAL": 0, "HIGH": 1, "MEDIUM": 2, "LOW": 3}
    sorted_bins = sorted(selected_bins, key=lambda b: priority_order.get(b.get("priority_level", "LOW"), 3))
    
    # Nearest-neighbor algorithm
    route = [DEPOT]
    remaining_bins = sorted_bins.copy()
    current_lat = DEPOT["latitude"]
    current_lng = DEPOT["longitude"]
    total_distance = 0
    total_waste = 0
    
    while remaining_bins:
        # Find nearest bin
        nearest_bin = None
        nearest_dist = float('inf')
        
        for bin_data in remaining_bins:
            dist = haversine_distance(current_lat, current_lng, bin_data["latitude"], bin_data["longitude"])
            if dist < nearest_dist:
                nearest_dist = dist
                nearest_bin = bin_data
        
        # Add to route
        route.append(nearest_bin)
        total_distance += nearest_dist
        total_waste += nearest_bin.get("estimated_waste_kg", 50)
        current_lat = nearest_bin["latitude"]
        current_lng = nearest_bin["longitude"]
        remaining_bins.remove(nearest_bin)
    
    # Return to depot
    return_dist = haversine_distance(current_lat, current_lng, DEPOT["latitude"], DEPOT["longitude"])
    total_distance += return_dist
    route.append(DEPOT)
    
    # Calculate metrics
    capacity_utilization = (total_waste / vehicle["capacity_kg"]) * 100
    avg_speed_kmh = 30  # Assume 30 km/h in city
    travel_time_hours = total_distance / avg_speed_kmh
    
    return {
        "vehicle": vehicle,
        "route": route,
        "total_distance_km": round(total_distance, 2),
        "total_waste_kg": total_waste,
        "capacity_kg": vehicle["capacity_kg"],
        "utilization_percentage": round(capacity_utilization, 1),
        "estimated_time_hours": round(travel_time_hours, 2),
        "stops_count": len(route) - 2  # Exclude depot start/end
    }