import pytest

from unittest.mock import MagicMock

from src.domain.application import Application

def test_successfully_open_suggestions_file(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    app = Application(tmp_path, agent=MagicMock())
    assert app._load_suggestions(fake_path)==['hello','hey','okay']

def test_fail_open_suggestions_file(tmp_path):

    with pytest.raises(FileNotFoundError):
        Application(tmp_path, agent=MagicMock())

def test_less_than_3_suggestions(tmp_path):
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'")

    with pytest.raises(ValueError):
        Application(tmp_path, agent=MagicMock())

def test_pick_3_suggestions(tmp_path):
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "portfolio.yaml").write_text("some data")

    app = Application(tmp_path, agent=MagicMock())
    assert len(app.pick_random_suggestion())==3

def test_successfully_open_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("data:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    app = Application(tmp_path, agent=MagicMock())
    assert app._load_data(fake_path) != ""

def test_open_empty_data_file(tmp_path):
    fake_path = tmp_path / "portfolio.yaml"
    fake_path.write_text("")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    with pytest.raises(ValueError):
        app = Application(tmp_path, agent=MagicMock())
        app._load_data(fake_path)

def test_send_message(tmp_path):
    (tmp_path / "portfolio.yaml").write_text("some data")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    mock_agent = MagicMock()
    mock_agent.send_message.return_value = "Hello"

    app = Application(tmp_path, agent=mock_agent)
    result = app.send_message("hello", [])

    mock_agent.send_message.assert_called_once_with("hello", "some data", [])
    assert result == "Hello"

def test_empty_message(tmp_path):
    (tmp_path / "portfolio.yaml").write_text("some data")
    (tmp_path / "suggestions.yaml").write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")

    with pytest.raises(ValueError):
        app = Application(tmp_path, agent=MagicMock())
        app.send_message("", [])
