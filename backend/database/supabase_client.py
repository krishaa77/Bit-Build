from supabase import create_client, Client
from config import settings

_client: Client | None = None

def get_client() -> Client | None:
    global _client
    if _client is not None:
        return _client
    if not settings.supabase_url or not settings.supabase_key:
        return None
    try:
        _client = create_client(settings.supabase_url, settings.supabase_key)
        return _client
    except Exception:
        return None

def is_supabase_available() -> bool:
    return get_client() is not None