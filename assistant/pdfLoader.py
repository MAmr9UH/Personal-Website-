# assistant/pdfLoader.py
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document

def load_pdf_chunks(pdf_path, chunk_size=500, chunk_overlap=50):
    pdf_path = Path(pdf_path).expanduser().resolve()
    docs = PyPDFLoader(str(pdf_path)).load()  # one Document per page

    full_text = ""
    for d in docs:
        page = d.metadata.get("page", None)
        prefix = f"\n\n[Page {page+1}]\n" if page is not None else "\n\n"
        full_text += prefix + d.page_content

    # Split text into chunks
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    chunks = splitter.split_text(full_text)

    # Return as list of Document objects
    return [
        Document(page_content=chunk, metadata={"source": pdf_path.name})
        for chunk in chunks
    ]
