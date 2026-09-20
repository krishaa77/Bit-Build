def compute_status(fill_percentage: float) -> str:
    fill = max(0.0, min(100.0, float(fill_percentage)))
    if fill <= 50: return "LOW"
    if fill <= 75: return "MEDIUM"
    if fill <= 89: return "HIGH"
    return "CRITICAL"
