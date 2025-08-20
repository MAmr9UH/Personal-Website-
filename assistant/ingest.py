# assistant/ingest.py
from pdfLoader import load_pdf_chunks
from vectorstore import get_vectorstore

PDF_PATH = "assistant/AboutME.pdf"
INDEX_NAME = "aboutme"

if __name__ == "__main__":
    # Load chunks from PDF
    docs = load_pdf_chunks(PDF_PATH)
    if not docs:
        raise SystemExit("❌ No text extracted from PDF.")

    # Get Pinecone-backed vectorstore
    vs = get_vectorstore(INDEX_NAME)

    # Add docs
    vs.add_documents(docs)

    print(f"✅ Upserted {len(docs)} chunks to Pinecone index '{INDEX_NAME}' (namespace='{INDEX_NAME}')")
