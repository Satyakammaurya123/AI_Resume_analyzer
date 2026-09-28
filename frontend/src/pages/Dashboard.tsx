import { useLocation } from "react-router-dom";

interface ResumeAnalysis {
  score: number;
  skills: string[];
  experience: string;
  education: string;
}

function Dashboard() {
  const location = useLocation();

  const extractedText = location.state?.extractedText || "";

  const analysis: ResumeAnalysis = location.state?.analysis || {
    score: 0,
    skills: [],
    experience: "",
    education: "",
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">
        Resume Analysis
      </h1>

      <p className="mt-2 text-slate-600">
        Here is the analysis generated from your uploaded resume.
      </p>

      {/* Resume Score */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Resume Score
        </h2>

        <div className="mt-5 flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
            <span className="text-3xl font-bold text-indigo-600">
              {analysis.score}
            </span>
          </div>

          <div>
            <p className="text-lg font-semibold text-slate-900">
              Overall Resume Score
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Score calculated from the content detected in your resume.
            </p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Skills
        </h2>

        {analysis.skills.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {analysis.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-slate-500">
            No skills detected.
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Experience
        </h2>

        {analysis.experience ? (
          <pre className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
            {analysis.experience}
          </pre>
        ) : (
          <p className="mt-4 text-slate-500">
            No experience information detected.
          </p>
        )}
      </div>

      {/* Education */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Education
        </h2>

        {analysis.education ? (
          <pre className="mt-4 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
            {analysis.education}
          </pre>
        ) : (
          <p className="mt-4 text-slate-500">
            No education information detected.
          </p>
        )}
      </div>

      {/* Raw Extracted Text */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Extracted Resume Text
        </h2>

        {extractedText ? (
          <pre className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {extractedText}
          </pre>
        ) : (
          <p className="mt-4 text-slate-500">
            No extracted resume text found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;