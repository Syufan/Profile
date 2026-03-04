import pytest

from src.domain.application import Application

def test_successfully_open_suggestions_file(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'")

    assert Application(fake_path)._load_suggestions(fake_path)==["hello"]

def test_fail_open_suggestions_file(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"

    with pytest.raises(FileNotFoundError):
        Application(fake_path)

def test_less_than_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'")

    with pytest.raises(ValueError):
        Application(fake_path)
