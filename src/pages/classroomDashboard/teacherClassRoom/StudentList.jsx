import { Search } from "lucide-react";
import { useApiQuery } from "@/hooks/apiQuery";

const StudentList = () => {
  const { data: studentListData, isLoading } = useApiQuery({
    queryKey: ["my-students"],
    url: "/instructor/my-students",
    secure: true,
  });

  const students = studentListData?.data?.students || [];

  if (isLoading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-1">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="px-4 py-2 rounded-full bg-[#4b5563] text-white text-sm font-medium">
          {studentListData?.data?.batch_name || "N/A"}
        </span>

        <span className="px-4 py-2 rounded-full bg-[#4b5563] text-white text-sm font-medium">
          Total student: {studentListData?.data?.student_count || 0}
        </span>

        {/* Search */}
        <div className="ml-auto relative w-full sm:w-[280px]">
          <Search
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search student"
            className="w-full h-10 rounded-full border border-[#c7cbe7] bg-transparent
                       pl-4 pr-10 text-sm placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-purple-400 dark:text-white"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white dark:bg-gray-800 border border-[#d7dbf0] rounded-lg shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-700/50 px-6 py-4 border-b border-[#d7dbf0] text-sm font-bold text-gray-500 uppercase tracking-wider">
          <span>SL</span>
          <span>Name</span>
          <span>ID No</span>
          <span className="text-right">Email</span>
        </div>

        {/* Table Body (One Line per Student) */}
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {students.map((student, index) => (
            <div
              key={student.student_id_no}
              className="grid grid-cols-4 px-6 py-4 text-sm text-gray-700 dark:text-gray-200 items-center hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <span className="font-medium text-gray-400">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="font-semibold">{student.student_name}</span>
              <span className="text-gray-500">{student.student_id_no}</span>
              <span className="text-right text-blue-500 truncate">
                {student.student_email}
              </span>
            </div>
          ))}

          {students.length === 0 && (
            <div className="p-10 text-center text-gray-400 italic">
              No students found in this batch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;