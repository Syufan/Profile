import yaml
import random
from pathlib import Path

from src.domain.agent import Agent

SUGGESTIONS_LIMIT = 3

class Application:
    def __init__(self, db_path: str, agent:Agent) -> None:
        path = Path(db_path)
        self._suggestions = self._load_suggestions(path / "suggestions.yaml")
        self._data = self._load_data(path / "portfolio.yaml")
        self._agent = agent

    def _load_suggestions(self, db_path:str) -> list[str]:
        with open(db_path) as f:
            data = yaml.safe_load(f)
        if len(data["suggestions"])<3:
            raise ValueError("Not enough suggestions")
        return data["suggestions"]

    def _load_data(self, db_path:str) -> str:
        with open(db_path) as f:
            data = f.read()
        if not data:
            raise ValueError("File is empty")
        return data

    def pick_random_suggestion(self) -> list[str]:
        return random.sample(self._suggestions, SUGGESTIONS_LIMIT)
