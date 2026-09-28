import fitz


def extract_text_from_pdf(file_content: bytes) -> str:
    pdf_document = fitz.open(stream=file_content, filetype="pdf")

    extracted_text = []

    for page in pdf_document:
        page_text = page.get_text()
        extracted_text.append(page_text)

    pdf_document.close()

    return "\n".join(extracted_text).strip()