import os
import sys

import uvicorn
from dotenv import load_dotenv

from src.web.service import WebServer

def _build_webserver() -> WebServer:
    load_dotenv()
    return WebServer()

app= _build_webserver().get_app()

def main() -> None:
    uvicorn.run("src.web.maindev:app", host="0.0.0.0", port=8000, reload=True)

if __name__ == "__main__":
    main()
