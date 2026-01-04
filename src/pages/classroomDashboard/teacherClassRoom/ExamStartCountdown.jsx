import { Link } from "react-router-dom";

const ExamStartCountdown = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      
      {/* Circular Countdown */}
      <div className="relative mb-8">
        <div
          className="w-44 h-44 rounded-full border-[10px] border-[#e7edff]
                     flex items-center justify-center"
        >
          <span className="text-4xl font-semibold text-[#8b5cf6]">
            5
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 text-center max-w-md mb-12">
        Upon clicking Start, the system will display a brief
        <span className="font-medium text-gray-700">
          {" "}5-4-3-2-1{" "}
        </span>
        countdown before initiating the exam
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-6">
        {/* Cancel */}
        <button
          className="h-11 w-40 rounded-lg text-white text-sm font-medium
                     bg-[#0f172a] shadow-md
                     hover:bg-[#020617] transition"
        >
          Cancel
        </button>

        {/* Start Exam */}
        <Link to="/classroom/register-as-teacher/exam-completed"
          className="h-11 w-40 rounded-lg text-white text-sm font-medium
                     bg-gradient-to-r from-[#9333ea] to-[#8b5cf6]
                     shadow-lg shadow-purple-400/40
                     hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          Start Exam
          <span className="text-lg">››</span>
        </Link>
      </div>
    </div>
  );
};

export default ExamStartCountdown;
