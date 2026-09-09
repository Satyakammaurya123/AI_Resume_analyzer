import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiFileText,
  FiBarChart2,
} from "react-icons/fi";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
          <FiFileText className="text-3xl text-indigo-600" />
        </div>

        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">
          Analyze Your Resume{" "}
          <span className="text-indigo-600">Smarter.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Upload your resume and get a quick overview of your skills,
          experience, education, and overall resume score.
        </p>

        <Link
          to="/upload"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
        >
          Analyze My Resume
          <FiArrowRight />
        </Link>
      </section>

      {/* Features */}
      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FiCheckCircle className="text-2xl text-indigo-600" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Skill Analysis
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Identify the technical and professional skills present in your
            resume.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FiBarChart2 className="text-2xl text-indigo-600" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Resume Score
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Get a simple score that summarizes the quality of your resume.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <FiFileText className="text-2xl text-indigo-600" />

          <h2 className="mt-4 text-lg font-semibold text-slate-900">
            Resume Insights
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Understand your experience and education information at a glance.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;