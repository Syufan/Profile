from pathlib import Path

from fastapi import FastAPI, Request
from starlette.templating import Jinja2Templates
from starlette.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from src.web.routes.chatboat import ChatBoatRoutes

class WebServer:
    def __init__ (self) -> None:
        self._app = self._build_fastapi()

    def _build_fastapi(self) -> FastAPI:
        app = FastAPI()

        chat_boat_router = ChatBoatRoutes().router()
        app.include_router(chat_boat_router, prefix="")

        return app

    def get_app(self) -> FastAPI:
        return self._app
