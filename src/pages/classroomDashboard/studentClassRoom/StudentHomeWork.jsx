import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  BookOpen,
  Monitor,
  PieChart,
  Calendar,
  ClipboardCheck,
  FileText,
  X,
} from "lucide-react";
import HomeWorkResultModal from "../../../components/modals/HomeWorkResultModal";
import { useApiQuery } from "@/hooks/apiQuery";

const HomeworkCard = ({ data, onViewResult }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
      {/* Title and Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight">
          {data.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
            {data.category}
          </span>
          <span
            className={`px-3 py-1 rounded-full ${data.status === "active" ? "bg-indigo-600" : "bg-green-500"} text-white text-xs font-semibold`}
          >
            {data.status}
          </span>
        </div>
      </div>

      {/* Meta Info with Icons */}
      <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs">
        <div className="flex items-center gap-1.5">
          <BookOpen
            size={14}
            className="text-indigo-600 dark:text-indigo-400"
          />
          <span>{data.book_no}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Monitor size={14} className="text-green-500" />
          <span>{data.test_no}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <PieChart size={14} className="text-slate-500 dark:text-slate-400" />
          <span>{data.part_no}</span>
        </div>
      </div>

      {/* Numerical Details */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          HW time:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.time}</b>
        </span>
        <span className="text-slate-300 dark:text-slate-600">|</span>
        <span>
          Score:{" "}
          <b className="text-slate-700 dark:text-slate-200">{data.score || "Pending"}</b>
        </span>
      </div>

      {/* Due Date */}
      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
        <span>
          Due: <b className="text-slate-700 dark:text-slate-200">{data.due_date}</b>
        </span>
      </div>
{console.log(data)}
      {data.status === "not_complete" ? (
        <Link
          to={`/classroom/register-as-student/start-homework/${data.id}`}
          className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
        >
          Start Homework
        </Link>
      ) : (
        <div className="flex  gap-2">
          <button
            onClick={() => onViewResult(data)}
            className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
          >
            View Details
          </button>
          <Link
            to={`/classroom/register-as-student/view-results/${data.id}`}
            className="w-full py-2.5 rounded-lg bg-[#334156] hover:bg-[#2a3547] text-white font-semibold transition-colors mt-auto flex items-center justify-center"
          >
            View Result
          </Link>
        </div>
      )}
    </div>
  );
};

const StudentHomeWork = () => {
  const { data: studentDashboardData, isLoading: studentDashboardLoading } =
    useApiQuery({
      queryKey: ["classroom_dashboard_student"],
      url: "/student/dashboard",
      secure: true,
    });

  const { data: assignedHomeworks, isLoading: assignedHomeworksLoading } =
    useApiQuery({
      queryKey: ["assignedHomeworks"],
      url: "/student/homework",
      secure: true,
    });
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewResult = (hw) => {
    setSelectedHomework(hw);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Homework
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          View your assigned homework, track deadlines, and submit your work
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {studentDashboardLoading ? (
          <>
            <StatSkeleton />
            <StatSkeleton />
          </>
        ) : (
          <>
            {/* Ongoing Exams */}
            <StatCard
              value={studentDashboardData?.data?.pending_homework}
              label="Pending Homework"
              bg="bg-[#4f7f3a]"
              icon={<ClipboardCheck size={22} />}
            />

            {/* Total Exam Taken */}
            <StatCard
              value={studentDashboardData?.data?.submitted_homework}
              label="Submitted"
              bg="bg-[#3e7a86]"
              icon={<FileText size={22} />}
            />
          </>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 p-6  space-y-12 shadow-sm">
        {/* Active Homework Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold">
            Active homework
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedHomeworksLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <HomeworkSkeleton key={i} />)
            ) : assignedHomeworks?.data?.ongoing?.length > 0 ? (
              assignedHomeworks?.data?.ongoing?.map((hw, idx) => (
                <HomeworkCard
                  key={idx}
                  data={hw}
                  onViewResult={handleViewResult}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                No active homework found
              </div>
            )}
          </div>
        </section>

        {/* Homework History Section */}
        <section className="space-y-6">
          <div className="inline-block px-4 py-1 rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-sm font-semibold">
            Submitted
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedHomeworksLoading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <HomeworkSkeleton key={i} />)
            ) : assignedHomeworks?.data?.submitted?.length > 0 ? (
              assignedHomeworks?.data?.submitted?.map((hw, idx) => (
                <HomeworkCard
                  key={idx}
                  data={hw}
                  onViewResult={handleViewResult}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-slate-400 dark:text-slate-500 font-medium">
                No submitted homework found
              </div>
            )}
          </div>
        </section>

        <HomeWorkResultModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          data={selectedHomework}
        />
      </div>
    </div>
  );
};

const StatSkeleton = () => (
  <div className="bg-slate-100 dark:bg-slate-800 animate-pulse rounded-xl p-5 h-28 border border-slate-100 dark:border-slate-700"></div>
);

const HomeworkSkeleton = () => (
  <div className="bg-white dark:bg-slate-800/50 animate-pulse rounded-2xl p-5 border border-gray-100 dark:border-slate-700 flex flex-col gap-5 h-64">
    <div className="space-y-3">
      <div className="h-6 bg-slate-100 dark:bg-slate-700 rounded-lg w-3/4"></div>
      <div className="flex gap-2">
        <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded-full w-20"></div>
        <div className="h-5 bg-slate-100 dark:bg-slate-700 rounded-full w-16"></div>
      </div>
    </div>
    <div className="flex gap-4">
      <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-12"></div>
      <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-12"></div>
      <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-12"></div>
    </div>
    <div className="mt-auto h-11 bg-slate-100 dark:bg-slate-700 rounded-xl w-full"></div>
  </div>
);

const StatCard = ({ value, label, bg, icon }) => {
  return (
    <div className={`relative ${bg} rounded-xl p-5 text-white overflow-hidden`}>
      {/* Floating Icon Bubble */}
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-white/15 rounded-full flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
        {value}
      </h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-2xl opacity-90">
        {label}
      </p>
    </div>
  );
};

export default StudentHomeWork;
