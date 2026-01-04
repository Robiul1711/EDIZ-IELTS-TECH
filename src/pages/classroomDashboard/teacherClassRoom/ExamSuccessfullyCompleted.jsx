import { SuccessfullyCompletedIcon } from "@/components/svg/TeacherClassRoom";
import { Link } from "react-router-dom";

const ExamSuccessfullyCompleted = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center px-4">
      
      {/* Circular Countdown */}
      <div className="relative mb-8">
        <div
          
        >
            <SuccessfullyCompletedIcon />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm sm:text-xl text-gray-500 text-center max-w-md mb-12">
       The exam has been successfully completed.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-6">
        {/* Cancel */}
        <Link 
          to="/classroom/register-as-teacher/exam-start"
          className="py-3 px-4 rounded-lg text-white text-sm font-medium
                     bg-[#0f172a] shadow-md
                     hover:bg-[#020617] transition"
        >
         Back to Exam List
        </Link>

        {/* Start Exam */}
        <Link 
          to="/classroom/register-as-teacher/grading"
          className="py-2 px-4  rounded-lg text-white text-sm font-medium
                     bg-gradient-to-r from-[#9333ea] to-[#8b5cf6]
                     shadow-lg shadow-purple-400/40
                     hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          View Student Results
          <span className="text-xl">››</span>
        </Link>
      </div>
    </div>
  );
};

export default ExamSuccessfullyCompleted;
