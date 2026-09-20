from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings

# Import existing routers
from routes import bins_router, vehicles_router, dashboard_router, waste_stats_router

# Import the new routers from app.routers
from app.routers.classification import router as classification_router
from app.routers.priority import router as priority_router
from app.routers.routes import router as routes_router
from app.routers.alerts import router as alerts_router  # <-- NEW LINE

app = FastAPI(title=settings.app_name, version=settings.app_version)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(bins_router)
app.include_router(vehicles_router)
app.include_router(waste_stats_router)
app.include_router(classification_router)
app.include_router(priority_router)
app.include_router(routes_router)
app.include_router(alerts_router)  # <-- NEW LINE

@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "status": "online",
        "data_source": "mock" if settings.use_mock_data else "supabase",
        "endpoints": [
            "/dashboard",
            "/bins",
            "/bins/{bin_id}",
            "/vehicles",
            "/waste-statistics",
            "/classify-waste",
            "/collection-priority",
            "/optimize-route",
            "/alerts",  # <-- MOVED HERE (Now Active)
        ],
        "future_endpoints": [
            "/predict-fill",
        ],
    }

@app.get("/health")
def health():
    return {"status": "ok"}