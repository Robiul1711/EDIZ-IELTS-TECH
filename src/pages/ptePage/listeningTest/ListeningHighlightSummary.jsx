import React, { useState } from 'react';
import { Mic, FileText } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ListeningHighlightSummary = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const summaries = [
        {
            id: 'A',
            text: "Leonardo da Vinci, an iconic figure of the Renaissance, is renowned for his masterpieces like the 'Mona Lisa'. He was unable to create works of similar quality on other topics that he was interested in, such as animals, plants, and machines, though he still influenced art and innovation for centuries."
        },
        {
            id: 'B',
            text: "In the Renaissance, Leonardo da Vinci was widely known for timeless works of art such as the 'Mona Lisa'. While his expertise in art, science, and engineering, highlighting his visionary concepts and broad curiosity in animals, plants, and technology, have only been recognised in recent years."
        },
        {
            id: 'C',
            text: "Throughout the Renaissance, Leonardo da Vinci, who is today known for his mastery in art, science, and engineering, crafted iconic pieces like the 'Mona Lisa', that revealed his forward-thinking ideas and obscured his other achievements as a farmer, blacksmith and mason throughout much of the time that followed."
        },
        {
            id: 'D',
            text: "During the Renaissance, Leonardo da Vinci, known for his diverse talents in art, science, and engineering, left a lasting legacy through iconic works such as the 'Mona Lisa' as well as his visionary designs and broad interests in animals, plants, and machines, shaping art and innovation for generations."
        },
    ];

    const handleSelect = (id) => {
        setSelectedAnswer(id);
    };

    return (
        <div className="flex flex-col items-center gap-8 py-6 w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">

            {/* Instruction Header Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-gray-100 p-8 md:p-10 w-full max-w-3xl text-center ring-1 ring-black/5">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 tracking-tight">
                    Highlight correct summary
                </h1>

                <div className="bg-[#FFF9E6] border border-[#FFE4A3] rounded-2xl p-4 mb-6 inline-block w-full">
                    <p className="text-[#856404] font-semibold text-lg">
                        You have <span className="font-extrabold text-[#533F03]">25 minutes</span> to complete this page (2/17).
                    </p>
                </div>

                <p className="text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
                    You will hear a recording. Click on the paragraph that best relates to the recording.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full items-start">
                {/* Audio Status Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-10 flex flex-col items-center justify-center min-h-[400px] ring-1 ring-black/5 lg:sticky lg:top-8">
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

                {/* Summaries Container */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-4 md:p-6 ring-1 ring-black/5">
                    <div className="space-y-4">
                        {summaries.map((summary) => {
                            const isSelected = selectedAnswer === summary.id;
                            return (
                                <button
                                    key={summary.id}
                                    onClick={() => handleSelect(summary.id)}
                                    className={`w-full group text-left flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 ${isSelected
                                        ? 'bg-[#8673FF]/10 border-[#8673FF] shadow-sm'
                                        : 'bg-white border-transparent hover:bg-gray-50'
                                        }`}
                                >
                                    {/* Custom Radio Button Visual */}
                                    <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isSelected
                                        ? 'border-[#8673FF]'
                                        : 'border-gray-200 group-hover:border-[#8673FF]/50'
                                        }`}>
                                        <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isSelected ? 'bg-[#8673FF] scale-100' : 'bg-transparent scale-0'}`} />
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#8673FF]' : 'text-gray-400'}`}>
                                            {summary.id}
                                        </span>
                                        <span className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {summary.text}
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

                <Link to="/pte-examination-listening/select-missing-word">
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>

        </div>
    );
};

export default ListeningHighlightSummary;
