import React, { useState } from "react";
import { Mic, FileText } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const ListeningHighlightIncorrectWord = () => {
  const transcription =
    "Climate change is a pressing issue that requires urgent attention from governments and institutions alike. We have seen, in our lifetimes, the effects of rising global temperatures. The frequency and severity of natural disasters such as hurricanes, wildfires, and droughts have increased significantly. Scientists agree that human activities, such as burning fusion fuels and deforestation, are major contributors to climate change. It is imperative that we take immediate action to reduce greenhouse gas diffusions and transition to renewable energy sources. We must mitigate the impacts of climate change on our planet if for no other reason than that it is the only place we know of that can support our species.";

  // Split text into array of words/punctuation
  const words = transcription.split(" ");
  const [highlightedIndices, setHighlightedIndices] = useState([]);

  const toggleHighlight = (index) => {
    setHighlightedIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col items-center gap-8 py-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Instruction Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 dark:border-slate-800 p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5 dark:ring-slate-800">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 tracking-tight">
          Highlight incorrect words
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
          You will hear a recording. Below is a transcription of the recording.
          Some words in the transcription differ from what the speakers said.
          Please click on the words that are different.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
        {/* Audio Status Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 p-10 flex flex-col items-center justify-center min-h-[400px] ring-1 ring-black/5 dark:ring-slate-800 lg:sticky lg:top-8">
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

        {/* Transcription Card */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-slate-800 p-8 md:p-12 h-full ring-1 ring-black/5 dark:ring-slate-800">
          <div className="text-gray-700 dark:text-slate-300 leading-[2] text-base md:text-sm font-medium flex flex-wrap gap-x-1.5">
            {words.map((word, index) => {
              const isHighlighted = highlightedIndices.includes(index);
              return (
                <span
                  key={index}
                  onClick={() => toggleHighlight(index)}
                  className={`cursor-pointer transition-all duration-200 px-1 rounded-md active:scale-95 ${
                    isHighlighted
                      ? "bg-[#8673FF] text-white shadow-sm"
                      : "hover:bg-[#8673FF]/10 dark:hover:bg-[#8673FF]/20"
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-between w-full mt-4">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
          <FileText size={22} className="text-gray-400 dark:text-slate-500" />{" "}
          Save & Exist
        </button>

        <Link to="/pte-examination-listening/write-from-dictation">
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListeningHighlightIncorrectWord;
