from typing import Generator
from openai import OpenAI

class OpenAIClient:
    def __init__(self) -> None:
        self._client = OpenAI()

    def send_message(self, message:str, data:str, history: list) -> Generator[str, None, None]:
        stream = self._client.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            max_tokens=500,
            stream=True,
            messages=[
                {"role": "system", "content": f"""You are a portfolio assistant for a software engineer named Jeff Zhang.
                Answer questions about Jeff based ONLY on the following data.
                For casual greetings or small talk, respond naturally and friendly, then guide the conversation back to Jeff's portfolio.
                The user is already viewing Jeff's portfolio website, so don't ask them to check it out.
                If the question cannot be answered from the data, say: 'I don't have that information, but you can contact Jeff directly.'
                Keep your answers concise and conversational — write like a person, not a resume.
                When listing multiple items, highlight the most relevant 2-3 rather than listing everything.
                Never use phrases like 'showcase', 'feel free to ask', or generic closing statements.
                Data: {data}"""},
                *history,
                {"role": "user", "content": message}
            ]
        )
        for chunk in stream:
            delta = chunk.choices[0].delta.content
            if delta:
                yield delta
