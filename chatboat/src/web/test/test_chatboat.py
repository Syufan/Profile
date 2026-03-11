import pytest
from fastapi import HTTPException

from src.web.routes.chatboat import ChatBoatRoutes, ChatRequest
import src.web.routes.chatboat as chatboat
from unittest.mock import MagicMock

def test_successfully_get_3_suggestions():
    mock_app = MagicMock()
    mock_app.pick_random_suggestion.return_value = ["hello", "hey", "okay"]
    routes = ChatBoatRoutes(mock_app)

    assert len(routes.get_random_suggestions()["suggestions"]) == 3
    mock_app.pick_random_suggestion.assert_called_once()

def test_send_message():
    mock_app = MagicMock()
    mock_app.send_message.return_value = iter(["Hello", " World"])
    routes = ChatBoatRoutes(mock_app)

    mock_request = MagicMock()
    mock_request.client.host = "127.0.0.1"
    body = ChatRequest(message="hello", history=[])

    result = routes.send_message(mock_request, body)

    mock_app.send_message.assert_called_once_with("hello", [])
    assert result.status_code == 200
    assert result.media_type == "text/plain"

def test_health_returns_ok():
    mock_app = MagicMock()
    routes = ChatBoatRoutes(mock_app)

    result = routes.check_health()

    assert result == {"ok": True}

def test_send_message_rejects_long_message():
    mock_app = MagicMock()
    routes = ChatBoatRoutes(mock_app)

    mock_request = MagicMock()
    mock_request.client.host = "127.0.0.1"
    body = ChatRequest(message="a" * 401, history=[])

    with pytest.raises(HTTPException) as exc:
        routes.send_message(mock_request, body)

    assert exc.value.status_code == 400
    assert exc.value.detail == "Message too long"

def test_send_message_rejects_when_rate_limit_reached(monkeypatch):
    mock_app = MagicMock()
    mock_app.send_message.return_value = iter(["Hello"])
    routes = ChatBoatRoutes(mock_app)

    mock_request = MagicMock()
    mock_request.client.host = "127.0.0.1"
    body = ChatRequest(message="hello", history=[])

    for _ in range(chatboat.MAX_MESSAGES_PER_IP):
        routes.send_message(mock_request, body)

    with pytest.raises(HTTPException) as exc:
        routes.send_message(mock_request, body)

    assert exc.value.status_code == 429
    assert exc.value.detail["message"] == "Message limit reached"
    assert exc.value.detail["remaining_messages"] == 0
    assert exc.value.detail["max_messages"] == chatboat.MAX_MESSAGES_PER_IP

def test_send_message_trims_history():
    mock_app = MagicMock()
    mock_app.send_message.return_value = iter(["Hello"])
    routes = ChatBoatRoutes(mock_app)

    mock_request = MagicMock()
    mock_request.client.host = "127.0.0.1"
    body = ChatRequest(
        message="hello",
        history=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    )

    routes.send_message(mock_request, body)

    mock_app.send_message.assert_called_once_with("hello", [3, 4, 5, 6, 7, 8, 9, 10])
