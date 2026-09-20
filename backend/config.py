from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    supabase_url: str = ""
    supabase_key: str = ""
    use_mock_data: bool = True  # Fallback to mock data if Supabase unavailable
    app_name: str = "EcoRoute AI API"
    app_version: str = "1.0.0"

    class Config:
        env_file = ".env"

settings = Settings()