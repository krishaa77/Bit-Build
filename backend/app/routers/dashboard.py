from fastapi import APIRouter
from ..services import bin_service
router = APIRouter(tags=["dashboard"])
@router.get("/dashboard")
def dashboard(): return bin_service.get_dashboard()
@router.get("/waste-statistics")
def waste_statistics(): return {"daily": [], "by_type": [], "collections": []}
