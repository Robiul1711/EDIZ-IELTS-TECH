import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationSection = ({ activePart = 1, onPartChange }) => {
  // Handler for arrow clicks
  const handlePrev = () => {
    if (activePart > 1) {
      onPartChange(activePart - 1);
    }
  };

  const handleNext = () => {
    if (activePart < 4) {
      onPartChange(activePart + 1);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl section-padding-x shadow-sm border border-gray-100 dark:border-slate-800 p-6 sticky bottom-0 w-full">
      <div className="flex justify-between gap-8 max-w-7xl mx-auto text-sm">
        {/* Pagination Groups */}
        <div className="grid grid-cols-2 gap-6">
          <PaginationGroup
            label="Part -01"
            partNumber={1}
            total={10}
            isActivePart={activePart === 1}
            onClick={() => onPartChange(1)}
          />
          <PaginationGroup
            label="Part -02"
            partNumber={2}
            total={10}
            isActivePart={activePart === 2}
            onClick={() => onPartChange(2)}
          />
          <PaginationGroup
            label="Part -03"
            partNumber={3}
            total={10}
            isActivePart={activePart === 3}
            onClick={() => onPartChange(3)}
          />
          <PaginationGroup
            label="Part -04"
            partNumber={4}
            total={10}
            isActivePart={activePart === 4}
            onClick={() => onPartChange(4)}
          />
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={handlePrev}
            disabled={activePart === 1}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors text-gray-500 dark:text-slate-400
              ${
                activePart === 1
                  ? "bg-gray-50 dark:bg-slate-800 opacity-50 cursor-not-allowed"
                  : "bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            disabled={activePart === 4}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors text-white shadow-md shadow-purple-200
              ${
                activePart === 4
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-custom hover:bg-purple-600"
              }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper sub-component
const PaginationGroup = ({
  label,
  total,
  partNumber,
  isActivePart,
  onClick,
}) => {
  // Calculate the starting number for this part (e.g., Part 2 starts at 11)
  const startNumber = (partNumber - 1) * 10;

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center gap-3 cursor-pointer transition-opacity ${
        isActivePart ? "opacity-100" : "opacity-60 hover:opacity-100"
      }`}
    >
      <span
        className={`font-semibold ${
          isActivePart
            ? "text-purple-700 dark:text-purple-400"
            : "text-slate-800 dark:text-slate-200"
        }`}
      >
        {label}:
      </span>

      <div className="flex gap-2">
        {Array.from({ length: total }, (_, i) => {
          const questionNum = startNumber + i + 1;
          // Logic: Highlight the first bubble if the part is active, or keep neutral
          const isBubbleActive = isActivePart && i === 0;

          return (
            <div
              key={i}
              className={`
                w-7 h-7 flex items-center justify-center rounded text-xs font-medium cursor-pointer transition-all
                ${
                  isBubbleActive
                    ? "bg-custom text-white shadow-md shadow-purple-200"
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
