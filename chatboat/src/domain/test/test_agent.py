from unittest.mock import MagicMock, patch

from src.domain.openai_client import OpenAIClient

def test_agent_send_message(tmp_path):
    with patch("src.domain.openai_client.OpenAI") as mock_openai:
        mock_response = MagicMock()
        mock_response.choices[0].message.content = "Hello"
        mock_openai.return_value.chat.completions.create.return_value = mock_response

        agent = OpenAIClient()
        result = agent.send_message("What are your skills?", "some fake data", [])

        assert result == "Hello"
