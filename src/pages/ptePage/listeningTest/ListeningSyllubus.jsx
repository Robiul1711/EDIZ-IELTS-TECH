import React from 'react';
import { File } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ListeningSyllubus = () => {
    return (
        <div className='flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins animate-in fade-in duration-700'>
            {/* Header Area */}
            <div className="text-center mt-6 md:mt-12 space-y-4">
                <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
                    Part 3 : Listening
                </h1>

                <div className="flex flex-col items-center gap-2 text-gray-600 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#8673FF] rounded-full shadow-[0_0_8px_rgba(134,115,255,0.6)]"></div>
                        <p>The Listening part is approximately 45 minutes long.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#8673FF] rounded-full shadow-[0_0_8px_rgba(134,115,255,0.6)]"></div>
                        <p>Click the "Next" button when you're ready.</p>
                    </div>
                </div>
            </div>

            {/* Syllabus Table Card */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.1)] overflow-hidden w-full max-w-5xl border border-gray-100 p-8 md:p-12 relative">
                {/* Visual Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A22BDE] to-[#8673FF]"></div>

                <div className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-200">
                                <th className="py-5 px-8 font-bold text-lg text-slate-700 border-r border-slate-200 w-[25%] uppercase tracking-wider text-sm">Section</th>
                                <th className="py-5 px-8 font-bold text-lg text-slate-700 border-r border-slate-200 w-[50%] uppercase tracking-wider text-sm">Content</th>
                                <th className="py-5 px-8 font-bold text-lg text-slate-700 w-[25%] uppercase tracking-wider text-sm">Time Allowed</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-600 font-medium">
                            {/* Section 01 */}
                            <tr className="border-b border-slate-200">
                                <td className="py-6 px-8 font-bold text-slate-800 border-r border-slate-200 align-top">
                                    Section-01
                                </td>
                                <td className="py-6 px-8 border-r border-slate-200">
                                    Summarize spoken text
                                </td>
                                <td className="py-6 px-8">
                                    10 minutes
                                </td>
                            </tr>

                            {/* Section 02 Group */}
                            <tr>
                                <td className="py-6 px-8 font-bold text-slate-800 border-r border-slate-200 align-top" rowSpan={7}>
                                    Section-02
                                </td>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Multiple-choice, choose multiple answers
                                </td>
                                <td className="py-6 px-8 align-top" rowSpan={7}>
                                    25 minutes
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Fill in the blanks
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Highlight correct summary
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Multiple-choice, choose single answer
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Select missing word
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-b border-slate-100 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Highlight incorrect words
                                </td>
                            </tr>
                            <tr>
                                <td className="py-6 px-8 border-r border-slate-200 hover:bg-slate-50/50 transition-colors">
                                    Write from dictation
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-6">
                <button className='bg-[#0F172A] text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <File size={22} className="text-gray-400" /> Save & Exit
                </button>

                <Link to="/pte-examination-listening">
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>

            {/* Footer Disclaimer */}
            <div className="flex items-center gap-3 text-gray-500 font-medium mt-4">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-[#8673FF]/60 rounded-full"></div>
                    <div className="w-2 h-2 bg-[#8673FF]/60 rounded-full"></div>
                </div>
                <p className="text-sm">In the actual test, you will use a QWERTY keyboard.</p>
            </div>
        </div>
    );
};

export default ListeningSyllubus;