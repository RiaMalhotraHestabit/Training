import uuid
from fastapi import FastAPI
from pydantic import BaseModel

from .model_loader import load_model
from .config import *

app = FastAPI(title="Local LLM API")

llm = load_model()

chat_history = []


class GenerateRequest(BaseModel):
    prompt: str
    temperature: float = DEFAULT_TEMPERATURE
    top_p: float = DEFAULT_TOP_P
    top_k: int = DEFAULT_TOP_K
    max_tokens: int = MAX_TOKENS


class ChatRequest(BaseModel):
    message: str
    system_prompt: str = "You are a helpful AI assistant."
    temperature: float = DEFAULT_TEMPERATURE


@app.post("/generate")
def generate(req: GenerateRequest):

    request_id = str(uuid.uuid4())

    response = llm(
        f"### Instruction:\n{req.prompt}\n\n### Response:",
        temperature=req.temperature,
        top_p=req.top_p,
        top_k=req.top_k,
        max_tokens=req.max_tokens
    )

    output = response["choices"][0]["text"]

    return {
        "request_id": request_id,
        "prompt": req.prompt,
        "response": output
    }

@app.get("/")
def home():
    return {"message": "Local LLM API is running"}

@app.post("/chat")
def chat(req: ChatRequest):

    request_id = str(uuid.uuid4())

    chat_history.append({"role": "user", "content": req.message})

    conversation = ""
    for msg in chat_history:
        conversation += f"{msg['role']}: {msg['content']}\n"

    response = llm(
        conversation,
        temperature=req.temperature,
        max_tokens=200
    )

    answer = response["choices"][0]["text"]

    chat_history.append({"role": "assistant", "content": answer})

    return {
        "request_id": request_id,
        "response": answer
    }