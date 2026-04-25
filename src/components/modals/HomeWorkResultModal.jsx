import React from "react";
import { X, BookOpen, Monitor, PieChart } from "lucide-react";

const HomeWorkResultModal = ({ isOpen, onClose, data }) => {
  console.log(data);
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className="bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-2xl overflow-hidden relative shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={24} className="text-slate-400" />
        </button>

        <div className="p-10 pt-12 space-y-8">
          {/* Top Info Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                {data.title}
              </h2>
              <div className="flex gap-2">
                <span className="px-4 py-1 rounded-full border border-indigo-200 dark:border-indigo-800 text-indigo-500 dark:text-indigo-400 text-sm">
                Ongoing
                </span>
                {/* <span className="px-4 py-1 rounded-full bg-[#94A3B8] text-white text-sm">
                  {data.submitted}
                </span> */}
              </div>
            </div>

            <div className="flex items-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <BookOpen size={20} className="text-[#6366F1]" />
                <span className="">{data.book_no}</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor size={20} className="text-[#22C55E]" />
                <span className="">{data.test_no}</span>
              </div>
              <div className="flex items-center gap-2">
                <PieChart size={20} className="text-slate-400" />
                <span className="">{data.part_no}</span>
              </div>
            </div>
          </div>

          {/* middle info row */}
          <div className="flex items-center justify-start gap-6 px-4 text-slate-400 dark:text-slate-500 text-base">
            <div className="flex items-center gap-2">
              <span>HW time:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {data.time}
              </span>
            </div>
            <div className="w-[1px] h-5 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span>Score:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {data.score || "Pending"}
              </span>
            </div>
            <div className="w-[1px] h-5 bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <span>Due:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {data.due_date}
              </span>
            </div>
          </div>

          {/* Bottom Result Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between text-[15px]">
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="font-bold text-[#6366F1]">Your HW time:</span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {data.myTime || "25 min"}
                </span>
              </div>
              <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="font-bold text-[#6366F1]">
                  Obtained Score:
                </span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {data.myScore || "8"}
                </span>
              </div>
              <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700" />
              <div className="flex-1 flex items-center justify-center gap-2">
                <span className="font-bold text-[#6366F1]">
                  Submitted date:
                </span>
                <span className="font-bold text-slate-800 dark:text-white">
                  {data.submittedDate || "16 Jan 2026"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeWorkResultModal;
