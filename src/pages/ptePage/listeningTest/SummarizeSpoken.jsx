import React, { useState, useEffect } from 'react';
import { Mic, Copy, Clipboard, FileText, ScissorsIcon } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const SummarizeSpoken = () => {
    const [text, setText] = useState("");
    const [wordCount, setWordCount] = useState(0);

    useEffect(() => {
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        setWordCount(words);
    }, [text]);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleCut = () => {
        navigator.clipboard.writeText(text);
        setText("");
    };

    const handlePaste = async () => {
        const clipboardText = await navigator.clipboard.readText();
        setText(prev => prev + clipboardText);
    };

    return (
        <div className="flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">

            {/* Instruction Header Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Summarize spoken text
                </h1>

                <div className="bg-[#FFF9E6] border border-[#FFE4A3] rounded-2xl p-4 mb-6 inline-block w-full">
                    <p className="text-[#856404] font-semibold text-lg">
                        You have <span className="font-extrabold text-[#533F03]">10 minutes</span> to finish this time
                    </p>
                </div>

                <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                    You will listen to a short lecture. Then you must write a summary for a student who was not present.
                    Your writing should clearly present the key points from the lecture.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Audio Status Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-10 flex flex-col items-center justify-center min-h-[400px] ring-1 ring-black/5">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                        <Mic className="text-slate-400 group-hover:text-purple-500 transition-colors" size={40} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">Audio Recorder</h2>
                    <p className="text-gray-500 font-medium mb-12">Recording will begin automatically</p>

                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-gray-400 font-bold text-sm">
                            <Mic size={20} className="opacity-50" />
                            <span>00:00 / 00:50</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-slate-200"></div>
                        </div>
                    </div>
                </div>

                {/* Answer Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col ring-1 ring-black/5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Your Summary</h2>
                        <div className="flex gap-2">
                            <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold rounded-lg border border-gray-200 transition-all">
                                <Copy size={14} /> Copy
                            </button>
                            <button onClick={handleCut} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold rounded-lg border border-gray-200 transition-all">
                                <ScissorsIcon size={14} /> Cut
                            </button>
                            <button onClick={handlePaste} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-bold rounded-lg border border-gray-200 transition-all">
                                <Clipboard size={14} /> Paste
                            </button>
                        </div>
                    </div>

                    <div className="relative flex-1 group">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Write here......"
                            className="w-full h-[230px] p-6 text-gray-700 font-medium bg-white border-2 border-[#8673FF]/10 rounded-2xl focus:border-[#8673FF] focus:ring-4 focus:ring-[#8673FF]/5 outline-none transition-all resize-none shadow-inner"
                        />
                        <div className="absolute bottom-4 right-6 text-gray-400 font-bold text-xs bg-white/80 px-2 py-1 rounded">
                            Word count: {wordCount}
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-500 text-sm font-medium leading-relaxed">
                            Your response must be written in one single, complete sentence with 5-75 words
                        </p>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex justify-between w-full mt-4">
                <button className='bg-[#0F172A] text-white px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <FileText size={22} className="text-gray-400" /> Save & Exist
                </button>

                <Link to="/pte-examination-listening/multiple-choice-multiple-answers">
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default SummarizeSpoken;
