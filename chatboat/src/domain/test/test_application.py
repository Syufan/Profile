import pytest

from unittest.mock import patch

from src.domain.application import Application
from src.domain.agent import Agent

def test_successfully_open_suggestions_file(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    with patch("src.domain.agent.OpenAI"):
        app = Application(tmp_path, agent=Agent())
        assert app._load_suggestions(fake_path)==['hello','hey','okay']

def test_fail_open_suggestions_file(tmp_path):

    with pytest.raises(FileNotFoundError):
        with patch("src.domain.agent.OpenAI"):
            Application(tmp_path, agent=Agent())

def test_less_than_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'")

    with pytest.raises(ValueError):
        with patch("src.domain.agent.OpenAI"):
            Application(tmp_path, agent=Agent())

def test_pick_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    with patch("src.domain.agent.OpenAI"):
        app = Application(tmp_path, agent=Agent())
        assert len(app.pick_random_suggestion())==3

def test_successfully_open_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("data:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    with patch("src.domain.agent.OpenAI"):
        app = Application(tmp_path, agent=Agent())
        assert app._load_data(fake_path) != ""

def test_open_empty_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    with pytest.raises(ValueError):
        with patch("src.domain.agent.OpenAI"):
            app = Application(tmp_path, agent=Agent())
            app._load_data(fake_path)
