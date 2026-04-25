import React, { useState } from "react";
import { Link } from "react-router-dom";

const StudentScoreDashboard = () => {
  const [examType, setExamType] = useState("IELTS");
  const [activeTab, setActiveTab] = useState("section"); // 'section' or 'full'

  // Data for Sectional Tests
  const sectionScores = [
    {
      id: 1,
      category: "Reading",
      date: "02 Dec 2025, 14:02",
      score: null,
      status: "Grading in progess",
      icon: "📘",
      iconBg: "bg-[#B6A4FF]/20",
    },
    {
      id: 2,
      category: "Writing",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🖋️",
      iconBg: "bg-[#D7F26F]/30",
    },
    {
      id: 3,
      category: "Speaking",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🎙️",
      iconBg: "bg-[#C6F7FC]/50",
    },
    {
      id: 4,
      category: "Listening",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🎧",
      iconBg: "bg-[#FFCB74]/30",
    },
  ];

  // Data for Full Mock Tests
  const fullScores = [
    {
      id: 101,
      category: "IELTS Full Mock Test 1",
      date: "28 Nov 2025, 10:00",
      score: "6.5/9",
      status: null,
      icon: "📝",
      iconBg: "bg-slate-100",
    },
    {
      id: 102,
      category: "PTE Full Mock Test 1",
      date: "15 Nov 2025, 09:30",
      score: "74/90",
      status: null,
      icon: "📝",
      iconBg: "bg-slate-100",
    },
  ];

  // Data for Homework Tests
  const homeworkScores = [
    {
      id: 1,
      category: "Reading",
      date: "02 Dec 2025, 14:02",
      score: null,
      status: "Grading in progess",
      icon: "📘",
      iconBg: "bg-[#B6A4FF]/20",
    },
    {
      id: 2,
      category: "Writing",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🖋️",
      iconBg: "bg-[#D7F26F]/30",
    },
    {
      id: 3,
      category: "Speaking",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🎙️",
      iconBg: "bg-[#C6F7FC]/50",
    },
    {
      id: 4,
      category: "Listening",
      date: "01 Dec 2025, 14:02",
      score: "0/9",
      status: null,
      icon: "🎧",
      iconBg: "bg-[#FFCB74]/30",
    },
  ];

  const currentScores =
    activeTab === "section"
      ? sectionScores
      : activeTab === "full"
        ? fullScores
        : homeworkScores;
  const getReviewPath = (category, id) => {
    switch (category.toLowerCase()) {
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
        <div className="flex bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-slate-100 dark:border-slate-800">
          {["IELTS", "PTE"].map((type) => (
            <button
              key={type}
              onClick={() => setExamType(type)}
              className={`px-10 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                examType === type
                  ? "bg-white dark:bg-slate-800 shadow-md text-[#604CDF] dark:text-white border border-slate-50 dark:border-slate-700"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
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
          {currentScores.map((item) => (
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
                {/* Score Status */}
                {item.status ? (
                  <span className="px-5 py-2 bg-[#F5F3FF] text-[#604CDF] text-xs font-bold rounded-xl border border-[#604CDF]/10">
                    {item.status}
                  </span>
                ) : (
                  <div className="px-5 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-black rounded-xl border border-slate-100 dark:border-slate-700 min-w-[65px] text-center">
                    {item.score}
                  </div>
                )}

                {/* Interaction Buttons */}
                <div className="flex items-center gap-3">
                  <Link
                    to={getReviewPath(item.category, item.id)}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentScoreDashboard;
