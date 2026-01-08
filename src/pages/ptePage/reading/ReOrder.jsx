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
    <div className="flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Re-order paragraphs
        </h1>
        <p className="text-gray-700 dark:text-slate-400 font-medium text-sm md:text-base mb-8">
          The text boxes in the left panel have been placed in a random order.
          Restore the original order by dragging the text boxes from the left
          panel to the right panel.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* Left Column: Source Paragraphs */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-slate-800 p-8 md:p-10 ring-1 ring-black/5 dark:ring-slate-700">
          <div className="space-y-6">
            {paragraphs.map((para) => (
              <div key={para.id} className="flex gap-4 group">
                <span className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-[#8673FF] transition-colors">
                  {para.id})
                </span>
                <p className="text-gray-500 dark:text-slate-400 font-medium text-sm leading-relaxed">
                  {para.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Target Slots */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-slate-800 p-8 md:p-10 ring-1 ring-black/5 dark:ring-slate-700">
          <h2 className="text-center font-bold text-xl text-gray-800 dark:text-white mb-8">
            Target
          </h2>

          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-6">
                <span className="font-bold text-lg text-gray-800 dark:text-white w-4 text-right">
                  {num}.
                </span>

                <div className="relative flex-1">
                  <button
                    onClick={() =>
                      setActiveSlot(activeSlot === num ? null : num)
                    }
                    className={`w-full h-12 px-6 rounded-xl border-2 flex items-center justify-between transition-all duration-300 ${
                      activeSlot === num
                        ? "border-[#8673FF] bg-[#8673FF]/5 dark:bg-[#8673FF]/10 shadow-sm"
                        : targets[num]
                        ? "border-[#8673FF] bg-white dark:bg-slate-800"
                        : "border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:border-gray-200 dark:hover:border-slate-600"
                    }`}
                  >
                    <span
                      className={`font-bold text-lg ${
                        targets[num] ? "text-[#8673FF]" : "text-transparent"
                      }`}
                    >
                      {targets[num] || "-"}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${
                        activeSlot === num
                          ? "rotate-180 text-[#8673FF]"
                          : "text-gray-400 dark:text-slate-500"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {activeSlot === num && (
                    <div className="absolute z-50 mt-2 right-0 w-32 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-2xl py-3 animate-in fade-in zoom-in duration-200">
                      {paragraphs.map((para) => {
                        const used = isLetterUsed(para.id, num);
                        return (
                          <button
                            key={para.id}
                            disabled={used}
                            onClick={() => handleSelect(num, para.id)}
                            className={`w-full px-5 py-2.5 flex items-center gap-3 transition-colors ${
                              used
                                ? "opacity-30 cursor-not-allowed text-gray-400 dark:text-slate-600"
                                : targets[num] === para.id
                                ? "bg-[#8673FF] text-white"
                                : "hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                targets[num] === para.id
                                  ? "bg-white"
                                  : "bg-[#8673FF]"
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
      <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-8">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
          <File size={22} className="text-gray-400 dark:text-slate-500" /> Save
          & Exit
        </button>

        <Link to={"/pte-examination-reading/fill-in-blanks"}>
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReOrder;
