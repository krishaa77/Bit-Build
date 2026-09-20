from fastapi import APIRouter, HTTPException
from ..services import bin_service

router = APIRouter(prefix="/bins", tags=["bins"])

@router.get("")
def list_bins(): 
    return {"data": bin_service.list_bins(), "source": "mock"}

@router.get("/{bin_id}")
def get_bin(bin_id: str):
    b = bin_service.get_bin(bin_id)
    if not b: 
        raise HTTPException(status_code=404, detail="Bin not found")
    return {"data": b}