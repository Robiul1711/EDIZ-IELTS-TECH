import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { DotLoader } from "react-spinners";


const GradingProgess = () => {
  return (
    <div className="min-h-screen bg-[#f7f6ff] dark:bg-[#1E1E1E] p-6 rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <Link
            to="/classroom/register-as-teacher/exams"
            className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center
                       hover:bg-gray-300 transition"
          >
            <ArrowLeft size={18} className="text-gray-700" />
          </Link>

          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Students results
          </h2>
        </div>

        <span className="text-sm font-medium text-[#6366f1] dark:text-white">
          23/24
        </span>
      </div>

      {/* Center Loader */}
      <div className="flex flex-col items-center justify-center mt-32">
        <DotLoader
          size={48}
          color="#7c3aed"
          speedMultiplier={0.9}
        />

        <p className="mt-4 text-sm font-medium text-[#7c3aed] dark:text-white">
          Grading In Progress
        </p>
      </div>
      <Link
        to="/classroom/register-as-teacher/results"
        className="py-2 px-2 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium
                   bg-[#7c3aed] shadow-md
                   hover:bg-[#6b21a8] transition"
      >
        Results
      </Link>
    </div>
  );
};

export default GradingProgess;
