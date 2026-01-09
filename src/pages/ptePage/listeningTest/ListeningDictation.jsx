import React, { useState } from "react";
import { Mic, Copy, Clipboard, FileText, ScissorsIcon } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningDictation = () => {
  const [text, setText] = useState("");

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleCut = () => {
    navigator.clipboard.writeText(text);
    setText("");
  };

  const handlePaste = async () => {
    const clipboardText = await navigator.clipboard.readText();
    setText((prev) => prev + clipboardText);
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins text-slate-800 dark:text-white">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-12 w-full max-w-4xl text-center ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 md:mb-6 tracking-tight">
          Write from dictation
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
          You will hear one sentence. Type the sentence in the box below exactly
          as you hear it. Write as much of the sentence as you can. You will
          hear the sentence only once.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full items-start">
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

        {/* Writing Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
              Your Summary
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
              >
                <Copy size={14} /> Copy
              </button>
              <button
                onClick={handleCut}
                className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
              >
                <ScissorsIcon size={14} /> Cut
              </button>
              <button
                onClick={handlePaste}
                className="flex items-center gap-1.5 px-3 md:px-4 py-2 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
              >
                <Clipboard size={14} /> Paste
              </button>
            </div>
          </div>

          <div className="relative flex-1 group">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write the sentence here..."
              className="w-full h-[220px] md:h-[280px] p-5 md:p-6 text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl md:rounded-3xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none shadow-inner"
            />
            <div className="absolute bottom-4 right-4 md:right-6 text-slate-400 dark:text-slate-500 font-bold text-xs bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
              Word count: {wordCount}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <FileText size={20} /> Save & Exit
        </button>

        <Link to="/pte/result" className="w-full md:w-auto">
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

export default ListeningDictation;
