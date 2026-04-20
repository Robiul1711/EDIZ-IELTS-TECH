import React, { useState } from "react";
import { Mic, Check, FileText } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningMCQMultiple = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const options = [
    {
      id: "A",
      text: "the hero's journey is the most common type of story structure in literature.",
    },
    {
      id: "B",
      text: "heroes return from their journey in a much different condition than when they left.",
    },
    {
      id: "C",
      text: "Heroes face challenges that demand both strength and cleverness.",
    },
    {
      id: "D",
      text: "Joseph Campbell developed the hero's-journey structure after his travels.",
    },
    {
      id: "E",
      text: "These stories attract big audiences because their themes feel universal.",
    },
  ];

  const toggleAnswer = (id) => {
    setSelectedAnswers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8  w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 w-full max-w-4xl text-center ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 tracking-tight">
          Multiple-choice, choose multiple answers
        </h1>

        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 md:p-5 mb-6 md:mb-8 inline-block w-full">
          <p className="text-amber-700 dark:text-amber-400 font-bold text-base md:text-xl">
            You have{" "}
            <span className="font-extrabold text-amber-900 dark:text-amber-200">
              25 minutes
            </span>{" "}
            to complete this page (2/17).
          </p>
        </div>

        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
          Listen to the recording and answer the question by selecting all the
          correct responses. You will need to select more than one response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full">
        {/* Audio Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 flex flex-col items-center justify-center min-h-[350px] md:min-h-[450px] ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-slate-100 dark:border-slate-700 shadow-inner group transition-all duration-300">
            <Mic
              className="text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300"
              size={40}
            />
          </div>

          <h2 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Audio Recorder
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium text-sm md:text-base mb-10 md:mb-16">
            Recording will begin automatically
          </p>

          <div className="w-full max-w-md flex flex-col gap-4 md:gap-5">
            <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-bold text-xs md:text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <Mic size={14} />
              </div>
              <span>00:00 / 00:50</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="w-0 h-full bg-indigo-500 dark:bg-indigo-600 transition-all duration-300"></div>
            </div>
          </div>
        </div>

        {/* Multiple Choice Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 flex flex-col ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <h2 className="text-slate-800 dark:text-white font-bold text-lg md:text-2xl mb-8 md:mb-10 leading-snug">
            According to the speaker, what are the key characteristics of the
            hero's journey?
          </h2>

          <div className="space-y-3 md:space-y-4">
            {options.map((option) => {
              const isSelected = selectedAnswers.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleAnswer(option.id)}
                  className={`w-full group text-left flex items-start gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md translate-x-1"
                      : "bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-800"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded flex items-center justify-center border-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-indigo-600 border-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                        : "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-indigo-400"
                    }`}
                  >
                    {isSelected && (
                      <Check
                        size={16}
                        className="text-white fill-current stroke-[3px]"
                      />
                    )}
                  </div>

                  <div className="flex items-start gap-3">
                    <span
                      className={`font-bold text-base md:text-lg transition-colors ${
                        isSelected
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-400 dark:text-slate-500"
                      }`}
                    >
                      {option.id})
                    </span>
                    <span
                      className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${
                        isSelected
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {option.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <FileText size={20} /> Save & Exit
        </button>

        <Link
          to="/pte-examination-listening/fill-in-blanks"
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

export default ListeningMCQMultiple;
