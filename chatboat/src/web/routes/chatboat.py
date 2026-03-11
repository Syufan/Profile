from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

from src.domain.application import Application

class ChatRequest(BaseModel):
    message: str
    history: list = []

class ChatBoatRoutes:
    def __init__(self, application: Application) -> None:
        self._application = application

    def router(self) -> APIRouter:
        router=APIRouter()
        router.get("/chat")(self.get_random_suggestions)
        router.post("/chat")(self.send_message)
        return router

    def get_random_suggestions(self) -> dict:
        return {"suggestions": self._application.pick_random_suggestion()}

    def send_message(self, request: ChatRequest) -> StreamingResponse:
        stream = self._application.send_message(request.message, request.history)
        return StreamingResponse(stream, media_type="text/plain")
