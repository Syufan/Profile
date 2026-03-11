import os

import uvicorn
from dotenv import load_dotenv

from src.web.service import WebServer
from src.domain.application import Application
from src.domain.openai_client import OpenAIClient

def _build_webserver() -> WebServer:
    load_dotenv()
    db_path = os.getenv("DB_PATH")
    allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
    app = Application(db_path,agent=OpenAIClient())
    return WebServer(application=app,allowed_origins=allowed_origins)

app = _build_webserver().get_app()

reload = os.getenv("ENV", "production") != "production"

def main() -> None:
    uvicorn.run("src.web.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=reload)

if __name__ == "__main__":
    main()
