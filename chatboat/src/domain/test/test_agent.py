from unittest.mock import MagicMock, patch

from src.domain.openai_client import OpenAIClient

def test_agent_send_message():
    with patch("src.domain.openai_client.OpenAI") as mock_openai:
        mock_chunk = MagicMock()
        mock_chunk.choices[0].delta.content = "Hello"
        mock_openai.return_value.chat.completions.create.return_value = iter([mock_chunk])

        agent = OpenAIClient()
        result = list(agent.send_message("What are your skills?", "some fake data", []))

        assert result == ["Hello"]
