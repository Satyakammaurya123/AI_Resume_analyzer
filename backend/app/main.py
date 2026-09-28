from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.services.resume_parser import extract_text_from_pdf
from app.services.resume_analyzer import analyze_resume


app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for analyzing resumes",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MAX_FILE_SIZE = 5 * 1024 * 1024

ALLOWED_FILE_TYPES = {
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "message": "AI Resume Analyzer API is running",
    }


@app.post("/api/resume/upload")
async def upload_resume(file: UploadFile = File(...)):
    if file.content_type not in ALLOWED_FILE_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Please upload a PDF or DOCX file.",
        )

    file_content = await file.read()

    if len(file_content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size must be less than 5 MB.",
        )

    if file.content_type == "application/pdf":
        extracted_text = extract_text_from_pdf(file_content)
    else:
        extracted_text = ""

    analysis = analyze_resume(extracted_text)

    return {
        "message": "Resume uploaded successfully",
        "filename": file.filename,
        "content_type": file.content_type,
        "size_in_bytes": len(file_content),
        "extracted_text": extracted_text,
        "analysis": analysis,
    }