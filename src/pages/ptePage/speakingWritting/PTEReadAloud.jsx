import React, { useState, useEffect } from 'react';
import { File, Mic, Clock } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';


const CircularProgress = ({ value, maxValue, size = 120,  }) => {
    const radius = size / 2 - 10;
    const circumference = 2 * Math.PI * radius;
    const progress = (value / maxValue) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#F0F0F0"
                    strokeWidth="8"
                    fill="transparent"
                />
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
        <div className="w-full flex flex-col items-center">
            {/* Main Content: Dual Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mb-12">

                {/* Left Card: Instructions */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 flex flex-col gap-6 border border-gray-50">
                    <h2 className="text-2xl font-bold text-black">Read aloud</h2>

                    <div className="bg-[#FFFCE5] border border-yellow-200 rounded-xl p-4">
                        <p className="text-base font-semibold text-black">
                            You have <span className="font-bold">40 seconds to prepare</span> and <span className="font-bold">40 seconds to record.</span>
                        </p>
                    </div>

                    <p className=" text-base font-medium leading-relaxed ">
                        Look at the text below. In 40 seconds, you must read this text aloud as naturally and clearly as possible. You have 40 seconds to read aloud.
                    </p>

                    <p className="text-gray-600 text-base font-medium mt-4">
                        Meerkats are known for their altruistic behaviour, and they are often seen acting as lookouts and guarding their pack mates young. However, they are highly aggressive towards other packs, and nearly 20% Of are killed by other rneerkats. This is the highest percentage among all mammals.
                    </p>
                </div>

                {/* Right Card: Audio Recorder */}
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 flex flex-col items-center justify-between border border-gray-50 min-h-[450px]">
                    <div className="w-full flex flex-col items-center gap-8 py-8 px-6 border border-gray-100 rounded-[2rem]">

                        {/* Prep Timer Circle */}
                        {!isFinished ? (
                            <CircularProgress
                                value={isRecording ? (30 - recordTimer) : prepTimer}
                                maxValue={isRecording ? 30 : 25}
                                status={isRecording ? 'recording' : 'preparing'}
                            />
                        ) : (
                            <div className="h-32 flex items-center justify-center">
                                <span className="text-2xl font-bold text-green-500">Completed</span>
                            </div>
                        )}

                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-bold text-black">Audio Recorder</h3>
                            <p className="text-gray-500 font-medium text-base">
                                {isRecording ? "Recording..." : isFinished ? "Recording finished" : "Recording will begin automatically"}
                            </p>
                        </div>

                        {/* Bottom Wave/Progress */}
                        <div className="w-full flex items-center gap-4 mt-4 pt-6 border-t border-gray-100">
                            <div className={`p-3 rounded-full ${isRecording ? 'bg-red-50 text-red-500 animate-pulse' : 'bg-gray-50 text-gray-400'}`}>
                                <Mic size={24} />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex justify-between text-sm font-bold text-gray-500">
                                    <span>{`00:${recordTimer < 10 ? '0' + recordTimer : recordTimer}`} / 00:30</span>
                                </div>
                                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-[#A22BDE] rounded-full transition-all duration-1000 ease-linear`}
                                        style={{ width: `${(recordTimer / 30) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="z-10 w-full pb-10 px-4 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <button className="bg-[#101828] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 text-lg shadow-2xl hover:bg-black transition-all active:scale-[0.98] w-full md:w-auto">
                        <File size={26} /> Save & Exist
                    </button>

                    <Link to="/pte-examination/repeat-sentence" className="w-full md:w-auto">
                        <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-2xl hover:opacity-95 transition-all active:scale-[0.98] w-full">
                            Next <MdDoubleArrow size={26} className="mt-1" />
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
};


export default PTEReadAloud;
