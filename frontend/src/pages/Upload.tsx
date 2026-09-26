import { uploadResume } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiFileText } from "react-icons/fi";
import ResumeUpload from "../components/ResumeUpload";

function Upload() {
  const navigate = useNavigate();

    const handleAnalyze = async (file: File) => {
      try {
        console.log("Starting upload...");

        const result = await uploadResume(file);

        console.log("Upload successful:", result);

        navigate("/dashboard");
      } catch (error) {
        console.error("Upload failed:", error);
      }
    };

  return (
    <div className="min-h-[calc(100vh-73px)] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
        >
          <FiArrowLeft />
          Back to Home
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
              <FiFileText className="text-2xl text-indigo-600" />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Upload Your Resume
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Upload your resume and we'll analyze your skills, experience,
              education, and overall resume quality.
            </p>
          </div>

          <div className="mt-10">
            <ResumeUpload onAnalyze={handleAnalyze} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;