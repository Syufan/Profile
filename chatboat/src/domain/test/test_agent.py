from unittest.mock import MagicMock, patch

from src.domain.agent import Agent

def test_agent_send_message(tmp_path):
    with patch("src.domain.agent.OpenAI") as mock_openai:
        mock_response = MagicMock()
        mock_response.choices[0].message.content = "Hello"
        mock_openai.return_value.chat.completions.create.return_value = mock_response

        agent = Agent()
        result = agent.send_message("What are your skills?", "some fake data", [])

        assert result == "Hello"
