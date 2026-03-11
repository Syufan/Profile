from fastapi import APIRouter
from pydantic import BaseModel
from fastapi.responses import JSONResponse

from src.domain.application import Application

class ChatRequest(BaseModel):
    message: str

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

    def send_message(self, request: ChatRequest) -> JSONResponse:
        return JSONResponse(content={"message": self._application.send_message(request.message)})
