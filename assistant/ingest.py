# assistant/ingest.py
from __future__ import annotations
from pathlib import Path
import os
from typing import List
import requests
from pinecone import Pinecone, ServerlessSpec
from pypdf import PdfReader

INDEX_NAME = os.getenv("PINECONE_INDEX", "aboutme")
PINECONE_ENV = os.getenv("PINECONE_ENV", "us-east-1-aws")  # e.g., "us-east-1-aws"
HF_TOKEN = os.getenv("HF_API_TOKEN")
HF_MODEL = os.getenv("HF_EMBED_MODEL", "sentence-transformers/all-MiniLM-L6-v2")
HF_URL = f"https://api-inference.huggingface.co/pipeline/feature-extraction/{HF_MODEL}"
_HEADERS = {"Authorization": f"Bearer {HF_TOKEN}"}

def embed_texts(texts: List[str]) -> List[List[float]]:
    r = requests.post(HF_URL, headers=_HEADERS, json={"inputs": texts, "options": {"wait_for_model": True}}, timeout=60)
    r.raise_for_status()
    data = r.json()
    # HF returns list-of-lists for multi-input; single input may be just a list
    if texts and isinstance(data[0], list) and isinstance(data[0][0], float):
        # single vector only
        return [data]
    return data

def read_pdf_chunks(pdf_path: Path, min_len: int = 200) -> List[str]:
    reader = PdfReader(str(pdf_path))
    text = "\n".join((p.extract_text() or "") for p in reader.pages).strip()
    if not text:
        return []
    # simple paragraph-ish chunking
    raw = [p.strip() for p in text.split("\n\n")]
    chunks, buf, cur = [], [], 0
    for p in raw:
        if not p:
            continue
        buf.append(p)
        cur += len(p)
        if cur >= min_len:
            chunks.append(" ".join(buf))
            buf, cur = [], 0
    if buf:
        chunks.append(" ".join(buf))
    return [c for c in chunks if c.strip()]

if __name__ == "__main__":
    pdf = Path(__file__).parent / "AboutME.pdf"

    pc = Pinecone(api_key=os.environ["PINECONE_API_KEY"])
    # Ensure index (serverless)
    if INDEX_NAME not in [i["name"] for i in pc.list_indexes()]:
        pc.create_index(
            name=INDEX_NAME,
            dimension=384,  # all-MiniLM-L6-v2
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )

    index = pc.Index(INDEX_NAME)

    chunks = read_pdf_chunks(pdf)
    if not chunks:
        raise SystemExit("No text extracted from PDF.")

    vecs = embed_texts(chunks)
    vectors = [
        {"id": f"aboutme-{i}", "values": vec, "metadata": {"text": ch}}
        for i, (ch, vec) in enumerate(zip(chunks, vecs))
    ]

    # Upsert
    for i in range(0, len(vectors), 100):
        index.upsert(vectors=vectors[i:i+100], namespace="aboutme")

    print(f"✅ Upserted {len(vectors)} chunks to Pinecone index '{INDEX_NAME}' (ns=aboutme).")
