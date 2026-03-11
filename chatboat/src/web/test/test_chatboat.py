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
    mock_app.send_message.return_value = "Hello"
    routes = ChatBoatRoutes(mock_app)

    request = ChatRequest(message="hello")
    result = routes.send_message(request)

    mock_app.send_message.assert_called_once()
    assert result.body != b""
