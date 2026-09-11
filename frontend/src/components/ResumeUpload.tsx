import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";

interface ResumeUploadProps {
  onAnalyze: (file: File) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function ResumeUpload({ onAnalyze }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const validateFile = (file: File) => {
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError("Please upload a PDF or DOCX file.");
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 5 MB.");
      return false;
    }

    setError("");
    return true;
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setError("Please select a resume before analyzing.");
      return;
    }

    onAnalyze(selectedFile);
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onClick={handleBrowseClick}
          className="cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center transition hover:border-indigo-400 hover:bg-indigo-50"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <FiUploadCloud className="text-3xl text-indigo-600" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            Drop your resume here
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            or click to browse files
          </p>

          <p className="mt-4 text-xs text-slate-400">
            Supported formats: PDF, DOCX · Maximum size: 5 MB
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white">
                <FiFileText className="text-2xl text-indigo-600" />
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-900">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRemoveFile}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-white hover:text-red-500"
              aria-label="Remove file"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-green-700">
            <FiCheckCircle />
            Resume ready for analysis
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-600">
          <FiAlertCircle className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={!selectedFile}
        className="mt-6 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Analyze Resume
      </button>
    </div>
  );
}

export default ResumeUpload;