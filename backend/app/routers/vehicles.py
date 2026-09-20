from fastapi import APIRouter
from ..services import bin_service
router = APIRouter(prefix="/vehicles", tags=["vehicles"])
@router.get("")
def list_vehicles(): return {"data": bin_service.list_vehicles()}
