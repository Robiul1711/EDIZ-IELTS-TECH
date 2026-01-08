import React from "react";
import { Mic } from "lucide-react";

const SpeakingPartOneMiddle = () => {
  return (
    <div className="min-h-screen section-padding-x py-10 dark:bg-slate-950">
      {/* Header */}
      <div className=" mb-6">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 px-6 py-4 text-sm sm:text-base text-gray-700 dark:text-slate-300">
          <span className="font-semibold">Part -01:</span> You should spend
          about 20 minutes on this task. Write at least 150 words.
        </div>
      </div>

      {/* Main Content */}
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[420px]">
          <div className="w-36 h-36 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center mb-6">
            <Mic size={48} className="text-purple-400" />
          </div>
          <p className="text-gray-700 dark:text-slate-300 font-medium">
            Start Talking After The Beep.
          </p>
        </div>

        {/* Right Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-800 flex flex-col items-center justify-center min-h-[420px]">
          <p className="text-purple-600 dark:text-purple-400 font-semibold mb-6">
            Recording.....
          </p>

          {/* Recording Circle */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-purple-300 animate-pulse" />

            {/* Inner Ring */}
            <div className="absolute inset-4 rounded-full border-4 border-blue-400" />

            {/* Center Icon */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
              it
            </div>
          </div>

          {/* Timer */}
          <div className="mt-6 px-4 py-1 rounded-full bg-gray-100 dark:bg-slate-800 text-sm text-gray-600 dark:text-slate-400">
            00:07
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeakingPartOneMiddle;
