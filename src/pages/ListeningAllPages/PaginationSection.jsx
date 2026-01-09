import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationSection = ({ activePart = 1, onPartChange }) => {
  const totalParts = 4;

  const handlePrev = () => {
    if (activePart > 1) {
      onPartChange(activePart - 1);
    }
  };

  const handleNext = () => {
    if (activePart < totalParts) {
      onPartChange(activePart + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 md:p-6 sticky bottom-0 w-full z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Pagination Groups - Scrollable on mobile, Grid on desktop */}
        <div className="w-full lg:w-auto overflow-x-auto no-scrollbar py-2">
          <div className="flex lg:grid lg:grid-cols-2 gap-4 md:gap-8 min-w-max lg:min-w-0">
            {[1, 2, 3, 4].map((part) => (
              <PaginationGroup
                key={part}
                label={`Part -0${part}`}
                partNumber={part}
                total={10}
                isActivePart={activePart === part}
                onClick={() => onPartChange(part)}
              />
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={handlePrev}
            disabled={activePart === 1}
            aria-label="Previous Part"
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all border
              ${
                activePart === 1
                  ? "bg-gray-50 dark:bg-slate-800 border-gray-100 dark:border-slate-700 opacity-40 cursor-not-allowed"
                  : "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm"
              }`}
          >
            <ChevronLeft size={24} />
          </button>

          <div className="text-sm font-medium text-slate-500 lg:hidden">
            Part {activePart} of {totalParts}
          </div>

          <button
            onClick={handleNext}
            disabled={activePart === totalParts}
            aria-label="Next Part"
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg
              ${
                activePart === totalParts
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200 dark:shadow-none"
              }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

const PaginationGroup = ({
  label,
  total,
  partNumber,
  isActivePart,
  onClick,
}) => {
  const startNumber = (partNumber - 1) * 10;

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer transition-all p-1 rounded-lg ${
        isActivePart 
          ? "opacity-100 scale-100" 
          : "opacity-50 hover:opacity-100 scale-95 lg:scale-100"
      }`}
    >
      <span
        className={`font-bold text-xs md:text-sm whitespace-nowrap ${
          isActivePart
            ? "text-purple-700 dark:text-purple-400"
            : "text-slate-800 dark:text-slate-200"
        }`}
      >
        {label}:
      </span>

      <div className="flex gap-1.5 md:gap-2">
        {Array.from({ length: total }, (_, i) => {
          const questionNum = startNumber + i + 1;
          const isBubbleActive = isActivePart && i === 0; // Keeping your original logic

          return (
            <div
              key={i}
              className={`
                w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-md text-[10px] md:text-xs font-bold transition-all
                ${
                  isBubbleActive
                    ? "bg-purple-600 text-white shadow-md shadow-purple-100 dark:shadow-none ring-2 ring-purple-600 ring-offset-2 dark:ring-offset-slate-900"
                    : "bg-gray-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                }
              `}
            >
              {questionNum}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaginationSection;