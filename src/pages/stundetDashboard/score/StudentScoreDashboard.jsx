import { useApiQuery } from "@/hooks/apiQuery";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentScoreDashboard = () => {
  const [examType, setExamType] = useState("IELTS");
  const [activeTab, setActiveTab] = useState("section"); // 'section' or 'full'
  const { data: fullTestData, isLoading } = useApiQuery({
    queryKey: ["full-test", examType.toLowerCase()],
    url: `/student/scores/full-test?exam_type=${examType.toLowerCase()}`,
    secure: true,
  });
  const { data: homeWorkData, isLoading: isLoading2 } = useApiQuery({
    queryKey: ["home-work", examType.toLowerCase()],
    url: `/student/scores/homework?exam_type=${examType.toLowerCase()}`,
    secure: true,
  });
  const { data: sectionData, isLoading: isLoading3 } = useApiQuery({
    queryKey: ["section", examType.toLowerCase()],
    url: `/student/scores/section?exam_type=${examType.toLowerCase()}`,
    secure: true,
  });

  console.log(fullTestData?.data);
  console.log(homeWorkData);
  console.log(sectionData?.data);
  // Map Sectional Tests Data
  const sectionScores = sectionData?.data ? Object.values(sectionData.data).filter(Boolean).map(item => ({
    id: item.id,
    category: item.title || item.skill,
    date: item.date,
    score: `${item.score}/${item.max_score}`,
    status: item.status,
    icon: item.skill === 'reading' ? "📘" : item.skill === 'writing' ? "🖋️" : item.skill === 'speaking' ? "🎙️" : "🎧",
    iconBg: item.skill === 'reading' ? "bg-[#B6A4FF]/20" : item.skill === 'writing' ? "bg-[#D7F26F]/30" : item.skill === 'speaking' ? "bg-[#C6F7FC]/50" : "bg-[#FFCB74]/30",
    skill: item.skill
  })) : [];

  // Map Full Mock Tests Data
  const fullScores = fullTestData?.data ? fullTestData.data.filter(Boolean).map(item => ({
    id: item.id,
    category: item.title,
    date: item.date || "Date Pending",
    score: `${item.score}/${item.max_score}`,
    status: item.status === 'completed' ? null : item.status === 'in_progress' ? 'In Progress' : item.status,
    icon: "📝",
    iconBg: "bg-slate-100",
    skill: 'full'
  })) : [];

  // Map Homework Tests Data
  const homeworkScores = homeWorkData?.data ? homeWorkData.data.filter(Boolean).map(item => ({
    id: item.id,
    category: item.title || item.skill,
    date: item.date,
    score: `${item.score}/${item.max_score}`,
    status: item.status === 'completed' ? null : item.status === 'pending' ? 'Grading in progress' : item.status,
    icon: item.skill === 'reading' ? "📘" : item.skill === 'writing' ? "🖋️" : item.skill === 'speaking' ? "🎙️" : "🎧",
    iconBg: item.skill === 'reading' ? "bg-[#B6A4FF]/20" : item.skill === 'writing' ? "bg-[#D7F26F]/30" : item.skill === 'speaking' ? "bg-[#C6F7FC]/50" : "bg-[#FFCB74]/30",
    skill: item.skill
  })) : [];

  const currentScores =
    activeTab === "section"
      ? sectionScores
      : activeTab === "full"
        ? fullScores
        : homeworkScores;

  const getReviewPath = (skill, id) => {
    if (!skill) return "#";
    switch (skill.toLowerCase()) {
      case "reading":
        return `/dashboard/reading-review/${id}`;
      case "writing":
        return `/dashboard/writing-review/${id}`;
      case "speaking":
        return `/dashboard/speaking-review/${id}`;
      case "listening":
        return `/dashboard/listening-review/${id}`;
      default:
        return "#";
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-500">
      {/* Top Level Toggle (IELTS/PTE) */}
      <div className="flex justify-center">
        <div className="flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-full p-1.5 shadow-sm border border-slate-100 dark:border-slate-800">
          {["IELTS", "PTE"].map((type) => (
            <button
              key={type}
              onClick={() => setExamType(type)}
              className={`px-10 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                examType === type
                  ? "bg-white dark:bg-slate-800 shadow-md text-[#604CDF] dark:text-white border border-slate-50 dark:border-slate-200"
                  : "text-slate-400 border border-transparent dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-slate-800 overflow-hidden">
        {/* Uniform Pill Tab Switcher */}
        <div className="px-8 pt-8 pb-4 flex items-center gap-4">
          <button
            onClick={() => setActiveTab("section")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
              activeTab === "section"
                ? "bg-[#8B7EFF] text-white shadow-lg shadow-[#8B7EFF]/20"
                : "text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Section test scores
          </button>

          <button
            onClick={() => setActiveTab("full")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
              activeTab === "full"
                ? "bg-[#8B7EFF] text-white shadow-lg shadow-[#8B7EFF]/20"
                : "text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Full test scores
          </button>

          <button
            onClick={() => setActiveTab("homework")}
            className={`px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 ${
              activeTab === "homework"
                ? "bg-[#8B7EFF] text-white shadow-lg shadow-[#8B7EFF]/20"
                : "text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            Homework scores
          </button>
        </div>

        {/* Divider */}
        <div className="mx-8 border-b border-slate-100 dark:border-slate-800" />

        {/* Dynamic Content List */}
        <div className="px-8 pb-8 divide-y divide-slate-50 dark:divide-slate-800">
          {(isLoading || isLoading2 || isLoading3) ? (
            <div className="py-20 text-center text-slate-400 font-medium">
              Loading scores...
            </div>
          ) : currentScores.length > 0 ? (
            currentScores.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors px-4 -mx-4 rounded-2xl"
              >
                <div className="flex items-center gap-5">
                  {/* Visual Icon */}
                  {activeTab !== "homework" && (
                    <div
                      className={`w-14 h-14 flex items-center justify-center rounded-2xl text-2xl shadow-inner ${item.iconBg}`}
                    >
                      {item.icon}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-slate-700 dark:text-slate-200 text-lg">
                      {item.category}
                    </h3>
                    <p className="text-[13px] text-slate-400 font-medium">
                      {item.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {/* Always show score, do not show status */}
                  <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-black rounded-xl border border-slate-100 dark:border-slate-700 min-w-[65px] text-center">
                    {item.score}
                  </div>
                  {/* some changes  */}

                  {/* Interaction Buttons */}
                  <div className="flex items-center gap-3">
                    <Link
                      to={getReviewPath(item.skill, item.id)}
                      className="px-7 py-2.5 bg-[#3E4555] dark:bg-slate-700 text-white text-xs font-bold rounded-xl 
               hover:bg-[#2D3440] dark:hover:bg-slate-600 transition-all active:scale-95 shadow-sm"
                    >
                      Review
                    </Link>

                    {activeTab !== "homework" && (
                      <button className="px-7 py-2.5 bg-[#604CDF] text-white text-xs font-bold rounded-xl hover:bg-[#4A3AFF] transition-all active:scale-95 shadow-md shadow-[#604CDF]/20">
                        Retake exam
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center text-slate-400 font-medium italic">
              No {activeTab} scores found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentScoreDashboard;
