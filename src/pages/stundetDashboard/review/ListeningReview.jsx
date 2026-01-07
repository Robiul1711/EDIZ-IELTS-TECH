import React, { useState } from 'react';
import { X, MessageSquare, Play, Volume2, ChevronLeft, Headphones } from 'lucide-react';

const ListeningReview = () => {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(1);

  // Example data based on image 659960.png (Table Completion)
  const questionData = {
    id: 1,
    type: "Table completion",
    userAnswer: "500",
    correctAnswer: "450",
    isCorrect: false,
    text: "Empress Package cost"
  };

  return (
    <div className="min-h-screen bg-[#FBFBFF] p-4 rounded-xl font-sans relative overflow-hidden">
      
      {/* 1. Header Navigation */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <span className="bg-[#FFFAF0] text-[#D97706] px-4 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2">
              <Headphones className="w-4 h-4" /> Listening
            </span>
            <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
               <div className="bg-[#334155] text-white px-3 py-1 rounded-md text-xs font-bold">Part 1</div>
               <div className="text-slate-400 px-3 py-1 text-xs font-bold">Part 2</div>
            </div>
          </div>
        </div>
        
        {/* Audio Player (From Speaking Design) */}
        <div className="bg-[#F1F5F9] rounded-full px-6 py-2 flex items-center gap-4 w-full max-w-md border border-slate-200">
          <Play className="w-4 h-4 text-slate-600 fill-current cursor-pointer" />
          <div className="flex-1 h-1.5 bg-slate-300 rounded-full overflow-hidden">
            <div className="w-1/4 h-full bg-[#6C5CE7]" />
          </div>
          <span className="text-xs font-mono text-slate-500 italic">04:20 / 12:00</span>
          <Volume2 className="w-4 h-4 text-slate-400" />
        </div>
      </div>

      <div className={`flex gap-8 transition-all duration-500 ${isFeedbackOpen ? 'mr-[400px]' : ''}`}>
        
        {/* 2. Left Section: Answer Boxes (Image 659960.png style) */}
        <div className="w-64 space-y-4 shrink-0">
          <div className="bg-[#22C55E] rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 text-white text-sm font-bold">Your answer</div>
            <div className="bg-white m-1.5 rounded-lg p-3 border border-slate-100">
              <span className="text-slate-700 font-bold">{questionData.userAnswer}</span>
            </div>
          </div>

          <div className="bg-[#334155] rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 text-white text-sm font-bold">Correct answer</div>
            <div className="bg-white m-1.5 rounded-lg p-3 border border-slate-100">
              <span className="text-slate-700 font-bold">{questionData.correctAnswer}</span>
            </div>
          </div>
        </div>

        {/* 3. Middle Section: Table/Question Content */}
        <div className="flex-1 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800 mb-2">Questions 1–10 (Table completion)</h2>
            <p className="text-slate-400 text-sm italic">Complete the summary below. Write <span className="font-bold text-slate-600">NO MORE THAN ONE WORD</span> from the text in each box.</p>
            
            {/* Table Mockup */}
            <div className="mt-8 border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-4 text-sm font-black text-slate-700">Spa Package</th>
                    <th className="p-4 text-sm font-black text-slate-700">Service 1</th>
                    <th className="p-4 text-sm font-black text-slate-700">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-50 bg-indigo-50/30">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#6C5CE7] font-bold">1.</span>
                        <div className="px-3 py-1 bg-white border border-[#6C5CE7] rounded-md text-sm text-[#6C5CE7] font-bold">
                           {questionData.userAnswer}
                        </div>
                        <span className="text-slate-600 text-sm">Package</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-500">Mud bath</td>
                    <td className="p-4 text-sm text-slate-500">£{questionData.correctAnswer}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 4. AI Feedback Sidebar (Consistent with image 64b76b.png) */}
      {isFeedbackOpen && (
        <div className="fixed top-8 bottom-8 right-8 w-[380px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col z-40 animate-in slide-in-from-right-10 duration-500 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex justify-between items-center">
            <h2 className="text-[#6C5CE7] font-black text-xl">AI Feedback</h2>
            <button onClick={() => setIsFeedbackOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
              <X className="w-6 h-6 text-slate-300" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="flex justify-end">
              <span className="bg-[#8B7EFF] text-white px-5 py-2 rounded-xl text-xs font-bold">Explanation</span>
            </div>
            
            <div className="bg-slate-50/50 rounded-3xl p-6 text-slate-600 text-[14px] leading-relaxed border border-slate-100 font-medium">
              <p>Your answer <span className="text-red-500 font-bold">"{questionData.userAnswer}"</span> is incorrect because the audio script clearly states that the Empress package costs <span className="text-green-600 font-bold">£450</span> per person.</p>
              <p className="mt-4">The spa employee explicitly mentions this price during the conversation. Therefore, "{questionData.userAnswer}" does not match the information provided in the script.</p>
            </div>
          </div>

          <div className="p-6 space-y-3 bg-white border-t border-slate-50">
            <button className="w-full py-3.5 border-2 border-[#8B7EFF] text-[#8B7EFF] font-bold rounded-2xl text-sm hover:bg-slate-50 transition-all">Feedback</button>
            <button className="w-full py-3.5 bg-[#E8E4FF] text-[#6C5CE7] font-bold rounded-2xl text-sm hover:bg-[#DCD5FF] transition-all">Explanation</button>
          </div>
        </div>
      )}

      {/* Floating Chatbot Toggle */}
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

export default ListeningReview;