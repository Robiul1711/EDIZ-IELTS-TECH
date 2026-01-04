import { Search } from "lucide-react";

const StudentList = () => {
  const students = Array.from({ length: 18 }, (_, i) => ({
    sl: i + 1,
    name: "Fahim Akram",
    id: "+880 1234567890",
  }));

  // split into 3 columns like the image
  const columns = [
    students.slice(0, 6),
    students.slice(6, 12),
    students.slice(12, 18),
  ];

  return (
    <div className="min-h-screen  pt-1">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="px-4 py-2 rounded-full bg-[#4b5563] text-white text-sm">
          Batch no. 23A
        </span>

        <span className="px-4 py-2 rounded-full bg-[#4b5563] text-white text-sm">
          Total student: 17
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
                       focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#d7dbf0] rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((group, colIndex) => (
            <div
              key={colIndex}
              className={`${
                colIndex !== 0 ? "md:border-l md:pl-4 border-[#d7dbf0]" : ""
              }`}
            >
              {/* Header */}
              <div className="grid grid-cols-3 text-sm md:text-base font-semibold text-gray-800 mb-3">
                <span>SL</span>
                <span>Name</span>
                <span>ID</span>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-3">
                {group.map((student) => (
                  <div
                    key={student.sl}
                    className="grid grid-cols-3 text-sm md:text-base text-gray-700"
                  >
                    <span>{student.sl}</span>
                    <span>{student.name}</span>
                    <span>{student.id}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
