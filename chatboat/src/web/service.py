from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.domain.application import Application
from src.web.routes.chatboat import ChatBoatRoutes

class WebServer:
    def __init__ (self, application: Application, allowed_origins: list[str]) -> None:
        self._application = application
        self._allowed_origins = allowed_origins
        self._app = self._build_fastapi()

    def _build_fastapi(self) -> FastAPI:
        app = FastAPI()
        self._configure_cors(app)

        chat_boat_router = ChatBoatRoutes(self._application).router()
        app.include_router(chat_boat_router, prefix="")

        return app

    def _configure_cors(self, app: FastAPI) -> None:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=self._allowed_origins,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    def get_app(self) -> FastAPI:
        return self._app
