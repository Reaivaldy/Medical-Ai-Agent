import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_llm():
    return ChatGoogleGenerativeAI(model="gemini-2.5-flash")

llm = get_llm()

system_prompt = (
    "You are a specialized AI health assistant. Your sole purpose is to answer questions related to health, "
    "medicine, wellness, and fitness. If a user asks a question that is NOT related to health, "
    "you must politely refuse to answer and state that you can only answer health-related questions. "
    "Do not provide any information outside of health topics."
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[Message]

@app.post("/api/chat")
def chat_endpoint(request: ChatRequest):
    llm_messages = [SystemMessage(content=system_prompt)]
    
    for msg in request.messages:
        if msg.role == "user":
            llm_messages.append(HumanMessage(content=msg.content))
        else:
            llm_messages.append(AIMessage(content=msg.content))
            
    def generate():
        for chunk in llm.stream(llm_messages):
            yield chunk.content
            
    return StreamingResponse(generate(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)