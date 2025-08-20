from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from assistant.chains_chat import make_chat_chain

# Build the chain once at startup
chat_chain, _ = make_chat_chain(pdf_path=Path("assistant/AboutME.pdf"), k=2, seed_messages=None)

app = FastAPI()

ALLOWED_ORIGINS = [
    # local dev
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # deployed sites
    "https://mohamedamr-casebook.web.app",
    "https://mohamed-portfolio-app.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,   # remove "*" in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatBody(BaseModel):
    question: str
    session_id: str  # keep stable in frontend (localStorage)

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/chat")
def chat(body: ChatBody):
    cfg = {"configurable": {"session_id": body.session_id}}
    answer = chat_chain.invoke({"question": body.question}, cfg)
    return {"answer": answer}
