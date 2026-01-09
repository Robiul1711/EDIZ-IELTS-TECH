import GridBackgroundView from "@/components/common/GridBackgroundView";
import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Clock, File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";

const PTEExamLayout = () => {
  const location = useLocation();

  const [elapsedSeconds, setElapsedSeconds] = React.useState(49); // Starting at 49 to match reference
  const totalDurationSeconds = 37 * 60; // 37 minutes

  React.useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds((prev) =>
        prev < totalDurationSeconds ? prev + 1 : totalDurationSeconds
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = "01";
  const totalQuestions = "37";
  const globalTime = `${formatTime(elapsedSeconds)} / ${formatTime(
    totalDurationSeconds
  )}`;
  const progress = (elapsedSeconds / totalDurationSeconds) * 100;

  return (
    <div className="relative min-h-screen font-poppins flex flex-col">
      {/* Background Layer */}
      <div className="fixed inset-0 -z-10 h-full w-full">
        <GridBackgroundView />
      </div>

      {/* Header: Question Info & Global Timer */}
      <header className="z-20 w-full pt-4 md:pt-10 px-4 md:px-10 sticky top-0 bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center gap-4 md:gap-8 mb-4 md:mb-6">
            <div className="text-sm md:text-lg font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-700">
              Q: {currentQuestion} / {totalQuestions}
            </div>
            <div className="flex items-center gap-2 text-sm md:text-lg font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-3 py-1 rounded-full shadow-sm border border-gray-100 dark:border-slate-700 tabular-nums">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-indigo-600 dark:text-indigo-400" />
              {globalTime}
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full max-w-5xl h-3 md:h-5 bg-white dark:bg-slate-900/50 rounded-full shadow-inner p-0.5 md:p-1 mb-4 md:mb-8 border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(99,102,241,0.3)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content Layer */}
      <main className="z-10 flex-1 w-full max-w-7xl mx-auto px-4 md:px-10 py-4">
        <Outlet />
      </main>

      {/* Footer Buttons */}
    </div>
  );
};

export default PTEExamLayout;
