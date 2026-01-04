import { SuccessfullyCompletedIcon } from "@/components/svg/TeacherClassRoom";
import { Link } from "react-router-dom";

const Report = () => {
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
      <div className="flex items-center text-center  gap-6 max-w-sm mx-auto w-full">
        {/* Cancel */}
        <Link 
          to="/classroom/register-as-student/exam-history"
          className="py-3 px-4 rounded-lg text-white text-sm font-medium w-full
                     bg-[#0f172a] shadow-md
                     hover:bg-[#020617] transition"
        >
       See exam report
        </Link>

      </div>
    </div>
  );
};

export default Report;
