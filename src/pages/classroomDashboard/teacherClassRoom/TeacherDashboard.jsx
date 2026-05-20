import { useApiQuery } from "@/hooks/apiQuery";
import {
  ClipboardCheck,
  FileText,
  Users,
  UserCheck,
  Calendar,
  Clock,
} from "lucide-react";

const TeacherDashboard = () => {
    const { data: teacherDashboardData } = useApiQuery({
    queryKey: ["instructor_dashboard"],
    url: "/instructor/dashboard",
    secure: true,
  });
    const { data: teacherDashboarpteData } = useApiQuery({
    queryKey: ["instructor_pte_homework"],
    url: "/instructor/pte-homework",
    secure: true,
  });

  console.log(teacherDashboarpteData?.data);

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Welcome to Your Teaching Dashboard
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">Batch-01</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Ongoing Exams */}
        <StatCard
          value={teacherDashboardData?.data?.ongoing_exam || 0}
          label="Ongoing exams"
          bg="bg-[#4f7f3a]"
          icon={<ClipboardCheck size={22} />}
        />

        {/* Total Exam Taken */}
        <StatCard
          value={teacherDashboardData?.data?.total_exam_taken || 0}
          label="Total exam taken"
          bg="bg-[#3e7a86]"
          icon={<FileText size={22} />}
        />

        {/* Active Students */}
        {/* <StatCard
          value="10"
          label="Active students"
          bg="bg-[#6355e7]"
          icon={<Users size={22} />}
        /> */}

        {/* Total Students */}
        <StatCard
          value={teacherDashboardData?.data?.total_student || 0}
          label="Total students"
          bg="bg-[#222]"
          icon={<UserCheck size={22} />}
        />
      </div>

      {/* Active Section */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">
          Active
        </h2>

        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 px-4 py-3 flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">#1</span>

          <span className="text-sm font-medium text-gray-800 dark:text-white">
            IELTS speaking test 01
          </span>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar size={14} />
            22th November 2025, 4:20 PM
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={14} className="text-gray-500 dark:text-gray-400" />
            <span className="text-gray-700 dark:text-white">2 hr</span>
            <span className="text-red-500 dark:text-red-500">(59:00)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;

/* ---------- Stat Card Component ---------- */

const StatCard = ({ value, label, bg, icon }) => {
  return (
    <div
      className={`relative ${bg} rounded-xl p-5 text-white overflow-hidden`}
    >
      {/* Floating Icon Bubble */}
      <div className="absolute -top-3 -right-3 w-14 h-14 bg-white/15 rounded-full flex items-center justify-center">
        {icon}
      </div>

      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">{value}</h3>
      <p className="text-sm sm:text-base md:text-lg lg:text-2xl opacity-90">{label}</p>
    </div>
  );
};
