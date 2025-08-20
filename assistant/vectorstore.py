# assistant/vectorstore.py
import os
os.environ["TOKENIZERS_PARALLELISM"] = "false"

from pathlib import Path
from typing import Union
from langchain_huggingface import HuggingFaceEmbeddings   # ✅ maintained package
from langchain_community.vectorstores import Chroma
from .pdfLoader import load_pdf_chunks

DEFAULT_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
DEFAULT_PERSIST_DIR = Path(__file__).parent / "data" / "vectorstore"

def _emb(model_name: str = DEFAULT_MODEL) -> HuggingFaceEmbeddings:
    return HuggingFaceEmbeddings(model_name=model_name)

def build_chroma_from_pdf(
    pdf_path: Union[str, Path],
    persist_dir: Union[str, Path] = DEFAULT_PERSIST_DIR,
    model_name: str = DEFAULT_MODEL,
    target_chunks: int = 1,
) -> Chroma:
    """Build a new Chroma DB from the PDF and (auto)persist it."""
    persist_dir = Path(persist_dir)
    persist_dir.mkdir(parents=True, exist_ok=True)

    chunks = load_pdf_chunks(pdf_path, target_chunks=target_chunks)
    vs = Chroma.from_documents(
        documents=chunks,
        embedding=_emb(model_name),
        persist_directory=str(persist_dir),
    )
    # Chroma >= 0.4 auto-persists; no vs.persist() needed
    return vs

def load_chroma(
    persist_dir: Union[str, Path] = DEFAULT_PERSIST_DIR,
    model_name: str = DEFAULT_MODEL,
) -> Chroma:
    return Chroma(
        embedding_function=_emb(model_name),
        persist_directory=str(persist_dir),
    )

def get_vectorstore(
    pdf_path: Union[str, Path],
    persist_dir: Union[str, Path] = DEFAULT_PERSIST_DIR,
    model_name: str = DEFAULT_MODEL,
    target_chunks: int = 1,
    rebuild: bool = False,
) -> Chroma:
    """Return existing Chroma, or build if missing/forced."""
    persist_dir = Path(persist_dir)
    has_db = any(persist_dir.glob("**/*.sqlite")) or (persist_dir / "chroma-collections.parquet").exists()
    if rebuild or not has_db:
        return build_chroma_from_pdf(pdf_path, persist_dir, model_name, target_chunks)
    return load_chroma(persist_dir, model_name)

def get_retriever(vectorstore: Chroma, k: int = 2):
    return vectorstore.as_retriever(search_kwargs={"k": k})
