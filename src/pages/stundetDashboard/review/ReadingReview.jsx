import React, { useState } from "react";
import { X, MessageSquare, CheckCircle2, ChevronRight } from "lucide-react";
import PaginationSection from "@/pages/ListeningAllPages/PaginationSection";

const ReadingReview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  const questions = [
    {
      id: 1,
      text: "The original design of the Greywater Bridge included high-density cable joints.",
      status: "incorrect",
      userAnswer: "True",
      correctAnswer: "False",
    },
    {
      id: 2,
      text: "The original design of the Greywater Bridge included high-density cable joints.",
      status: "neutral",
    },
    {
      id: 3,
      text: "The original design of the Greywater Bridge included high-density cable joints.",
      status: "neutral",
    },
    {
      id: 4,
      text: "The original design of the Greywater Bridge included high-density cable joints.",
      status: "neutral",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFF] dark:bg-slate-950 p-6 rounded-xl font-sans relative overflow-hidden">
      <div className="mb-6">
        <PaginationSection />
      </div>
      <div
        className={`flex gap-8 transition-all duration-500 ${
          isFeedbackOpen ? "mr-[400px]" : ""
        }`}
      >
        {/* 1. Left Section: Answer Comparison */}
        <div className="w-64 space-y-4 shrink-0">
          <div className="bg-[#C2410C] rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 text-white text-sm font-bold">
              Your answer
            </div>
            <div className="bg-white dark:bg-slate-800 m-1.5 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                True
              </span>
            </div>
          </div>

          <div className="bg-[#334155] rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 text-white text-sm font-bold">
              Correct answer
            </div>
            <div className="bg-white dark:bg-slate-800 m-1.5 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
              <span className="text-slate-700 dark:text-slate-200 font-medium">
                False
              </span>
            </div>
          </div>
        </div>

        {/* 2. Middle Section: Question List */}
        <div className="flex-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 shadow-sm border border-slate-100 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              Identifying Information
            </h2>
            <div className="space-y-1 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              <p>
                Choose <span className="font-bold">TRUE</span> if the statement
                agrees with the information,
              </p>
              <p>
                Choose <span className="font-bold">FALSE</span> if it
                contradicts the information,
              </p>
              <p>
                Choose <span className="font-bold">NOT GIVEN</span> if there is
                no information.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {questions.map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQuestion(q.id)}
                className={`group cursor-pointer rounded-2xl p-5 border transition-all duration-200 ${
                  selectedQuestion === q.id
                    ? "bg-[#E0E7FF]/40 dark:bg-[#E0E7FF]/10 border-[#6C5CE7] shadow-md"
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-600 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`font-bold ${
                      selectedQuestion === q.id
                        ? "text-[#6C5CE7]"
                        : "text-slate-400"
                    }`}
                  >
                    {q.id}.
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 text-[15px] font-medium leading-relaxed flex-1">
                    {q.text}
                  </p>
                </div>

                {selectedQuestion === q.id && (
                  <div className="mt-6 ml-8 space-y-3">
                    {["TRUE", "FALSE", "NOT GIVEN"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 cursor-pointer group/opt"
                      >
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            option === "FALSE"
                              ? "border-[#6C5CE7] bg-[#6C5CE7]"
                              : "border-slate-300 group-hover/opt:border-slate-400"
                          }`}
                        >
                          {option === "FALSE" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span
                          className={`text-sm font-bold ${
                            option === "FALSE"
                              ? "text-[#6C5CE7]"
                              : "text-slate-400"
                          }`}
                        >
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. AI Feedback Sidebar */}
      {isFeedbackOpen && (
        <div className="fixed top-10 bottom-10 right-10 w-[380px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 flex flex-col z-40 animate-in slide-in-from-right-10 duration-500">
          <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
            <h2 className="text-[#6C5CE7] font-black text-xl tracking-tight">
              AI Feedback
            </h2>
            <button
              onClick={() => setIsFeedbackOpen(false)}
              className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-end">
              <span className="bg-[#8B7EFF] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100">
                Explanation
              </span>
            </div>

            <div className="bg-slate-50/50 dark:bg-slate-800/50 rounded-3xl p-6 text-slate-600 dark:text-slate-300 text-[14px] leading-relaxed border border-slate-100 dark:border-slate-800">
              <p>
                Your answer "500" is incorrect because the audio script clearly
                states that the Empress package costs £450 per person. The spa
                employee explicitly mentions this price during the conversation.
                Therefore, "500" does not match the information provided in the
                script.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-3 mt-auto">
            <button className="w-full py-3.5 border-2 border-[#8B7EFF] text-[#8B7EFF] font-bold rounded-2xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Feedback
            </button>
            <button className="w-full py-3.5 bg-[#E8E4FF] text-[#6C5CE7] font-bold rounded-2xl text-sm hover:bg-[#DCD5FF] transition-all">
              Explanation
            </button>
            <button className="w-full py-3.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold rounded-2xl text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Summarize reading passage
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      {!isFeedbackOpen && (
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="fixed bottom-10 right-10 w-16 h-16 bg-[#6C5CE7] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all z-50 group"
        >
          <MessageSquare className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
        </button>
      )}
    </div>
  );
};

export default ReadingReview;
