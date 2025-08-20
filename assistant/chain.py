
from __future__ import annotations
from typing import Dict, List, Optional
from pathlib import Path
from operator import itemgetter

from dotenv import load_dotenv
from langchain_groq import ChatGroq

from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import AnyMessage, HumanMessage, AIMessage
from langchain_core.runnables import (
    RunnablePassthrough,
    RunnableWithMessageHistory,
    RunnableLambda,
    RunnableBranch,
)
from langchain_core.output_parsers import StrOutputParser  # same as langchain.schema.StrOutputParser
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
# Chain factory
# =========================

def make_chat_chain(
    pdf_path: str | Path,
    k: int = 2,
    seed_messages: Optional[List[AnyMessage]] = None,   # optional: preload history
):
    """
    Multi-turn routed RAG chat chain with memory (RunnableWithMessageHistory).
    - pdf_path: path to the PDF used to build/load the vector store
    - k: number of retrieved chunks
    - seed_messages: optional list of HumanMessage/AIMessage to pre-populate new sessions
    """
    load_dotenv()  # loads GROQ_API_KEY if present

    # Vector store + retriever
    vs = get_vectorstore(pdf_path=pdf_path, persist_dir=DEFAULT_PERSIST_DIR, target_chunks=1)
    retriever = get_retriever(vs, k=k)

    def format_docs(docs):
        return "\n\n---\n\n".join(d.page_content for d in docs)

    # LLM
    llm = ChatGroq(model="llama3-70b-8192", temperature=0)

    # RAG base: retrieve → prompt → llm → text
    base_chain = (
        {
            "context": itemgetter("question") | retriever | RunnableLambda(format_docs),
            "question": itemgetter("question"),
            "history": itemgetter("history"),
        }
        | QA_PROMPT
        | llm
        | StrOutputParser()
    )

    # Router: inappropriate → canned; general/off-topic → canned; else → RAG
    router = RunnableBranch(
        (lambda x: is_inappropriate(x["question"]), RunnableLambda(lambda _: INAPPROPRIATE_MESSAGE)),
        
        base_chain,  # default branch
    )

    # In-memory session store
    session_store: Dict[str, ChatMessageHistory] = {}

    def get_history(session_id: str) -> ChatMessageHistory:
        """Return (and lazily create) the message history for a given session_id."""
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
        # NOTE: do NOT set output_messages_key unless your chain returns a dict with that key.
    )

    return chat_chain, retriever
