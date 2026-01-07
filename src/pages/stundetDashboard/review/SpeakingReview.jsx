import React, { useState } from "react";
import { X, MessageCircle, Play, Volume2 } from "lucide-react";
import PaginationSection from "@/pages/ListeningAllPages/PaginationSection";

const SpeakingReview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] p-4 rounded-xl font-sans">
      <div className="mb-6">
        <PaginationSection />
      </div>
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isFeedbackOpen ? "lg:mr-[400px]" : ""
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: User Response */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-slate-800">Q1:</span>
                <span className="text-slate-400 font-medium text-sm">
                  Part 1
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-800 leading-snug">
                Let's talk about your home. What kind of house or flat do you
                live in?
              </h1>

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-400">My Answer</h3>
                <div className="bg-[#F1F5F9] rounded-full px-6 py-3 flex items-center gap-4 w-full max-w-md">
                  <audio className="h-8 w-full custom-audio" controls>
                    <source src="" type="audio/mpeg" />
                  </audio>
                </div>
                <p className="text-slate-600 italic">
                  "I live in a apartment with my family."
                </p>
              </div>
            </div>

            {/* Right Column: Score & Model Answer */}
            <div className="space-y-8 lg:border-l lg:pl-12 border-slate-200">
              <div className="bg-[#F4F7FF] rounded-3xl p-8 border border-blue-50">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-slate-800">
                    6.0
                  </span>
                  <span className="text-xl font-bold text-slate-400">/9.0</span>
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
                  Raw score
                </p>
              </div>
              <div className="space-y-4">
                <span className="inline-block bg-[#6C5CE7] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-200">
                  Model Answer
                </span>
                <div className="bg-[#F1F5F9] rounded-full px-6 py-3 flex items-center gap-4 w-full max-w-md">
                  <audio className="h-8 w-full" controls>
                    <source src="#" type="audio/mpeg" />
                  </audio>
                </div>
                <p className="text-slate-600">
                  I live in a apartment with my family.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Feedback Panel */}
        {isFeedbackOpen && (
          <div className="fixed top-10 bottom-10 right-10 w-[360px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden z-40 animate-in slide-in-from-right-8 duration-300">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-[#6C5CE7] font-black text-xl">AI Feedback</h2>
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="p-2 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex justify-end">
                <span className="bg-[#8B7EFF] text-white px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                  Feedback
                </span>
              </div>

              <div className="text-slate-600 text-[14px] leading-relaxed space-y-4 font-medium">
                <p>
                  Your description is clear, natural, and easy to understand.
                  You used good vocabulary like{" "}
                  <span className="text-[#6C5CE7]">"cosy,"</span>{" "}
                  <span className="text-[#6C5CE7]">
                    "suburban neighbourhood,"
                  </span>{" "}
                  and{" "}
                  <span className="text-[#6C5CE7]">"peaceful retreat."</span>
                </p>

                <p className="font-bold text-slate-800">
                  To improve even more:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Add a bit more personal feeling.</li>
                  <li>Avoid repetitive sentence structures.</li>
                </ul>
              </div>
            </div>

            <div className="p-6 space-y-3 bg-slate-50/50">
              <button className="w-full py-3 border-2 border-[#8B7EFF] text-[#8B7EFF] font-bold rounded-2xl text-sm hover:bg-white transition-all">
                Explanation
              </button>
              <button className="w-full py-3 bg-[#E8E4FF] text-[#6C5CE7] font-bold rounded-2xl text-sm hover:bg-[#DCD5FF] transition-all">
                Feedback
              </button>
            </div>
          </div>
        )}

        {/* Chatbot Toggle Button */}
        {!isFeedbackOpen && (
          <button
            onClick={() => setIsFeedbackOpen(true)}
            className="fixed bottom-10 right-10 w-16 h-16 bg-[#6C5CE7] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-50 group"
          >
            <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default SpeakingReview;
