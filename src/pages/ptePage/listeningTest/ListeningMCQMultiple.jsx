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
    <div className="flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-slate-800 p-6 xxs:p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5 dark:ring-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight">
          Multiple-choice, choose multiple answers
        </h1>

        <div className="bg-[#FFF9E6] dark:bg-amber-900/20 border border-[#FFE4A3] dark:border-amber-900/30 rounded-2xl p-4 mb-6 inline-block w-full">
          <p className="text-[#856404] dark:text-amber-400 font-semibold text-lg">
            You have{" "}
            <span className="font-extrabold text-[#533F03] dark:text-amber-200">
              25 minutes
            </span>{" "}
            to complete this page (2/17).
          </p>
        </div>

        <p className="text-gray-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
          Listen to the recording answer the question by selecting all the
          correct responses. You will need to select more than one response.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        {/* Audio Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 p-10 flex flex-col items-center justify-center min-h-[400px] ring-1 ring-black/5 dark:ring-slate-800">
          <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-700 shadow-inner">
            <Mic className="text-slate-300" size={40} />
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Audio Recorder
          </h2>
          <p className="text-gray-400 dark:text-slate-500 font-medium mb-12">
            Recording will begin automatically
          </p>

          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="flex items-center gap-4 text-gray-400 dark:text-slate-500 font-bold text-sm">
              <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                <Mic size={16} />
              </div>
              <span>00:00 / 00:50</span>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="w-0 h-full bg-[#8673FF]"></div>
            </div>
          </div>
        </div>

        {/* Multiple Choice Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 p-8 md:p-10 h-full ring-1 ring-black/5 dark:ring-slate-800">
          <h2 className="text-gray-800 dark:text-white font-bold text-lg md:text-xl mb-10 leading-snug">
            According to the,-------
          </h2>

          <div className="space-y-4">
            {options.map((option) => {
              const isSelected = selectedAnswers.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => toggleAnswer(option.id)}
                  className={`w-full group text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-[#8673FF]/10 dark:bg-[#8673FF]/20 border-[#8673FF] shadow-md translate-x-1"
                      : "bg-white dark:bg-slate-800 border-transparent dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${
                      isSelected
                        ? "bg-[#8673FF] border-[#8673FF]"
                        : "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-[#8673FF]"
                    }`}
                  >
                    {isSelected && (
                      <Check
                        size={16}
                        className="text-white fill-current stroke-[3px]"
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-bold text-lg ${
                        isSelected
                          ? "text-[#8673FF]"
                          : "text-gray-800 dark:text-slate-300"
                      }`}
                    >
                      {option.id}
                    </span>
                    <span
                      className={`text-sm md:text-base font-medium leading-relaxed ${
                        isSelected
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-600 dark:text-slate-400"
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
      <div className="flex flex-col xs:flex-row justify-between w-full mt-4 gap-4">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white px-8 xxs:px-10 py-4 text-base xxs:text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95 w-full xs:w-auto">
          <FileText size={22} className="text-gray-400 dark:text-slate-500" />{" "}
          Save & Exist
        </button>

        <Link
          to="/pte-examination-listening/fill-in-blanks"
          className="w-full xs:w-auto"
        >
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-8 xxs:px-16 py-4 text-base xxs:text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95 w-full">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListeningMCQMultiple;
