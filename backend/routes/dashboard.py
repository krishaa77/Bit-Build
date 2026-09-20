from fastapi import APIRouter
from services import DashboardService

router = APIRouter(prefix="/dashboard", tags=["dashboard"])

@router.get("")
def get_dashboard():
    return DashboardService.get_dashboard().model_dump()