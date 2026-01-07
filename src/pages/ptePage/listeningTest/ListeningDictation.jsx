import React, { useState } from 'react';
import { Mic, Copy, Clipboard, FileText, ScissorsIcon } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ListeningDictation = () => {
    const [text, setText] = useState('');

    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
    };

    const handleCut = () => {
        navigator.clipboard.writeText(text);
        setText('');
    };

    const handlePaste = async () => {
        const clipboardText = await navigator.clipboard.readText();
        setText(prev => prev + clipboardText);
    };

    return (
        <div className="flex flex-col items-center gap-8 py-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">

            {/* Instruction Header Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 tracking-tight">
                    Write from dictation
                </h1>

                <div className="bg-[#FFF9E6] border border-[#FFE4A3] rounded-2xl p-4 mb-6 inline-block w-full">
                    <p className="text-[#856404] font-semibold text-lg">
                        You have <span className="font-extrabold text-[#533F03]">25 minutes</span> to complete this page (2/17).
                    </p>
                </div>

                <p className="text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
                    You will hear one sentence. Type the sentence in the box below exactly as you hear it. Write as much of the sentence as you can. You will hear the sentence only once.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
                {/* Audio Status Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-10 flex flex-col items-center justify-center min-h-[400px] ring-1 ring-black/5">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-inner">
                        <Mic className="text-slate-300" size={40} />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">Audio Recorder</h2>
                    <p className="text-gray-400 font-medium mb-12">Recording will begin automatically</p>

                    <div className="w-full max-w-md flex flex-col gap-4">
                        <div className="flex items-center gap-4 text-gray-400 font-bold text-sm">
                            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                                <Mic size={16} />
                            </div>
                            <span>00:00 / 00:50</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-0 h-full bg-[#8673FF]"></div>
                        </div>
                    </div>
                </div>

                {/* Writing Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 h-full ring-1 ring-black/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-gray-800 font-bold text-lg">Your Summary</h3>
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

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write here....."
                        className="w-full h-64 p-6 bg-white border-2 border-slate-100 rounded-3xl outline-none focus:border-[#8673FF]/30 focus:ring-4 focus:ring-[#8673FF]/5 transition-all text-gray-700 leading-relaxed resize-none shadow-inner"
                    />

                    <div className="flex justify-end mt-4">
                        <span className="text-gray-400 text-sm font-semibold">
                            Word count: {wordCount}
                        </span>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex justify-between w-full mt-4">
                <button className='bg-[#0F172A] text-white px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <FileText size={22} className="text-gray-400" /> Save & Exist
                </button>

                <Link to="/pte/result">
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default ListeningDictation;
