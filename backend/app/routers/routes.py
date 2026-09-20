from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..services.route_optimizer import optimize_route, VEHICLES

router = APIRouter(prefix="/optimize-route", tags=["routes"])

class RouteRequest(BaseModel):
    vehicle_id: str
    bins: List[dict]

@router.get("/vehicles")
async def get_vehicles():
    """Get available vehicles"""
    return {"vehicles": VEHICLES}

@router.post("/")
async def optimize_collection_route(request: RouteRequest):
    """Optimize collection route for selected bins"""
    try:
        result = optimize_route(request.bins, request.vehicle_id)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route optimization failed: {str(e)}")