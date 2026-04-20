import React, { useState, useEffect } from "react";
import { ChevronLeft, Clock, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import DarkLightToggle from "./DarkLightToggle";

const TestHeader = ({ durationInSeconds = 1800, onExit }) => {
  // Default 30 minutes
  const [timeLeft, setTimeLeft] = useState(durationInSeconds);

  // Calculate percentage of time elapsed for the progress bar
  // If you want the bar to shrink instead of grow, use (timeLeft / durationInSeconds) * 100
  const progressPercentage =
    ((durationInSeconds - timeLeft) / durationInSeconds) * 100;

  // Simulate the countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Helper to format seconds into MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full h-16 md:h-20 bg-[#7C5CFC] px-4 md:section-padding-x flex items-center justify-between shadow-md font-sans text-white transition-all duration-300">
      {/* LEFT: Exit Button */}
      <Link
        to={onExit}
        className="flex items-center gap-2 md:gap-3 group opacity-90 hover:opacity-100 transition-opacity"
      >
        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>
        <span className="hidden sm:inline text-base md:text-lg font-medium tracking-wide">
          Exit
        </span>
      </Link>

      {/* CENTER: Timer & Progress Bar */}
      <div className="flex items-center gap-3 md:gap-6 flex-1 max-w-2xl mx-4 md:mx-12">
        {/* Timer Display */}
        <div className="flex items-center gap-1.5 md:gap-2 min-w-fit">
          <Clock className="w-4 h-4 md:w-5 md:h-5 text-white" />
          <span className="text-sm md:text-lg font-medium tabular-nums">
            {formatTime(timeLeft)}{" "}
            <span className="hidden xs:inline">left</span>
          </span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="flex-1 h-1.5 md:h-2 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)] transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* RIGHT: Finish Section Button */}
      <div className="flex items-center gap-2 md:gap-3">

      <DarkLightToggle />
      <button className="flex items-center gap-2 hover:bg-white/10 py-1.5 px-3 md:py-2 md:px-4 rounded-lg transition-colors group">
        <span className="hidden md:inline text-lg font-medium tracking-wide whitespace-nowrap">
          Finish Section
        </span>
        <span className="md:hidden text-sm font-medium tracking-wide">
          Finish
        </span>
        <LayoutGrid className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
      </button>
      </div>
    </div>
  );
};

export default TestHeader;
