import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useApiQuery } from "@/hooks/apiQuery";
import {
  FileText,
  ClipboardList,
  Eye,
  BookOpen,
  GraduationCap,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  TrendingUp,
  Award,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const Report = () => {
  const [activeTab, setActiveTab] = useState("exam"); // "exam" or "homework"
  const [subTab, setSubTab] = useState("ielts"); // "ielts"
  const [searchQuery, setSearchQuery] = useState("");

  const { data: examData, isLoading: examLoading } = useApiQuery({
    queryKey: ["my-exam-submissions"],
    url: "/student/my-exam-submissions",
    secure: true,
  });

  const { data: homeworkData, isLoading: homeworkLoading } = useApiQuery({
    queryKey: ["my-submissions"],
    url: "/student/my-submissions",
    secure: true,
  });

  const isLoading = activeTab === "exam" ? examLoading : homeworkLoading;

  const filteredData = useMemo(() => {
    const rawData = activeTab === "exam" ? examData?.data : homeworkData?.data;
    if (!rawData || !Array.isArray(rawData)) return [];

    return rawData.filter((item) => {
      const type = (
        activeTab === "exam" ? item.test_type : item.homework_model
      )?.toLowerCase();
      const title = (
        activeTab === "exam" ? item.exam_title : item.homework_title
      )?.toLowerCase();

      const matchesSubTab =
        subTab === "pte"
          ? type === "pte"
          : type === subTab.toLowerCase();

      const matchesSearch = title?.includes(searchQuery.toLowerCase());

      return matchesSubTab && matchesSearch;
    });
  }, [activeTab, subTab, examData, homeworkData, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#09090b] p-4 md:p-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Academic Report
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track your progress and performance across all assessments
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative group max-w-md w-full md:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#121214] border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm dark:text-white"
          />
        </div>
      </div>

      {/* Main Tabs Control */}
      <div className="flex flex-col space-y-6">
        <div className="flex p-1.5 bg-slate-200/50 dark:bg-[#121214] rounded-2xl w-fit border border-slate-200 dark:border-slate-800 shadow-sm">
          <TabButton
            active={activeTab === "exam"}
            onClick={() => setActiveTab("exam")}
            icon={<GraduationCap size={18} />}
            label="Exam Report"
          />
          <TabButton
            active={activeTab === "homework"}
            onClick={() => setActiveTab("homework")}
            icon={<BookOpen size={18} />}
            label="Homework Report"
          />
        </div>

        {/* Sub Tabs Control */}
        <div className="flex items-center gap-4">
          <div className="flex gap-2 p-1 bg-white dark:bg-[#121214] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <SubTabButton
              active={subTab === "ielts"}
              onClick={() => setSubTab("ielts")}
              label="IELTS"
            />
            <SubTabButton
              active={subTab === "pte"}
              onClick={() => setSubTab("pte")}
              label="PTE"
            />
          </div>
          
          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 mx-2" />
          
          <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Showing {filteredData.length} {activeTab}s
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white dark:bg-[#121214] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        {isLoading ? (
          <LoadingState />
        ) : filteredData.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest w-16 text-center">
                    SL
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Assessment Name
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Details
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Score
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-6 py-5 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                <AnimatePresence mode="popLayout">
                  {filteredData.map((item, index) => (
                    <ReportRow
                      key={item.submission_id}
                      index={index + 1}
                      item={item}
                      type={activeTab}
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState subTab={subTab} activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

/* ---------------- Components ---------------- */

const TabButton = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300",
      active
        ? "bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
        : "text-slate-500 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
    )}
  >
    {icon}
    {label}
  </button>
);

const SubTabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={cn(
      "px-5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all",
      active
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
        : "text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-zinc-800"
    )}
  >
    {label}
  </button>
);

const ReportRow = ({ index, item, type }) => {
  const title = type === "exam" ? item.exam_title : item.homework_title;
  const isComplete = item.status === "complete";

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors"
    >
      <td className="px-6 py-5 text-center">
        <span className="text-sm font-mono text-slate-400 dark:text-slate-600">
          {index.toString().padStart(2, "0")}
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </span>
          <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Award size={12} className="text-amber-500" />
              {item.skill.replace("_", " ")}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="flex items-center gap-1 lowercase">
              <User size={12} className="text-blue-500" />
              {item.instructor}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
            <Calendar size={14} className="text-slate-400" />
            {item.submitted_at}
          </div>
          <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
            <Clock size={12} />
            Submission ID: #{item.submission_id}
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center border border-slate-200 dark:border-zinc-700 group-hover:border-indigo-200 dark:group-hover:border-indigo-900/50 transition-colors">
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {item.mark || "0"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">
              Score
            </span>
            <div className="h-1 w-12 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-indigo-500 rounded-full" 
                style={{ width: `${Math.min((item.mark / 100) * 100, 100)}%` }} 
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-5">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
            isComplete
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
          )}
        >
          {isComplete && <CheckCircle2 size={12} />}
          {item.status}
        </span>
      </td>
      <td className="px-6 py-5 text-right">
        <Link 
          to={`/classroom/register-as-student/view-results/${item.submission_id}`}
          className="inline-block p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-all shadow-sm active:scale-95 group/btn"
        >
          <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
        </Link>
      </td>
    </motion.tr>
  );
};

const LoadingState = () => (
  <div className="p-8 space-y-6">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-6 animate-pulse">
        <div className="h-10 w-10 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-slate-100 dark:bg-zinc-800 rounded-md w-1/4" />
          <div className="h-3 bg-slate-50 dark:bg-zinc-900 rounded-md w-1/6" />
        </div>
        <div className="h-10 w-32 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
        <div className="h-10 w-10 bg-slate-100 dark:bg-zinc-800 rounded-xl" />
      </div>
    ))}
  </div>
);

const EmptyState = ({ subTab, activeTab }) => (
  <div className="py-20 flex flex-col items-center justify-center text-center px-4">
    <div className="h-20 w-20 rounded-full bg-slate-50 dark:bg-zinc-900 flex items-center justify-center mb-6">
      <TrendingUp size={40} className="text-slate-300 dark:text-zinc-700" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
      No {activeTab} data found
    </h3>
    <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
      It looks like you haven't completed any {subTab.toUpperCase()} {activeTab}s yet.
      Keep studying to see your progress here!
    </p>
  </div>
);

export default Report;
