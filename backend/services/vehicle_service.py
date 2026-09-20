from database import get_client, is_supabase_available
from mock_data import MOCK_VEHICLES

class VehicleService:
    @classmethod
    def list_vehicles(cls) -> list[dict]:
        if is_supabase_available():
            client = get_client()
            resp = client.table("vehicles").select("*").order("vehicle_id").execute()
            return [dict(v) for v in resp.data]
        return [dict(v) for v in MOCK_VEHICLES]