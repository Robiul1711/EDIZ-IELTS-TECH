import React, { useState } from 'react';
import { File } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MCQSingleQuestion = () => {
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
        <div className="flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Title */}
            <div className="w-full text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 font-poppins">
                    Multiple-choice, choose single answer
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Left Column: Passage */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10 flex flex-col h-full ring-1 ring-black/5">
                    <div className="mb-6 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                        <p className="text-gray-700 font-bold text-base leading-relaxed">
                            Read the text and answer the multiple-choice question by selecting the correct response. Only one response is correct.
                        </p>
                    </div>

                    <div className="text-gray-600 leading-[1.8] text-xs md:text-sm font-medium space-y-4 overflow-y-auto max-h-[600px] pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                        <p>
                            Portuguese is one of the most spoken languages with over 230 million native speakers worldwide. However, the type of Portuguese that people speak varies depending on where they live. Portugal was once a colonial power, and it had colonies in South America, Africa, and Asia, but today most native speakers live in Portugal or Brazil. The Brazilian dialect is easily distinguished from the European one, and its influence has spread through the popularity of Brazilian athletes and television programs. This has caused some aggravation for linguistic purists in Portugal, but there is little that they can realistically do to reverse the trend. After all, Portugal only has about 10.4 million people, whereas Brazil has over 200 million.
                        </p>
                    </div>
                </div>

                {/* Right Column: Question & Options */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10 h-full ring-1 ring-black/5">
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

                                        <div className="flex items-start gap-3">
                                            <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-[#8673FF]' : 'text-gray-400'}`}>
                                                {option.id}
                                            </span>
                                            <span className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${isSelected ? 'text-[#0F172A]' : 'text-gray-600'}`}>
                                                {option.text}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-8 self-center">
                <button className='bg-[#0F172A] text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <File size={22} className="text-gray-400" /> Save & Exit
                </button>

                <Link to={"/pte-examination-reading/reorder-paragraphs"}>
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MCQSingleQuestion;