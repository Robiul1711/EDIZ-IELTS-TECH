import React, { useState, useEffect } from "react";
import { File, Mic, MicOff } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const Waveform = () => {
  return (
    <div className="flex items-center gap-0.5 h-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
        <div
          key={i}
          className="w-1 bg-[#8673FF] rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

const PTERepeatSentence = () => {
  const [status, setStatus] = useState("preparing"); // preparing, recording, finished
  const [prepTimer, setPrepTimer] = useState(15);
  const [recordTimer, setRecordTimer] = useState(0);

  useEffect(() => {
    let interval = null;

    if (status === "preparing" && prepTimer > 0) {
      interval = setInterval(() => {
        setPrepTimer((prev) => prev - 1);
      }, 1000);
    } else if (status === "preparing" && prepTimer === 0) {
      setStatus("recording");
    }

    if (status === "recording" && recordTimer < 10) {
      interval = setInterval(() => {
        setRecordTimer((prev) => prev + 1);
      }, 1000);
    } else if (status === "recording" && recordTimer === 10) {
      setStatus("finished");
    }

    return () => clearInterval(interval);
  }, [status, prepTimer, recordTimer]);

  return (
    <div className="w-full flex flex-col items-center font-poppins transition-colors duration-300">
      {/* Top Instruction Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg p-6 md:p-10 w-full mb-8 md:mb-10 border border-gray-100 dark:border-slate-800 flex flex-col gap-6 max-w-4xl animate-in fade-in slide-in-from-top duration-500">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          Repeat sentence
        </h2>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-2xl p-4">
          <p className="text-sm md:text-base font-semibold text-amber-900 dark:text-amber-200">
            You have{" "}
            <span className="font-bold underline">15 seconds to prepare</span>{" "}
            and{" "}
            <span className="font-bold underline">10 seconds to record.</span>
          </p>
        </div>

        <div className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
          <p>
            You hear one sentence. Please repeat the sentence exactly as you
            hear it. You hear the sentence only once.
          </p>
        </div>
      </div>

      {/* Dual Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full mb-8 md:mb-12 max-w-7xl">
        {/* Left Card: Audio Standby / Preparation */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-left duration-500">
          <div className="w-full py-10 md:py-16 flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-slate-800 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-full text-slate-400 dark:text-slate-500 shadow-sm border border-gray-50 dark:border-slate-700">
              <MicOff size={32} />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                Audio Recorder
              </h3>
              <p className="text-slate-500 dark:text-slate-500 font-medium text-xs md:text-sm">
                Recording will begin automatically
              </p>
            </div>
          </div>

          {/* Progress Bar Footer */}
          <div className="w-full flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
              <MicOff size={20} />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums uppercase">
                <span>Prep</span>
                <span>00:00 / 00:15</span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-linear"
                  style={{
                    width: `${
                      (status === "preparing" ? (15 - prepTimer) / 15 : 1) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Active Recording */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100 dark:border-slate-800 flex flex-col items-center gap-6 animate-in fade-in slide-in-from-right duration-500">
          <div className="w-full py-10 md:py-16 flex flex-col items-center justify-center gap-6 border border-gray-100 dark:border-slate-800 rounded-[2rem] bg-slate-50/50 dark:bg-slate-800/30">
            {status === "recording" ? (
              <div className="w-12 h-12 bg-rose-500 rounded-full shadow-lg shadow-rose-200 dark:shadow-none ring-4 ring-rose-50 dark:ring-rose-900/30 animate-pulse"></div>
            ) : (
              <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
            )}

            <div className="text-center space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                Audio Recorder
              </h3>
              {status === "recording" && <Waveform />}
              <p
                className={`text-sm md:text-base font-semibold ${
                  status === "recording"
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-slate-500 dark:text-slate-500"
                }`}
              >
                {status === "recording"
                  ? "• Recording......."
                  : status === "finished"
                  ? "Completed"
                  : "Standby"}
              </p>
            </div>
          </div>

          {/* Progress Bar Footer */}
          <div className="w-full flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div
              className={`p-2 rounded-full transition-all duration-300 ${
                status === "recording"
                  ? "bg-indigo-600 text-white animate-bounce"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              }`}
            >
              <Mic size={20} />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex justify-between text-[10px] md:text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums uppercase">
                <span>Record</span>
                <span>
                  {`00:${recordTimer < 10 ? "0" + recordTimer : recordTimer}`} /
                  00:10
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-1000 ease-linear`}
                  style={{ width: `${(recordTimer / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <footer className="w-full py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <button className="bg-slate-900 dark:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base shadow-lg hover:bg-black transition-all active:scale-95 w-full md:w-auto">
            <File size={22} /> Save & Exist
          </button>

          <Link
            to="/pte-examination/describe-image"
            className="w-full md:w-auto"
          >
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-xl font-bold flex items-center justify-center gap-3 text-base shadow-lg hover:shadow-indigo-200 dark:hover:shadow-none transition-all active:scale-95 w-full group">
              Next{" "}
              <MdDoubleArrow
                size={22}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default PTERepeatSentence;
