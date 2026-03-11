from openai import OpenAI

class Agent:
    def __init__(self) -> None:
        self._client = OpenAI()

    def send_message(self, message:str, data:str) -> str:
        response = self._client.chat.completions.create(
            model="gpt-4o-mini-2024-07-18",
            max_tokens=500,
            messages=[
                {"role": "system", "content": f"""You are a portfolio assistant for a software engineer named Yu Fan.
                Answer questions about Yu Fan based ONLY on the following data.
                For casual greetings or small talk, respond naturally and friendly, then guide the conversation back to Yu Fan's portfolio.
                The user is already viewing Yu Fan's portfolio website, so don't ask them to check it out.
                If the question cannot be answered from the data, say: 'I don't have that information, but you can contact Yu Fan directly.'
                Keep your answers concise and professional. Data: {data}"""},
                {"role": "user", "content": message}
            ]
        )
        return response.choices[0].message.content
