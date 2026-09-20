from models.schemas import DashboardResponse, WasteStatisticsResponse
from database import is_supabase_available
from mock_data import MOCK_DASHBOARD, MOCK_WASTE_RECORDS
from models.schemas import WasteByTypePoint, WasteOverTimePoint

class DashboardService:
    @classmethod
    def get_dashboard(cls) -> DashboardResponse:
        # In v1 we always return mock dashboard; future versions query Supabase.
        return MOCK_DASHBOARD

    @classmethod
    def get_waste_statistics(cls) -> WasteStatisticsResponse:
        d = MOCK_DASHBOARD
        total = sum(p.total for p in d.waste_over_time)
        return WasteStatisticsResponse(
            waste_by_type=d.waste_by_type,
            waste_over_time=d.waste_over_time,
            total_waste_kg=round(total, 1),
            data_source="mock",
        )