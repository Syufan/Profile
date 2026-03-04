from fastapi import APIRouter

from src.domain.application import Application


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
