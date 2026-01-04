import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Exams = () => {
  return (
    <div className="">
      {/* Page Title */}
      <h1 className="text-xl font-semibold text-gray-900 mb-6">
        Exams
      </h1>

      {/* Take Exam Button */}
      <div className="mb-10">
        <Link to="/classroom/register-as-teacher/select-exam"
          className="w-full h-14 inline-flex items-center justify-center rounded-xl text-white text-sm font-medium
                     bg-gradient-to-r from-[#9b3ae8] to-[#8b6cff]
                     shadow-lg shadow-purple-400/40
                     hover:opacity-95 transition"
        >
          Take exam
        </Link>
      </div>

      {/* Active Section */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Active
        </h2>

        <ExamRow
          index="#1"
          title="IELTS speaking test"
          date="22th November 2025, 4:20 PM"
          duration="2 hr"
          timer="(59:00)"
          active
        />
      </div>

      {/* Previous Exam */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Previous exam
        </h2>

        <ExamRow
          index="#1"
          title="IELTS speaking test"
          date="22th November 2025, 4:20 PM"
          duration="1 hr"
          showResult
        />
      </div>
    </div>
  );
};

export default Exams;

/* ---------------- Exam Row ---------------- */

const ExamRow = ({
  index,
  title,
  date,
  duration,
  timer,
  active,
  showResult,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-lg px-6 py-4
                 flex flex-wrap items-center justify-between gap-4"
    >
      {/* Index */}
      <span className="text-sm text-gray-400 w-8">{index}</span>

      {/* Title */}
      <span className="text-sm font-medium text-gray-800 flex-1 min-w-[200px]">
        {title}
      </span>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Calendar size={16} />
        {date}
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm">
        <Clock size={16} className="text-gray-500" />
        <span className="text-gray-700">{duration}</span>
        {active && (
          <span className="text-red-500 ml-1">{timer}</span>
        )}
      </div>

      {/* Result Button */}
      {showResult && (
        <button
          className="ml-auto h-10 px-6 rounded-xl text-white text-sm font-medium
                     bg-[#0f172a] shadow-md hover:bg-[#020617] transition"
        >
          Student Results
        </button>
      )}
    </div>
  );
};
