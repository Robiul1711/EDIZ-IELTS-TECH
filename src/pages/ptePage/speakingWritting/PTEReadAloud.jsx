import React, { useState, useEffect } from 'react';
import { File, Mic } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const CircularProgress = ({ value, maxValue, size = 120 }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / maxValue) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-100 dark:text-slate-800"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#A22BDE"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-linear"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-[#A22BDE]">{value}</span>
            </div>
        </div>
    );
};

const PTEReadAloud = () => {
    const [prepTimer, setPrepTimer] = useState(25);
    const [recordTimer, setRecordTimer] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let interval = null;

        if (prepTimer > 0 && !isRecording) {
            interval = setInterval(() => {
                setPrepTimer((prev) => prev - 1);
            }, 1000);
        } else if (prepTimer === 0 && !isRecording) {
            setIsRecording(true);
        }

        if (isRecording && recordTimer < 30) {
            interval = setInterval(() => {
                setRecordTimer((prev) => prev + 1);
            }, 1000);
        } else if (recordTimer === 30) {
            setIsRecording(false);
            setIsFinished(true);
        }

        return () => clearInterval(interval);
    }, [prepTimer, isRecording, recordTimer]);

    return (
        <div className="w-full min-h-screen transition-colors duration-300 flex flex-col items-center ">
            {/* Main Content: Dual Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-7xl mb-12 mt-6 md:mt-12">

                {/* Left Card: Instructions */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-4 md:p-10 flex flex-col gap-6 border border-gray-50 dark:border-slate-800">
                    <h2 className="text-2xl font-bold text-black dark:text-white">Read aloud</h2>

                    <div className="bg-[#FFFCE5] dark:bg-amber-900/20 border border-yellow-200 dark:border-amber-700/50 rounded-xl p-4 transition-colors">
                        <p className="text-base font-semibold text-black dark:text-amber-200">
                            You have <span className="font-bold">40 seconds to prepare</span> and <span className="font-bold">40 seconds to record.</span>
                        </p>
                    </div>

                    <p className="text-base font-medium leading-relaxed text-gray-800 dark:text-slate-300">
                        Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.
                    </p>

                    <div className="p-6 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
                        <p className="text-gray-700 dark:text-slate-200 text-lg md:text-xl font-medium leading-relaxed">
                            Meerkats are known for their altruistic behaviour, and they are often seen acting as lookouts and guarding their pack mates young. However, they are highly aggressive towards other packs, and nearly 20% of are killed by other meerkats. This is the highest percentage among all mammals.
                        </p>
                    </div>
                </div>

                {/* Right Card: Audio Recorder */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-4 md:p-12 flex flex-col items-center justify-between border border-gray-50 dark:border-slate-800 min-h-[450px]">
                    <div className="w-full flex flex-col items-center gap-8 py-8 px-6 border border-gray-100 dark:border-slate-800 rounded-[2rem] bg-gray-50/50 dark:bg-slate-800/30">

                        {/* Prep Timer Circle */}
                        {!isFinished ? (
                            <CircularProgress
                                value={isRecording ? (30 - recordTimer) : prepTimer}
                                maxValue={isRecording ? 30 : 25}
                            />
                        ) : (
                            <div className="h-[120px] flex items-center justify-center">
                                <span className="text-2xl font-bold text-green-500">Completed</span>
                            </div>
                        )}

                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold text-black dark:text-white">Audio Recorder</h3>
                            <p className="text-gray-500 dark:text-slate-400 font-medium text-base">
                                {isRecording ? "Recording..." : isFinished ? "Recording finished" : "Recording will begin automatically"}
                            </p>
                        </div>

                        {/* Bottom Wave/Progress */}
                        <div className="w-full flex items-center gap-4 mt-4 pt-6 border-t border-gray-100 dark:border-slate-800">
                            <div className={`p-3 rounded-full transition-colors ${
                                isRecording 
                                ? 'bg-red-50 dark:bg-red-900/30 text-red-500 animate-pulse' 
                                : 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-500'
                            }`}>
                                <Mic size={24} />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex justify-between text-sm font-bold text-gray-500 dark:text-slate-400">
                                    <span>{`00:${recordTimer < 10 ? '0' + recordTimer : recordTimer}`} / 00:30</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#A22BDE] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_10px_rgba(162,43,222,0.5)]"
                                        style={{ width: `${(recordTimer / 30) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <footer className="w-full max-w-7xl pb-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <button className="bg-[#101828] dark:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-xl hover:bg-black dark:hover:bg-slate-700 transition-all active:scale-[0.98] w-full md:w-auto border border-transparent dark:border-slate-700">
                        <File size={26} /> Save & Exit
                    </button>

                    <Link to="/pte-examination/repeat-sentence" className="w-full md:w-auto">
                        <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-2xl hover:opacity-90 transition-all active:scale-[0.98] w-full">
                            Next <MdDoubleArrow size={26} className="mt-1" />
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default PTEReadAloud;