The user should be able to:

Click Browse Files
Select a .pdf or .docx
See the selected filename
See file size
Remove the selected file
Get an error for unsupported files
Get an error if the file is too large
Click Analyze Resume
Move to /dashboard

We'll use 5 MB as the maximum file size.



initial flow
Home
  │
  │ Analyze My Resume
  ↓
Upload Page
  │
  │ Select PDF/DOCX
  ↓
File Selected
  │
  │ Analyze Resume
  ↓
Dashboard



later will add 
Analyze Resume
      ↓
FastAPI
      ↓
Real resume analysis
      ↓
Dashboard