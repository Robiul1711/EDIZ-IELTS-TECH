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
    <div className="flex flex-col items-center gap-8 py-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-slate-800 p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5 dark:ring-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Fill in the blanks
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
          You will hear a recording. Type the missing words in blank
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

        {/* Question Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 p-8 md:p-12 h-full ring-1 ring-black/5 dark:ring-slate-800 flex flex-col">
          <div className="text-gray-700 dark:text-slate-300 leading-[2.8] text-base md:text-lg font-medium">
            <p className="inline">
              Historians have long debated the true identity of the legendary
              King Arthur, a figure shrouded in myth and{" "}
            </p>
            <input
              type="text"
              value={blanks.blank1}
              onChange={(e) => handleInputChange(e, "blank1")}
              className="inline-block w-32 h-9 px-3 mx-1 align-middle border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:border-[#8673FF] outline-none transition-all "
            />
            <p className="inline">
              . Some think he might have been a leader fighting against{" "}
            </p>
            <input
              type="text"
              value={blanks.blank2}
              onChange={(e) => handleInputChange(e, "blank2")}
              className="inline-block w-32 h-9 px-3 mx-1 align-middle border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:border-[#8673FF] outline-none transition-all"
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
              className="inline-block w-32 h-9 px-3 mx-1 align-middle border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:border-[#8673FF] outline-none transition-all"
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
              className="inline-block w-32 h-9 px-3 mx-1 align-middle border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-white rounded-lg focus:border-[#8673FF] outline-none transition-all"
            />
            <p className="inline"> and movies. Arthur and his books</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between w-full mt-4">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
          <FileText size={22} className="text-gray-400 dark:text-slate-500" />{" "}
          Save & Exist
        </button>

        <Link to="/pte-examination-listening/multiple-choice-single-answer">
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListeningBlank;
