from pydantic import BaseModel
from datetime import datetime
from typing import Optional

WASTE_TYPES = ["Plastic", "Paper", "Metal", "Glass", "Organic", "Other"]
BIN_STATUSES = ["Low", "Medium", "High", "Critical"]

def calculate_status(fill_percentage: float) -> str:
    """Auto-calculate bin status from fill percentage."""
    if fill_percentage <= 50:
        return "Low"
    elif fill_percentage <= 75:
        return "Medium"
    elif fill_percentage <= 89:
        return "High"
    else:
        return "Critical"

class Bin(BaseModel):
    id: Optional[str] = None
    bin_id: str
    location_name: str
    latitude: float
    longitude: float
    capacity_kg: float
    fill_percentage: float
    waste_type: str
    last_collection: Optional[datetime] = None
    created_at: Optional[datetime] = None

    @property
    def status(self) -> str:
        return calculate_status(self.fill_percentage)

    def model_dump_with_status(self) -> dict:
        data = self.model_dump()
        data["status"] = self.status
        return data

class BinDetail(Bin):
    predicted_overflow: str = "Coming Soon"
    recommended_action: str = "Monitor"

    @classmethod
    def from_bin(cls, bin: Bin) -> "BinDetail":
        status = bin.status
        if status == "Critical":
            action = "Collect Immediately"
        elif status == "High":
            action = "Schedule Collection Soon"
        elif status == "Medium":
            action = "Monitor Closely"
        else:
            action = "No Action Required"
        return cls(
            **bin.model_dump(),
            predicted_overflow="Coming Soon",
            recommended_action=action
        )

class Vehicle(BaseModel):
    id: Optional[str] = None
    vehicle_id: str
    capacity_kg: float
    current_load_kg: float
    latitude: float
    longitude: float
    status: str
    created_at: Optional[datetime] = None

class WasteRecord(BaseModel):
    id: Optional[str] = None
    bin_id: str
    waste_type: str
    quantity_kg: float
    recorded_at: Optional[datetime] = None

class Collection(BaseModel):
    id: Optional[str] = None
    bin_id: str
    vehicle_id: str
    collected_quantity_kg: float
    collection_time: Optional[datetime] = None

# Dashboard aggregates
class WasteOverTimePoint(BaseModel):
    date: str
    plastic: float
    paper: float
    metal: float
    glass: float
    organic: float
    other: float
    total: float

class WasteByTypePoint(BaseModel):
    type: str
    quantity: float
    color: str

class BinStatusDistribution(BaseModel):
    status: str
    count: int
    color: str

class DashboardStats(BaseModel):
    total_bins: int
    critical_bins: int
    high_priority_bins: int
    medium_priority_bins: int
    available_vehicles: int
    total_waste_collected_kg: float
    recycling_percentage: float
    active_alerts: int

class DashboardResponse(BaseModel):
    stats: DashboardStats
    waste_over_time: list[WasteOverTimePoint]
    waste_by_type: list[WasteByTypePoint]
    bin_status_distribution: list[BinStatusDistribution]
    data_source: str  # "live" or "mock"

class WasteStatisticsResponse(BaseModel):
    waste_by_type: list[WasteByTypePoint]
    waste_over_time: list[WasteOverTimePoint]
    total_waste_kg: float
    data_source: str