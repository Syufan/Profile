from src.web.routes.chatboat import ChatBoatRoutes, ChatRequest
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
