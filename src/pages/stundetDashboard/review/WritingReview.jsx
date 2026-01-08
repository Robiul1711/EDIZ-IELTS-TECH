import React, { useState } from "react";
import {
  ChevronLeft,
  Image as ImageIcon,
  MessageSquare,
  X,
} from "lucide-react";

const WritingReview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#FBFBFF] dark:bg-slate-950 p-4 rounded-xl font-sans relative overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
        <div className="flex items-center gap-2">
          <span className="bg-[#E8E4FF] text-[#6C5CE7] px-4 py-1.5 rounded-lg text-sm font-bold">
            Writing
          </span>
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-1">
            <div className="bg-[#334155] dark:bg-slate-700 text-white px-3 py-1 rounded-md text-xs font-bold flex gap-2 items-center">
              1 <span className="opacity-60 font-medium">6/9.0</span>
            </div>
            <div className="text-slate-400 dark:text-slate-500 px-3 py-1 text-xs font-bold flex gap-2 items-center">
              2 <span className="opacity-60 font-medium">8/9.0</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`flex gap-8 transition-all duration-500 ${
          isFeedbackOpen ? "mr-[400px]" : ""
        }`}
      >
        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
          {/* Task Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
              <span>Q1:</span>
              <span>Task 1 - Bar chart</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-800 dark:text-white leading-tight max-w-2xl">
              US trade deficit and effective tariffs rate as of April 4th
            </h1>
            <button className="flex items-center gap-2 px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 font-bold text-sm bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all w-full max-w-md justify-center shadow-sm">
              <ImageIcon className="w-4 h-4" />
              Show Image
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* User Answer Section */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-black text-slate-700 dark:text-slate-200">
                  Your Answer
                </h3>
                <span className="bg-[#E2E8F0] dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold">
                  Word counts: 200
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-300 leading-relaxed text-[15px] min-h-[400px]">
                <p className="mb-4">
                  The bar chart illustrates the United States' trade deficit
                  alongside the country's effective tariff rates as of April
                  4th. Overall, the data shows a substantial gap between the
                  value of imports and exports, while tariff levels remain
                  relatively low in comparison.
                </p>
                <p className="mb-4">
                  According to the chart, the U.S. trade deficit is considerably
                  high, indicating that the country imports significantly more
                  goods than it exports. The deficit appears to be the dominant
                  figure in the chart, highlighting ongoing economic challenges
                  related to international trade.
                </p>
                <p>
                  The relationship between the two indicators implies that low
                  tariffs have not necessarily reduced the trade deficit.
                  Instead, factors such as domestic demand for foreign goods and
                  global supply chains may play a more influential role.
                </p>
              </div>
            </div>

            {/* Raw Score Center (Static) */}
            <div className="lg:col-span-1 py-10">
              <div className="bg-[#F4F7FF] dark:bg-slate-900 rounded-2xl p-4 border border-blue-50 dark:border-slate-800 text-center sticky top-10">
                <div className="text-2xl font-black text-slate-800 dark:text-white leading-none">
                  6.0
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-bold">
                    /9.0
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1 tracking-tighter">
                  Raw score
                </p>
              </div>
            </div>

            {/* Model Answer Section */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-[#6C5CE7] text-white px-5 py-1.5 rounded-full text-xs font-bold shadow-md shadow-indigo-100">
                  Model Answer
                </span>
                <span className="bg-[#E2E8F0] dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-full text-xs font-bold">
                  Word counts: 200
                </span>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm text-slate-500 dark:text-slate-400 leading-relaxed text-[14px] opacity-80 min-h-[400px] border-l-4 border-l-slate-400 dark:border-l-slate-600">
                <p className="mb-4">
                  The bar chart illustrates the United States' trade deficit
                  alongside the country's effective tariff rates as of April
                  4th. Overall, the data shows a substantial gap between the
                  value of imports and exports, while tariff levels remain
                  relatively low in comparison.
                </p>
                <p>
                  According to the chart, the U.S. trade deficit is considerably
                  high, indicating that the country imports significantly more
                  goods than it exports. The deficit appears to be the dominant
                  figure in the chart, highlighting ongoing economic
                  challenges...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Feedback Panel */}
        {isFeedbackOpen && (
          <div className="fixed top-8 bottom-8 right-8 w-[380px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden z-40 animate-in slide-in-from-right-8 duration-500">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky top-0">
              <h2 className="text-[#6C5CE7] font-black text-xl tracking-tight">
                AI Feedback
              </h2>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400 dark:text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-end">
                <span className="bg-[#8B7EFF] text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-lg shadow-indigo-50">
                  Explanation
                </span>
              </div>

              <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-[14px] leading-relaxed border border-slate-100 dark:border-slate-700 italic">
                <p>
                  This task asks you to describe and summarise the information
                  presented in a bar chart about the U.S. trade deficit and
                  effective tariff rates as of April 4th. You are expected to
                  highlight the main trends, compare the two indicators, and
                  present key features clearly.
                </p>
                <p className="mt-4">
                  The purpose is not to explain economic causes in depth but to
                  summarise what the chart shows using accurate data and
                  objective language.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-50 dark:border-slate-800 space-y-3">
              <button className="w-full py-3.5 bg-[#E8E4FF] dark:bg-[#E8E4FF]/10 text-[#6C5CE7] dark:text-[#E8E4FF] font-bold rounded-2xl text-sm hover:bg-[#DCD5FF] dark:hover:bg-[#E8E4FF]/20 transition-all">
                Explanation
              </button>
              <button className="w-full py-3.5 border-2 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 font-bold rounded-2xl text-sm hover:border-[#8B7EFF] dark:hover:border-[#8B7EFF] hover:text-[#8B7EFF] transition-all">
                Feedback
              </button>
            </div>
          </div>
        )}

        {/* Floating Toggle Button */}
        {!isFeedbackOpen && (
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-[#6C5CE7] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group"
          >
            <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
};

export default WritingReview;
