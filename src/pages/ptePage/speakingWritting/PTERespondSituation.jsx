import React, { useState, useEffect } from 'react';
import { File, Mic, MicOff } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ImageAssets } from '@/lib/ImageProvider';

const Waveform = () => {
    return (
        <div className="flex items-center gap-0.5 h-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <div
                    key={i}
                    className="w-1 bg-[#8673FF] rounded-full animate-pulse"
                    style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`
                    }}
                ></div>
            ))}
        </div>
    );
};

const PTERespondSituation = () => {
    const [status, setStatus] = useState('preparing'); // preparing, recording, finished
    const [prepTimer, setPrepTimer] = useState(15);
    const [recordTimer, setRecordTimer] = useState(0);

    useEffect(() => {
        let interval = null;

        if (status === 'preparing' && prepTimer > 0) {
            interval = setInterval(() => {
                setPrepTimer((prev) => prev - 1);
            }, 1000);
        } else if (status === 'preparing' && prepTimer === 0) {
            setStatus('recording');
        }

        if (status === 'recording' && recordTimer < 10) {
            interval = setInterval(() => {
                setRecordTimer((prev) => prev + 1);
            }, 1000);
        } else if (status === 'recording' && recordTimer === 10) {
            setStatus('finished');
        }

        return () => clearInterval(interval);
    }, [status, prepTimer, recordTimer]);

    return (
        <div className="w-full flex flex-col items-center font-poppins">
            {/* Top Instruction Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 w-full mb-10 border border-gray-50 flex flex-col gap-6 max-w-4xl">
                <h2 className="text-2xl font-bold text-black">Respond to a situation</h2>

                <div className="bg-[#FFFCE5] border border-yellow-200 rounded-xl p-4">
                    <p className="text-base font-semibold text-black">
                        You have 10 Seconds to prepare and 40 Seconds to record.
                    </p>
                </div>

                <div className="text-gray-700 text-base leading-relaxed space-y-2">
                    <p>
                        Listen to and read a description ofa situation. You will have 10 seconds to think about your answer. Then you will hear beep. You will have 40 seconds to answer the question. Please answer as completely as you can.
                    </p>
                </div>

                <div className="text-gray-700 text-base leading-relaxed space-y-2">
                    <p>
                        You are a university student working on a research project for a history course, but a book you need for your research is only available at the library of a different university.
                    </p>
                </div>
                <p className="font-medium">
                    You need to call that library to get the book. What do you say to the librarian?
                </p>
            </div>

            {/* Dual Status Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-12 max-w-7xl">

                {/* Left Card: Audio Standby / Preparation */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-50 flex flex-col items-center gap-6">
                    <div className="w-full py-16 flex flex-col items-center justify-center gap-6 border border-gray-100 rounded-[2rem]">
                        <div className="bg-[#F0F2F5] p-6 rounded-full text-gray-400">
                            <MicOff size={32} />
                        </div>
                        <div className="text-center space-y-1">
                            <h3 className="text-xl font-bold text-black">Audio Recorder</h3>
                            <p className="text-gray-500 font-medium text-base">
                                Recording will begin automatically
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar Footer */}
                    <div className="w-full flex items-center gap-4 pt-4">
                        <div className="p-2 rounded-full bg-gray-50 text-gray-400">
                            <MicOff size={20} />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="flex justify-between text-sm font-bold text-gray-500">
                                <span>00:00 / 00:15</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#A22BDE] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(162,43,222,0.4)]"
                                    style={{ width: `${(status === 'preparing' ? (15 - prepTimer) / 15 : 1) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Card: Active Recording */}
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-50 flex flex-col items-center gap-6">
                    <div className="w-full py-16 flex flex-col items-center justify-center gap-6 border border-gray-100 rounded-[2rem]">
                        {status === 'recording' ? (
                            <div className="w-12 h-12 bg-black rounded-full shadow-lg ring-4 ring-gray-100"></div>
                        ) : (
                            <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                        )}

                        <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold text-black">Audio Recorder</h3>
                            {status === 'recording' && <Waveform />}
                            <p className={`text-base font-semibold ${status === 'recording' ? 'text-[#8673FF]' : 'text-gray-500'}`}>
                                {status === 'recording' ? 'Recording.......' : status === 'finished' ? 'Completed' : 'Standby'}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar Footer */}
                    <div className="w-full flex items-center gap-4 pt-4">
                        <div className={`p-2 rounded-full ${status === 'recording' ? 'bg-[#101828] text-white' : 'bg-gray-50 text-gray-400'}`}>
                            <Mic size={20} />
                        </div>
                        <div className="flex-1 flex flex-col gap-1">
                            <div className="flex justify-between text-sm font-bold text-gray-500">
                                <span>{`00:${recordTimer < 10 ? '0' + recordTimer : recordTimer}`} / 00:10</span>
                            </div>
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full bg-[#A22BDE] rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(162,43,222,0.4)]`}
                                    style={{ width: `${(recordTimer / 10) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <footer className="z-10 w-full pb-10 px-4 md:px-10">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <button className="bg-[#101828] text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 text-lg shadow-2xl hover:bg-black transition-all active:scale-[0.98] w-full md:w-auto">
                        <File size={26} /> Save & Exist
                    </button>

                    <Link to="/pte-examination/summarize-written-text" className="w-full md:w-auto">
                        <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-2xl hover:opacity-95 transition-all active:scale-[0.98] w-full">
                            Next <MdDoubleArrow size={26} className="mt-1" />
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default PTERespondSituation;
