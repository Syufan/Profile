import yaml
import random

SUGGESTIONS_LIMIT = 3

class Application:
    def __init__(self, db_path: str) -> None:
        self._suggestions = self._load_suggestions(db_path)


    def _load_suggestions(self, db_path:str) -> list[str]:
        with open(db_path) as f:
            data = yaml.safe_load(f)
        if len(data["suggestions"])<3:
            raise ValueError("Not enough suggestions")
        return data["suggestions"]


    def pick_random_suggestion(self) -> list[str]:
        return random.sample(self._suggestions, SUGGESTIONS_LIMIT)
