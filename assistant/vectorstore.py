# assistant/vectorstore.py
from __future__ import annotations
from dataclasses import dataclass
from typing import Any, Dict, List
import os

from dotenv import load_dotenv
from sentence_transformers import SentenceTransformer
from pinecone import Pinecone, ServerlessSpec  # <-- import these

load_dotenv()

DEFAULT_PERSIST_DIR = None
INDEX_NAME = os.getenv("PINECONE_INDEX", "aboutme")
MODEL_NAME = os.getenv("EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
EMBED_DIM = 384  # MiniLM-L6-v2

# Load local embeddings once
_model = SentenceTransformer(MODEL_NAME)
def _embed(texts: List[str]) -> List[List[float]]:
    return _model.encode(texts, normalize_embeddings=True).tolist()

# ---- Pinecone wrapper (new SDK only) ----
class _PCClient:
    def __init__(self, api_key: str, index_name: str):
        self.pc = Pinecone(api_key=api_key)
        self.index_name = index_name
        # Ensure index exists (safe if it already exists)
        existing = {i["name"] for i in self.pc.list_indexes()}
        if self.index_name not in existing:
            self.pc.create_index(
                name=self.index_name,
                dimension=EMBED_DIM,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1"),
            )
        self._index = self.pc.Index(self.index_name)

    def get_index(self):
        return self._index

@dataclass
class _PineconeVS:
    client: _PCClient
    index_name: str

    def as_retriever(self, k: int = 2):
        def _retrieve(query: str) -> List[Dict[str, Any]]:
            qvec = _embed([query])[0]  # 384-dim
            idx = self.client.get_index()
            res = idx.query(vector=qvec, top_k=k, include_metadata=True, namespace="aboutme")
            matches = res.get("matches", []) if isinstance(res, dict) else getattr(res, "matches", [])
            docs = []
            for m in matches:
                meta = m.get("metadata") or {}
                docs.append({"page_content": meta.get("text", ""), "score": m.get("score", 0.0)})
            return docs
        return _retrieve

# ----- Public API used by chains_chat.py -----
def get_vectorstore(pdf_path=None, persist_dir=None, model_name: str = "", target_chunks: int = 1, rebuild: bool = False):
    api_key = os.environ.get("PINECONE_API_KEY")
    if not api_key:
        raise RuntimeError("PINECONE_API_KEY is not set.")
    client = _PCClient(api_key=api_key, index_name=INDEX_NAME)
    return _PineconeVS(client=client, index_name=INDEX_NAME)

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
