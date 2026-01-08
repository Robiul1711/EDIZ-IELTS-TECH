import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const SelectExamType = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] bg-gradient-to-b  flex flex-col items-center justify-center ">
<Link
  to="/classroom/register-as-teacher/exams"
  className="mb-10 inline-flex items-center gap-3
             px-3 py-1 rounded-full
             bg-white/80 backdrop-blur
             border border-gray-200
             text-gray-700 font-medium
             shadow-sm hover:shadow-md
             hover:bg-white transition-all"
>
  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-custom text-white">
    <ArrowLeft size={20} />
  </span>
  Back
</Link>

      <div className="text-center">
        {/* Title */}
        <h2 className="text-4xl font-bold text-gray-900 mb-2  dark:text-white">
          Select Exam Type
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-500 mb-6 dark:text-gray-400">
          select whether you want to take the IELTS or PTE exam
        </p>

        {/* Options */}
        <div className="flex items-center justify-center gap-6">
          {/* IELTS */}
          <Link 
            to="/classroom/register-as-teacher/choose-exam-list-ielts"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full
                       border border-gray-200 bg-white
                       hover:bg-gray-50 transition"
          >
            <div
              className="w-8 h-8 rounded-md bg-custom text-white 
                            flex items-center justify-center text-2xl font-bold"
            >
              I
            </div>
            <span className="text-3xl font-bold text-gray-800 ">IELTS</span>
          </Link>

          {/* PTE */}
        <Link 
            to="/classroom/register-as-teacher/choose-exam-list-pte"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full
                       border border-gray-200 bg-white
                       hover:bg-gray-50 transition"
          >
            <div
              className="w-8 h-8 rounded-md bg-custom text-white 
                            flex items-center justify-center text-2xl  font-bold"
            >
              P
            </div>
            <span className="text-3xl font-bold  text-gray-800">PTE</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SelectExamType;
