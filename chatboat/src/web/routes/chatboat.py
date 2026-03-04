from typing import Any

from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import HTMLResponse

class ChatBoatRoutes:
    def __init__(self) -> None:
        pass

    def router(self) -> APIRouter:
        router = APIRouter()
        router.get("/")(self.chatboat)
        return router

    def chatboat(self, request: Request) -> HTMLResponse:
        return HTMLResponse(content="Hello, World!")
