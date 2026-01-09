import React, { useState } from "react";
import { File, ChevronDown } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ReOrder = () => {
  const paragraphs = [
    {
      id: "A",
      text: "That scepticism was understandable considering that computers at the time were adding machines that were the size of a house and powered by vacuum tubes.",
    },
    {
      id: "B",
      text: "That scepticism was understandable considering that computers at the time were adding machines that were the size of a house and powered by vacuum tubes.",
    },
    {
      id: "C",
      text: "That scepticism was understandable considering that computers at the time were adding machines that were the size of a house and powered by vacuum tubes.",
    },
    {
      id: "D",
      text: "That scepticism was understandable considering that computers at the time were adding machines that were the size of a house and powered by vacuum tubes.",
    },
    {
      id: "E",
      text: "That scepticism was understandable considering that computers at the time were adding machines that were the size of a house and powered by vacuum tubes.",
    },
  ];

  const [targets, setTargets] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  const [activeSlot, setActiveSlot] = useState(null);

  const handleSelect = (slotId, letter) => {
    setTargets((prev) => ({ ...prev, [slotId]: letter }));
    setActiveSlot(null);
  };

  const isLetterUsed = (letter, currentSlot) => {
    return Object.entries(targets).some(
      ([slot, val]) => val === letter && parseInt(slot) !== currentSlot
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2 md:mb-4">
          Re-order paragraphs
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-xs md:text-base mb-6 md:mb-10 max-w-3xl leading-relaxed">
          The text boxes in the left panel have been placed in a random order.
          Restore the original order by dragging the text boxes from the left
          panel to the right panel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
        {/* Left Column: Source Paragraphs */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <div className="space-y-6 md:space-y-8">
            {paragraphs.map((para) => (
              <div key={para.id} className="flex gap-4 group">
                <span className="font-bold text-base md:text-lg text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                  {para.id})
                </span>
                <p className="text-slate-600 dark:text-slate-400 font-medium text-xs md:text-sm leading-relaxed">
                  {para.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Target Slots */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <h2 className="text-center font-bold text-lg md:text-2xl text-slate-800 dark:text-white mb-8 md:mb-10">
            Target Order
          </h2>

          <div className="space-y-5 md:space-y-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-4 md:gap-6">
                <span className="font-bold text-base md:text-lg text-slate-400 dark:text-slate-500 w-4 text-right">
                  {num}.
                </span>

                <div className="relative flex-1">
                  <button
                    onClick={() =>
                      setActiveSlot(activeSlot === num ? null : num)
                    }
                    className={`w-full h-12 md:h-14 px-6 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
                      activeSlot === num
                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md translate-x-1"
                        : targets[num]
                        ? "border-indigo-400 bg-white dark:bg-slate-800"
                        : "border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-900"
                    }`}
                  >
                    <span
                      className={`font-bold text-base md:text-lg ${
                        targets[num]
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-transparent"
                      }`}
                    >
                      {targets[num] || "-"}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        activeSlot === num
                          ? "rotate-180 text-indigo-500"
                          : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {activeSlot === num && (
                    <div className="absolute z-50 mt-2 right-0 w-32 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                      {paragraphs.map((para) => {
                        const used = isLetterUsed(para.id, num);
                        return (
                          <button
                            key={para.id}
                            disabled={used}
                            onClick={() => handleSelect(num, para.id)}
                            className={`w-full px-5 py-3 flex items-center gap-3 transition-colors ${
                              used
                                ? "opacity-30 cursor-not-allowed text-slate-400 dark:text-slate-600"
                                : targets[num] === para.id
                                ? "bg-indigo-600 text-white"
                                : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                targets[num] === para.id
                                  ? "bg-white"
                                  : "bg-indigo-500"
                              }`}
                            />
                            <span className="font-bold text-base">
                              {para.id}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link
          to={"/pte-examination-reading/fill-in-blanks"}
          className="w-full md:w-auto"
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg shadow-indigo-200 dark:shadow-none rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-95 active:scale-95 group">
            Next{" "}
            <MdDoubleArrow
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReOrder;
