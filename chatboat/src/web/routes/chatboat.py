from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from fastapi.responses import StreamingResponse

from src.domain.application import Application

MAX_MESSAGES_PER_IP = 10
MAX_MESSAGE_LENGTH = 400
MAX_HISTORY_LENGTH = 8

class ChatRequest(BaseModel):
    message: str
    history: list = []

class ChatBoatRoutes:
    def __init__(self, application: Application) -> None:
        self._application = application
        self._ip_message_counts: dict[str, int] = {}
        self._ip_last_sent_at = {}

    def router(self) -> APIRouter:
        router=APIRouter()
        router.get("/chat")(self.get_random_suggestions)
        router.post("/chat")(self.send_message)
        router.get("/health")(self.check_health)
        return router

    def get_random_suggestions(self) -> dict:
        return {"suggestions": self._application.pick_random_suggestion()}

    def send_message(self, request: Request, body: ChatRequest) -> StreamingResponse:
        client_ip = self._get_client_ip(request)
        self._enforce_rate_limit(client_ip)
        self._validate_message(body.message)
        safe_history = self._trim_history(body.history)

        stream = self._application.send_message(body.message, safe_history)
        remaining_messages = self._get_remaining_messages(client_ip)
        response = StreamingResponse(stream, media_type="text/plain")
        response.headers["X-Remaining-Messages"] = str(remaining_messages)
        response.headers["X-Max-Messages"] = str(MAX_MESSAGES_PER_IP)
        return response

    def check_health(self,) -> dict:
        return {"ok": True}

    def _get_client_ip(self, request: Request) -> str:
        return request.client.host if request.client else "unknown"

    def _enforce_rate_limit(self, client_ip: str) -> None:
        count = self._ip_message_counts.get(client_ip, 0)
        if count >= MAX_MESSAGES_PER_IP:
            raise HTTPException(
                status_code=429,
                detail={
                    "message": "Message limit reached",
                    "remaining_messages": 0,
                    "max_messages": MAX_MESSAGES_PER_IP,
                },
            )
        self._ip_message_counts[client_ip] = count + 1

    def _validate_message(self, message: str) -> None:
        if len(message.strip()) > MAX_MESSAGE_LENGTH:
            raise HTTPException(status_code=400, detail="Message too long")

    def _trim_history(self, history: list) -> list:
        return history[-MAX_HISTORY_LENGTH:]

    def _get_remaining_messages(self, client_ip: str) -> int:
        count = self._ip_message_counts.get(client_ip, 0)
        return max(0, MAX_MESSAGES_PER_IP - count)
