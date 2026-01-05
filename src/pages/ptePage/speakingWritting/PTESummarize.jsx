import React, { useState } from 'react';
import { Copy, Scissors, Clipboard, File } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const PTESummarize = () => {
    const [summary, setSummary] = useState('');
    const [wordCount, setWordCount] = useState(0);

    const handleTextChange = (e) => {
        const text = e.target.value;
        setSummary(text);

        // Count words
        const words = text.trim() ? text.trim().split(/\s+/).length : 0;
        setWordCount(words);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(summary);
    };

    const handleCut = () => {
        navigator.clipboard.writeText(summary);
        setSummary('');
        setWordCount(0);
    };

    const handlePaste = async () => {
        const text = await navigator.clipboard.readText();
        const newText = summary + text;
        setSummary(newText);
        setWordCount(newText.trim() ? newText.trim().split(/\s+/).length : 0);
    };

    const passage = `Climate change represents one of the most significant challenges facing humanity in the twenty-first century, with scientific evidence demonstrating that global temperatures have risen by approximately 1.1 degrees Celsius since pre-industrial times. This warming trend, primarily driven by human activities such as the burning of fossil fuels and deforestation, has led to a cascade of environmental consequences including rising sea levels, more frequent and severe weather events, and disruptions to ecosystems worldwide.

While international agreements like the Paris Climate Accord have established frameworks for reducing greenhouse gas emissions, implementation remains inconsistent across nations, and many scientists argue that current efforts are insufficient to prevent the most catastrophic effects of climate change, necessitating both immediate policy action and technological innovation to transition toward renewable energy sources and sustainable practices.`;

    return (
        <div className="w-full flex flex-col items-center font-poppins">

            {/* Main Content: Dual Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mb-10 max-w-7xl">

                {/* Left Card: Passage */}
                <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50 flex flex-col gap-6 h-full">
                    <h2 className="text-2xl font-bold text-black mb-4">Summarize Written Text</h2>
                    <div className="text-gray-700 text-base leading-relaxed space-y-6 overflow-y-auto">
                        {passage.split('\n\n').map((para, i) => (
                            <p key={i}>{para}</p>
                        ))}
                    </div>
                </div>

                {/* Right Card: Writing Area */}
                <div className="space-y-6 flex flex-col">
                    <div className="bg-white rounded-[2.5rem] shadow-xl p-10 border border-gray-50 flex flex-col gap-4 flex-1">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="text-xl font-bold text-black">Your Summary</h3>

                            {/* Toolbar */}
                            <div className="flex gap-2">
                                <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 transition-colors">
                                    <Copy size={16} /> Copy
                                </button>
                                <button onClick={handleCut} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 transition-colors">
                                    <Scissors size={16} /> Cut
                                </button>
                                <button onClick={handlePaste} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-semibold text-gray-600 transition-colors">
                                    <Clipboard size={16} /> Paste
                                </button>
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="relative flex-1 min-h-[300px]">
                            <textarea
                                value={summary}
                                onChange={handleTextChange}
                                placeholder="Write here...."
                                className="w-full h-full p-6 text-base text-gray-700 border-2 border-[#E0D8FF] rounded-[1.5rem] focus:outline-none focus:border-[#A22BDE] transition-colors resize-none bg-[#FAFAFF]"
                            ></textarea>

                            <div className="absolute bottom-4 right-6 text-sm font-bold text-gray-500">
                                Word count: {wordCount}
                            </div>
                        </div>
                    </div>

                    {/* Instruction Box */}
                    <div className="bg-[#F0F2F5] rounded-full py-4 px-8 text-center text-gray-600 text-sm font-semibold shadow-sm border border-gray-100 mx-auto w-fit">
                        Your response must be written in one single, complete sentence with 5-75 words
                    </div>
                </div>
            </div>

            {/* Footer Buttons */}
            <footer className="z-10 w-full pb-10 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <button className="bg-[#101828] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 text-lg shadow-2xl hover:bg-black transition-all active:scale-[0.98] w-full md:w-auto">
                        <File size={26} /> Save & Exist
                    </button>

                    <Link to="/pte-examination/write-essay" className="w-full md:w-auto">
                        <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white px-16 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 text-lg shadow-2xl hover:opacity-95 transition-all active:scale-[0.98] w-full">
                            Next <MdDoubleArrow size={26} className="mt-1" />
                        </button>
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default PTESummarize;
