#/Users/mohamedamr/Desktop/website_3/vista-flow-code/assistant/ingest.py
from pathlib import Path
from .vectorstore import get_vectorstore, DEFAULT_PERSIST_DIR




if __name__ == "__main__":
    pdf = Path(__file__).parent / "AboutME.pdf"
    vs = get_vectorstore(
        pdf_path=pdf,
        persist_dir=DEFAULT_PERSIST_DIR,
        target_chunks=1,   # your 570-word PDF → keep whole
        rebuild=True,      # force rebuild on ingest
    )
    print("✅ Chroma vectorstore built at:", DEFAULT_PERSIST_DIR)
    print("   Collections:", vs._collection.count())  # simple sanity check


