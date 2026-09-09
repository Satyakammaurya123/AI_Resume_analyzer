import { Link } from "react-router-dom";
import { FiFileText } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <FiFileText className="text-2xl text-indigo-600" />

          <span className="text-xl font-bold text-slate-900">
            Resume Analyzer
          </span>
        </Link>

        <Link
          to="/upload"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Analyze Resume
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;