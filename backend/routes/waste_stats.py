from fastapi import APIRouter
from services import DashboardService

router = APIRouter(prefix="/waste-statistics", tags=["waste-statistics"])

@router.get("")
def get_waste_statistics():
    return DashboardService.get_waste_statistics().model_dump()