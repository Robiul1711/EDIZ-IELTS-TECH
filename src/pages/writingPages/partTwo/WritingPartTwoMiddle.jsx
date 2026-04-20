import React, { useState } from "react";

const WritingPartTwoMiddle = () => {
  const [text, setText] = useState("");

  // More robust word count logic
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 md:py-8 flex flex-col gap-6 w-full min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      
      {/* Top Instruction Bar */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <p className="text-sm text-gray-700 dark:text-slate-300">
          <span className="font-bold text-gray-900 dark:text-white">Part - 02:</span> You should
          spend about 40 minutes on this task. Write at least 250 words.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* LEFT COLUMN: Prompt Content */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 shadow-sm lg:sticky lg:top-6">
          <div className="mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
              Movies and television shows are often criticized for being historically inaccurate.
            </h1>
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mt-3 uppercase tracking-wider">
              To what extent do you agree or disagree with this view?
            </p>
            
            <div className="h-px bg-gray-100 dark:bg-slate-800 my-6" />
            
            <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed italic">
              Give reasons for your opinion and include relevant examples from your own knowledge or experience.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Writing Area */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-slate-800 focus-within:border-indigo-500 dark:focus-within:border-indigo-600 rounded-2xl p-5 md:p-6 shadow-sm transition-all flex flex-col">
            <textarea
              className="w-full h-[350px] md:h-[500px] lg:h-[600px] resize-none outline-none bg-transparent text-gray-800 dark:text-slate-200 leading-relaxed placeholder-gray-300 dark:placeholder-slate-600 text-base md:text-lg"
              placeholder="Start typing your essay here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Word Count Footer */}
          <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
            <div className="text-gray-900 dark:text-slate-300 font-bold text-sm md:text-base">
              Word Count: <span className="text-indigo-600 dark:text-indigo-400">{wordCount}</span>
            </div>
            
            {/* Minimalist Status Indicator */}
            <div className="text-xs text-gray-400 dark:text-slate-500 flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${wordCount >= 250 ? 'bg-green-500' : 'bg-amber-400'}`} />
              {wordCount >= 250 ? 'Target Reached' : 'Under 250 words'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPartTwoMiddle;