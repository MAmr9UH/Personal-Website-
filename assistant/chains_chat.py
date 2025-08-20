# assistant/chains_chat.py
from __future__ import annotations
from typing import Dict, List, Optional
from pathlib import Path

from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AnyMessage
from langchain_core.runnables import (
    RunnableWithMessageHistory,
    RunnableLambda,
    RunnableBranch,
)
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_message_histories import ChatMessageHistory

from .vectorstore import get_vectorstore, get_retriever, DEFAULT_PERSIST_DIR
from .seeds import SEED_MESSAGES  # <-- NEW import

# =========================
# Behavior & prompts
# =========================



SYSTEM = (
    "You are Mohamed's personal assistant. "
    "Always answer based on the retrieved context."
    "Only provide  precise and accurate about  Mohamed’s career, skills, projects, education, "
    "professional activities. "


)


QA_PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM),
    MessagesPlaceholder("history"),
    ("human", "Question: {question}\n\nContext:\n{context}")
])

# =========================
# Router rules
# =========================
INAPPROPRIATE_MESSAGE = (
    "I don’t have that information in my records. You might reach out to Mohamed at "
    "maamr@cougarnet.uh.edu."
)

INAPPROPRIATE_KEYWORDS = {
    "home address", "address", "phone number", "private number", "ssn", "passport",
    "salary", "religion", "political opinion", "donation", "girlfriend", "sex",
}

def is_inappropriate(q: str) -> bool:
    ql = q.lower()
    return any(k in ql for k in INAPPROPRIATE_KEYWORDS)



# =========================
# Chain factory (Pinecone retriever under the hood)
# =========================
def make_chat_chain(
    pdf_path: str | Path,
    k: int = 2,
    seed_messages: Optional[List[AnyMessage]] = None,
):
    """
    Multi-turn routed RAG chat chain with memory (RunnableWithMessageHistory).
    Uses Pinecone + HF Inference API for embeddings via vectorstore.get_retriever.
    """
    load_dotenv()

    # Vector store + retriever (Pinecone-backed, LC-compatible)
    vs = get_vectorstore(pdf_path=pdf_path, persist_dir=DEFAULT_PERSIST_DIR, target_chunks=1)
    retriever = get_retriever(vs, k=k)

    def format_docs(docs):
        try:
            return "\n\n---\n\n".join(getattr(d, "page_content", d["page_content"]) for d in docs)
        except Exception:
            return ""

    # LLM
    llm = ChatGroq(model="llama3-70b-8192", temperature=0)

    # RAG base: retrieve → prompt → llm → text
    base_chain = (
        {
            "context": (lambda x: retriever.get_relevant_documents(x["question"])) | RunnableLambda(format_docs),
            "question": (lambda x: x["question"]),
            "history": (lambda x: x.get("history", [])),
        }
        | QA_PROMPT
        | llm
        | StrOutputParser()
    )

    # Router: inappropriate → canned; off-topic → canned; else → RAG
    router = RunnableBranch(
        (lambda x: is_inappropriate(x["question"]), RunnableLambda(lambda _: INAPPROPRIATE_MESSAGE)),
  
        base_chain,
    )

    # In-memory session store
    session_store: Dict[str, ChatMessageHistory] = {}

    def get_history(session_id: str) -> ChatMessageHistory:
        if session_id not in session_store:
            history = ChatMessageHistory()
            msgs = seed_messages if seed_messages is not None else SEED_MESSAGES
            for m in msgs:
                history.add_message(m)
            session_store[session_id] = history
        return session_store[session_id]

    chat_chain = RunnableWithMessageHistory(
        router,
        lambda session_id: get_history(session_id),
        input_messages_key="question",
        history_messages_key="history",
    )

    return chat_chain, retriever
