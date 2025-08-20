# assistant/vectorstore.py
from __future__ import annotations
from dataclasses import dataclass
from typing import Any, Dict, List
import os, requests

from pinecone import Pinecone, ServerlessSpec

DEFAULT_PERSIST_DIR = None  # for compatibility

# ---- HF Inference API (remote embeddings; low RAM) ----
HF_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv("HF_EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
HF_URL = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{HF_MODEL}"
_HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"} if HF_TOKEN else {}

def _embed(texts: List[str]) -> List[List[float]]:
    # returns list of vectors
    r = requests.post(
        HF_URL,
        headers=_HEADERS,
        json={"inputs": texts, "options": {"wait_for_model": True}},
        timeout=30,
    )
    r.raise_for_status()
    data = r.json()
    # HF returns [dim] for single input or [[dim], [dim], ...] for multi
    if texts and isinstance(data[0], float):
        return [data]
    return data

# ---- Pinecone wrapper ----
INDEX_NAME = os.getenv("PINECONE_INDEX", "aboutme")

@dataclass
class _PineconeVS:
    pc: Pinecone
    index_name: str

    def as_retriever(self, k: int = 2):
        def _retrieve(query: str) -> List[Dict[str, Any]]:
            qvec = _embed([query])[0]
            idx = self.pc.Index(self.index_name)
            res = idx.query(vector=qvec, top_k=k, include_metadata=True, namespace="aboutme")
            matches = res.get("matches", []) if isinstance(res, dict) else getattr(res, "matches", [])
            docs = []
            for m in matches:
                meta = m.get("metadata") or {}
                docs.append({"page_content": meta.get("text", ""), "score": m.get("score", 0.0)})
            return docs
        return _retrieve
        

def get_vectorstore(pdf_path=None, persist_dir=None, model_name: str = "", target_chunks: int = 1, rebuild: bool = False):
    api_key = os.environ["PINECONE_API_KEY"]
    pc = Pinecone(api_key=api_key)
    # ensure index exists (safe if it already does)
    existing = {i["name"] for i in pc.list_indexes()}
    if INDEX_NAME not in existing:
        pc.create_index(
            name=INDEX_NAME,
            dimension=384,       # MiniLM-L6-v2
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
    return _PineconeVS(pc=pc, index_name=INDEX_NAME)

def get_retriever(vectorstore: _PineconeVS, k: int = 2):
    try:
        from langchain_core.documents import Document
    except Exception:
        Document = None

    class _LCStyleRetriever:
        def __init__(self, vs: _PineconeVS, k: int):
            self._fn = vs.as_retriever(k)

        def get_relevant_documents(self, query: str):
            hits = self._fn(query)
            if Document:
                return [Document(page_content=h["page_content"], metadata={"score": h["score"]}) for h in hits]
            return hits

        def invoke(self, query: str):
            return self.get_relevant_documents(query)

        __call__ = invoke

    return _LCStyleRetriever(vectorstore, k)
