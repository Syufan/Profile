from src.web.routes.chatboat import ChatBoatRoutes
from src.domain.application import Application

def test_successfully_get_3_suggestions(tmp_path):
    fake_path = tmp_path / "suggestions.yaml"
    fake_path.write_text("suggestions:\n  - 'hello'\n  - 'hey'\n  - 'okay'")
    app = Application(fake_path)
    routes = ChatBoatRoutes(app)

    assert len(routes.get_random_suggestions()["suggestions"]) == 3
