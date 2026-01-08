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
      <header className="z-10 w-full pt-6 md:pt-10 px-4 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between xxs:justify-center items-center gap-4 md:gap-8 mb-6">
            <div className="text-base md:text-lg font-bold text-gray-800 dark:text-white">
              {currentQuestion} Of {totalQuestions}
            </div>
            <div className="flex items-center gap-2 text-base md:text-lg font-bold text-gray-800 dark:text-white">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-600 dark:text-slate-400" />
              {globalTime}
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full max-w-5xl h-6 bg-white dark:bg-slate-900/50 rounded-full shadow-inner p-1 mb-8 border border-gray-100 dark:border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#A22BDE] to-[#8673FF] rounded-full transition-all duration-1000"
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
