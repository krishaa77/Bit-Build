import os
from dotenv import load_dotenv
load_dotenv()
USE_MOCK_DATA = os.getenv("USE_MOCK_DATA", "true").lower() == "true"
