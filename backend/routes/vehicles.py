from fastapi import APIRouter
from services import VehicleService

router = APIRouter(prefix="/vehicles", tags=["vehicles"])

@router.get("")
def list_vehicles():
    return {"data": VehicleService.list_vehicles(), "source": "mock"}