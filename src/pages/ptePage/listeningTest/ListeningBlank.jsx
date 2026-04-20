import React, { useState } from "react";
import { Mic, FileText } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningBlank = () => {
  const [blanks, setBlanks] = useState({
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
  });

  const handleInputChange = (e, blankId) => {
    setBlanks((prev) => ({
      ...prev,
      [blankId]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 md:py-8 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins text-slate-800 dark:text-white">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 w-full max-w-4xl text-center ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6">
          Fill in the blanks
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
          You will hear a recording. Type the missing words in each blank based
          on what you hear.
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

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 flex flex-col">
          <div className="text-slate-700 dark:text-slate-300 leading-[2.6] md:leading-[3] text-sm md:text-lg font-medium selection:bg-indigo-100 dark:selection:bg-indigo-900/30">
            <p className="inline">
              Historians have long debated the true identity of the legendary
              King Arthur, a figure shrouded in myth and{" "}
            </p>
            <input
              type="text"
              value={blanks.blank1}
              onChange={(e) => handleInputChange(e, "blank1")}
              className="inline-block w-28 md:w-36 h-9 md:h-10 px-3 mx-1 align-baseline border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
              placeholder="..."
            />
            <p className="inline">
              . Some think he might have been a leader fighting against{" "}
            </p>
            <input
              type="text"
              value={blanks.blank2}
              onChange={(e) => handleInputChange(e, "blank2")}
              className="inline-block w-28 md:w-36 h-9 md:h-10 px-3 mx-1 align-baseline border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
              placeholder="..."
            />
            <p className="inline">
              {" "}
              in the 5th and 6th centuries, while others believe he's purely a
              myth. The debate is{" "}
            </p>
            <input
              type="text"
              value={blanks.blank3}
              onChange={(e) => handleInputChange(e, "blank3")}
              className="inline-block w-28 md:w-36 h-9 md:h-10 px-3 mx-1 align-baseline border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
              placeholder="..."
            />
            <p className="inline">
              {" "}
              by the lack of contemporary historical records and the abundance
              of legendary tales knights of the Round Table. Even though we
              don't have solid proof, people still love the story of King
              Arthur, and it has inspired{" "}
            </p>
            <input
              type="text"
              value={blanks.blank4}
              onChange={(e) => handleInputChange(e, "blank4")}
              className="inline-block w-28 md:w-36 h-9 md:h-10 px-3 mx-1 align-baseline border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all shadow-sm"
              placeholder="..."
            />
            <p className="inline"> and movies. Arthur and his books</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto  md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <FileText size={20} /> Save & Exit
        </button>

        <Link
          to="/pte-examination-listening/multiple-choice-single-answer"
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

export default ListeningBlank;
