from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import bins, vehicles, dashboard

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(bins.router)
app.include_router(vehicles.router)

@app.get("/health")
def health():
    return {"status": "ok", "version": "1.0.0"}
