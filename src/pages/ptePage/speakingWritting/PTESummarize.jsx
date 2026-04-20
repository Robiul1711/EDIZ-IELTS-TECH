import React, { useState } from "react";
import { Copy, Scissors, Clipboard, File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const PTESummarize = () => {
  const [summary, setSummary] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (e) => {
    const text = e.target.value;
    setSummary(text);

    // Count words
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  const handleCut = () => {
    navigator.clipboard.writeText(summary);
    setSummary("");
    setWordCount(0);
  };

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText();
    const newText = summary + text;
    setSummary(newText);
    setWordCount(newText.trim() ? newText.trim().split(/\s+/).length : 0);
  };

  const passage = `Climate change represents one of the most significant challenges facing humanity in the twenty-first century, with scientific evidence demonstrating that global temperatures have risen by approximately 1.1 degrees Celsius since pre-industrial times. This warming trend, primarily driven by human activities such as the burning of fossil fuels and deforestation, has led to a cascade of environmental consequences including rising sea levels, more frequent and severe weather events, and disruptions to ecosystems worldwide.

While international agreements like the Paris Climate Accord have established frameworks for reducing greenhouse gas emissions, implementation remains inconsistent across nations, and many scientists argue that current efforts are insufficient to prevent the most catastrophic effects of climate change, necessitating both immediate policy action and technological innovation to transition toward renewable energy sources and sustainable practices.`;

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 md:py-8 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins text-slate-800 dark:text-white">
      {/* Main Content: Dual Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 w-full mb-6 md:mb-10">
        {/* Left Card: Passage */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 flex flex-col gap-4 md:gap-6 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2 md:mb-4 tracking-tight">
            Summarize Written Text
          </h2>
          <div className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed space-y-4 md:space-y-6 overflow-y-auto">
            {passage.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Right Card: Writing Area */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 flex flex-col gap-4 flex-1 ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                Your Summary
              </h3>

              {/* Toolbar */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
                >
                  <Copy size={14} /> Copy
                </button>
                <button
                  onClick={handleCut}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
                >
                  <Scissors size={14} /> Cut
                </button>
                <button
                  onClick={handlePaste}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs md:text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
                >
                  <Clipboard size={14} /> Paste
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative flex-1 group">
              <textarea
                value={summary}
                onChange={handleTextChange}
                placeholder="Write your summary here..."
                className="w-full h-[220px] md:h-[320px] p-5 md:p-6 text-slate-700 dark:text-slate-200 font-medium text-sm md:text-base bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl md:rounded-3xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all resize-none shadow-inner"
              />
              <div className="absolute bottom-4 right-4 md:right-6 text-slate-400 dark:text-slate-500 font-bold text-xs bg-white/90 dark:bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
                Word count: {wordCount}
              </div>
            </div>
          </div>

          {/* Instruction Box */}
          <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 rounded-full py-4 px-6 text-center text-indigo-600 dark:text-indigo-400 text-xs md:text-sm font-bold shadow-sm self-center max-w-full">
            Your response must be written in one single, complete sentence with
            5-75 words
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto  md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
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

export default PTESummarize;
