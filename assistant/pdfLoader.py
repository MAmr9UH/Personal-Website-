# assistant/pdfLoader.py
from pathlib import Path
from typing import List
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

def load_pdf_chunks(
    pdf_path: str | Path,
    target_chunks: int = 1,      # 1 = keep whole thing as a single chunk
    min_chunk: int = 350,        # only used if target_chunks > 1
    overlap: int = 50,
) -> List[Document]:
    """
    Load a small PDF (~570 words) and return either 1 whole chunk or 1–2 chunks.
    """
    pdf_path = Path(pdf_path).expanduser().resolve() #Just for saftey Path
    docs = PyPDFLoader(str(pdf_path)).load()  # one Document per page

    # Combine pages into one doc (keeps page metadata in the text)
    full_text = ""
    for d in docs:
        page = d.metadata.get("page", None)
        prefix = f"\n\n[Page {page+1}]\n" if page is not None else "\n\n"
        full_text += prefix + d.page_content
# so it combine eveything togther and after each chunk it say page[x]
    combined = Document(page_content=full_text, metadata={"source": pdf_path.name})

    # If you want a single chunk, return it directly.
    if target_chunks <= 1:
        return [combined]

    # Else, compute a chunk size that yields ~ target_chunks.
    words = full_text.split()
    total_words = len(words)
    chunk_words = max(min_chunk, total_words // target_chunks) # chunk_words = how many words per chunk (based on total length ÷ target_chunks).

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_words * 6,   # rough char-per-word multiplier (~5–6)
        chunk_overlap=overlap * 6,
        separators=["\n\n", "\n", " ", ""],
    )

    chunks = splitter.split_documents([combined])
    for c in chunks:
        c.metadata.setdefault("source", pdf_path.name)
    return chunks
