import React, { useState } from 'react';
import { Mic, FileText } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ListeningMCQSingle = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const options = [
        { id: 'A', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'B', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'C', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'D', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
    ];

    const handleSelect = (id) => {
        setSelectedAnswer(id);
    };

    return (
        <div className="flex flex-col items-center gap-8 py-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">

            {/* Title Area */}
            <div className="w-full text-left mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                    Multiple-choice, choose single answer
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
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

                {/* Question & Options Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-10 h-full ring-1 ring-black/5 flex flex-col">
                    <h2 className="text-gray-800 font-bold text-lg md:text-xl mb-10 leading-snug">
                        What is the main topic of the text?
                    </h2>

                    <div className="space-y-4">
                        {options.map((option) => {
                            const isSelected = selectedAnswer === option.id;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelect(option.id)}
                                    className={`w-full group text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isSelected
                                        ? 'bg-[#8673FF]/10 border-[#8673FF] shadow-sm'
                                        : 'bg-white border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    {/* Custom Radio Button Visual */}
                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isSelected
                                        ? 'border-[#8673FF]'
                                        : 'border-gray-200 group-hover:border-[#8673FF]/50'
                                        }`}>
                                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isSelected ? 'bg-[#8673FF] scale-100' : 'bg-transparent scale-0'}`} />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#8673FF]' : 'text-gray-400'}`}>
                                            {option.id}
                                        </span>
                                        <span className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {option.text}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex justify-between w-full mt-4">
                <button className='bg-[#0F172A] text-white px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <FileText size={22} className="text-gray-400" /> Save & Exist
                </button>

                <Link to="/pte-examination-listening/highlight-correct-summary">
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default ListeningMCQSingle;
