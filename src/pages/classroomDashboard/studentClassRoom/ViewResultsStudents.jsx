import React from "react";
import { ChevronLeft, BookOpen, Monitor, PieChart } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import NavigationButton from "@/components/common/NavigationButton";

const ViewResultsStudents = () => {
  const { id } = useParams();

  const submissions = [
    {
      name: "Nargis",
      status: "Completed",
      time: "45 min",
      score: "7.0/9",
      statusColor: "text-green-500",
    },
    {
      name: "Kona",
      status: "Not completed",
      time: "30 min",
      score: "0/9",
      statusColor: "text-red-500",
    },
    {
      name: "Tamanna",
      status: "Completed",
      time: "40 min",
      score: "7.0/9",
      statusColor: "text-green-500",
    },
    {
      name: "Nargis",
      status: "Completed",
      time: "55 min",
      score: "7.0/9",
      statusColor: "text-green-500",
    },
    {
      name: "Nargis",
      status: "Completed",
      time: "1 hr 12 min",
      score: "5/9 (weak)",
      statusColor: "text-green-500",
      scoreColor: "text-red-500",
    },
  ];

  return (
    <div className="">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          to="/classroom/register-as-student/student-home-work"
          className="w-10 h-10 rounded-full bg-[#604CDF] flex items-center justify-center text-white hover:bg-[#503dc7] transition-colors shadow-lg"
        >
          <ChevronLeft size={24} />
        </Link>
      </div>

      {/* Summary Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm mb-8">
        <div className="mb-4">
          <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold ring-1 ring-red-500/20">
            submitted: 9/24
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white">
            IELTS Writing Task - 1
          </h1>
          <span className="inline-flex items-center px-4 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/50 text-indigo-500 dark:text-indigo-400 text-sm font-medium">
            Cambridge A
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400 text-sm mb-6 pb-6 border-b border-gray-50 dark:border-slate-800/50">
          <div className="flex items-center gap-2">
            <BookOpen
              size={16}
              className="text-indigo-600 dark:text-indigo-400"
            />
            <span className="font-medium">Book 20</span>
          </div>
          <div className="flex items-center gap-2">
            <Monitor size={16} className="text-green-500" />
            <span className="font-medium">Test 1</span>
          </div>
          <div className="flex items-center gap-2">
            <PieChart
              size={16}
              className="text-slate-500 dark:text-slate-400"
            />
            <span className="font-medium">Part 2</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 md:gap-8 text-slate-500 dark:text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <span>HW time:</span>
            <b className="text-slate-700 dark:text-slate-200 font-semibold">
              40 min
            </b>
          </div>
          <span className="hidden md:block text-slate-200 dark:text-slate-700">
            |
          </span>
          <div className="flex items-center gap-2">
            <span>Score:</span>
            <b className="text-slate-700 dark:text-slate-200 font-semibold">
              7
            </b>
          </div>
          <span className="hidden md:block text-slate-200 dark:text-slate-700">
            |
          </span>
          <div className="flex items-center gap-2">
            <span>Due:</span>
            <b className="text-slate-700 dark:text-slate-200 font-semibold">
              12 Jan 2026
            </b>
          </div>
        </div>
      </div>

      {/* Student Submission List Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">
          Student Submission List
        </h2>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-sm font-semibold border-b border-gray-100 dark:border-slate-800">
                <th className="py-4 px-6 font-medium">Student</th>
                <th className="py-4 px-6 font-medium">Status</th>
                <th className="py-4 px-6 font-medium">Time Spent</th>
                <th className="py-4 px-6 font-medium">Score</th>
                <th className="py-4 px-6 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {submissions.map((sub, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="py-4 px-6 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap">
                    {sub.name}
                  </td>
                  <td
                    className={`py-4 px-6 font-bold ${sub.statusColor} whitespace-nowrap`}
                  >
                    {sub.status}
                  </td>
                  <td className="py-4 px-6 text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    {sub.time}
                  </td>
                  <td
                    className={`py-4 px-6 font-bold ${
                      sub.scoreColor || "text-slate-700 dark:text-slate-200"
                    } whitespace-nowrap`}
                  >
                    {sub.score}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button className="text-[#334156] dark:text-slate-300 font-extrabold hover:underline underline-offset-4">
                      View answer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewResultsStudents;
