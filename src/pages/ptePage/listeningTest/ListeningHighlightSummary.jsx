import React, { useState } from "react";
import { Mic, FileText } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningHighlightSummary = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const summaries = [
    {
      id: "A",
      text: "Leonardo da Vinci, an iconic figure of the Renaissance, is renowned for his masterpieces like the 'Mona Lisa'. He was unable to create works of similar quality on other topics that he was interested in, such as animals, plants, and machines, though he still influenced art and innovation for centuries.",
    },
    {
      id: "B",
      text: "In the Renaissance, Leonardo da Vinci was widely known for timeless works of art such as the 'Mona Lisa'. While his expertise in art, science, and engineering, highlighting his visionary concepts and broad curiosity in animals, plants, and technology, have only been recognised in recent years.",
    },
    {
      id: "C",
      text: "Throughout the Renaissance, Leonardo da Vinci, who is today known for his mastery in art, science, and engineering, crafted iconic pieces like the 'Mona Lisa', that revealed his forward-thinking ideas and obscured his other achievements as a farmer, blacksmith and mason throughout much of the time that followed.",
    },
    {
      id: "D",
      text: "During the Renaissance, Leonardo da Vinci, known for his diverse talents in art, science, and engineering, left a lasting legacy through iconic works such as the 'Mona Lisa' as well as his visionary designs and broad interests in animals, plants, and machines, shaping art and innovation for generations.",
    },
  ];

  const handleSelect = (id) => {
    setSelectedAnswer(id);
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8  w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins text-slate-800 dark:text-white">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 w-full max-w-4xl text-center ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 tracking-tight">
          Highlight correct summary
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
          You will hear a recording. Click on the paragraph that best relates to
          the recording.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full items-start">
        {/* Audio Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-8 md:p-12 flex flex-col items-center justify-center min-h-[350px] md:min-h-[450px] ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 lg:sticky lg:top-8">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 md:mb-8 border border-slate-100 dark:border-slate-700 shadow-inner group transition-all duration-300">
            <Mic
              className="text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all duration-300"
              size={40}
            />
          </div>

          <h2 className="text-lg md:text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Audio Recorder
          </h2>
          <p className="text-slate-400 dark:text-slate-500 font-medium text-sm md:text-base mb-10 md:mb-16 text-center">
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

        {/* Summaries Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-4 md:p-8 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 flex flex-col">
          <div className="space-y-4">
            {summaries.map((summary) => {
              const isSelected = selectedAnswer === summary.id;
              return (
                <button
                  key={summary.id}
                  onClick={() => handleSelect(summary.id)}
                  className={`w-full group text-left flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${
                    isSelected
                      ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md translate-x-1"
                      : "bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-800"
                  }`}
                >
                  {/* Custom Radio Button Visual */}
                  <div
                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-indigo-600 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                        : "border-gray-200 dark:border-slate-600 group-hover:border-indigo-400"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full bg-white transition-all duration-300 ${
                        isSelected ? "scale-100" : "scale-0"
                      }`}
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <span
                      className={`font-bold text-base md:text-lg transition-colors ${
                        isSelected
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-400 dark:text-slate-500"
                      }`}
                    >
                      {summary.id})
                    </span>
                    <span
                      className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${
                        isSelected
                          ? "text-slate-900 dark:text-white"
                          : "text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {summary.text}
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
          to="/pte-examination-listening/select-missing-word"
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

export default ListeningHighlightSummary;
