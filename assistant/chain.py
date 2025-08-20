# assistant/chains_chat.py
from __future__ import annotations
from typing import Dict, List, Optional
from pathlib import Path
from operator import itemgetter

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

# =========================
# Behavior & prompts
# =========================
SYSTEM = (
    "You are Mohamed's assistant. Answer using the retrieved context about "
    "Mohamed’s career, skills, projects, education, and professional activities. "
    "If the user asks general questions that are not about Mohamed, reply: "
    "'I have been programmed to answer questions about Mohamed’s career and profile.' "
    "If the user asks anything inappropriate, sensitive, or outside professional scope, reply: "
    "'I don’t have that information in my records. You might reach out to Mohamed at maamr@cougarnet.uh.edu.' "
    "Never use phrases like 'based on the documentation', 'according to the text', or "
    "'based on the provided text'. Answer directly and confidently. "
    "If the answer is not in the retrieved context, use the same email fallback."
)

QA_PROMPT = ChatPromptTemplate.from_messages([
    ("system", SYSTEM),
    MessagesPlaceholder("history"),
    ("human", "Question: {question}\n\nContext:\n{context}")
])

# =========================
# Simple router rules
# =========================
GENERAL_MESSAGE = "I have been programmed to answer questions about Mohamed’s career and profile."
INAPPROPRIATE_MESSAGE = "I don’t have that information in my records. You might reach out to Mohamed at maamr@cougarnet.uh.edu."

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
        # supports both LC Documents and our dict fallback
        try:
            return "\n\n---\n\n".join(getattr(d, "page_content", d["page_content"]) for d in docs)
        except Exception:
            return ""

    # LLM
    llm = ChatGroq(model="Gemma2-9b-it", temperature=0)

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

    # Router: inappropriate → canned; else → RAG
    router = RunnableBranch(
        (lambda x: is_inappropriate(x["question"]), RunnableLambda(lambda _: INAPPROPRIATE_MESSAGE)),
        base_chain,
    )

    # In-memory session store
    session_store: Dict[str, ChatMessageHistory] = {}

    def get_history(session_id: str) -> ChatMessageHistory:
        if session_id not in session_store:
            history = ChatMessageHistory()
            if seed_messages:
                for m in seed_messages:
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
