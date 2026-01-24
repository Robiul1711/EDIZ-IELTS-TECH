import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const StudentsResults = () => {
  const students = [
    { name: "Fahim Akram", id: "+880 1234567890", attendance: "Present", mark: "7.2" },
    { name: "Fahim Akram", id: "+880 1234567890", attendance: "Absent", mark: "7.2" },
    { name: "Fahim Akram", id: "+880 1234567890", attendance: "Present", mark: "7.2" },
    { name: "Fahim Akram", id: "+880 1234567890", attendance: "Present", mark: "7.2" },
    { name: "Fahim Akram", id: "+880 1234567890", attendance: "Present", mark: "7.2" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f6ff] dark:bg-[#1E1E1E] p-6 rounded-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/classroom/register-as-teacher/exams"
          className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center
                     hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </Link>
        <h2 className="text-lg lg:text-2xl font-semibold text-gray-900 dark:text-white">
          Students results
        </h2>
      </div>

      {/* Exam Title Row */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm sm:text-base font-medium text-gray-800 whitespace-nowrap dark:text-white">
          IELTS speaking test
        </span>

        <div className="flex-1 h-px bg-gray-300" />

        <span className="text-sm sm:text-base font-semibold text-[#6366f1] dark:text-white">
          23/24
        </span>
      </div>

      {/* Table */}
      <div className="grid grid-cols-5 text-sm sm:text-base font-semibold text-gray-800 mb-4 dark:text-white">
        <span>Name</span>
        <span>ID</span>
        <span>Attendance</span>
        <span>Result</span>
        <span>Mark</span>
      </div>

      <div className="flex flex-col gap-4">
        {students.map((student, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center text-sm sm:text-base text-gray-700 dark:text-white"
          >
            {/* Name */}
            <span>{student.name}</span>

            {/* ID */}
            <span>{student.id}</span>

            {/* Attendance */}
            <span>
              <span
                className={`px-4 py-1 rounded-md text-white text-sm sm:text-base font-medium
                  ${
                    student.attendance === "Present"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
              >
                {student.attendance}
              </span>
            </span>

            {/* Result */}
            <span>
              <button
                className="px-6 py-1.5 rounded-md text-white text-sm sm:text-base font-medium
                           bg-[#2f3b52] hover:bg-[#1e293b] transition"
              >
                Review
              </button>
            </span>

            {/* Mark */}
            <span>
              <span className="px-3 py-1 rounded-md bg-[#2a2a2a] text-white text-sm sm:text-base">
                {student.mark}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsResults;
