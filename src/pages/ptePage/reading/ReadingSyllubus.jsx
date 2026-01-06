import React from 'react';
import { File } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const ReadingSyllubus = () => {
    return (
        <div className='flex flex-col min-h-screen items-center gap-6 md:gap-10 px-4 pb-10 font-poppins'>
            {/* Header Area */}
            <div className="text-center mt-6 md:mt-12 space-y-4">
                <h1 className='text-2xl md:text-3xl font-bold'>
                    Part 2 : Reading
                </h1>

                <div className="flex flex-col items-center gap-2 text-gray-600 font-medium">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
                        <p>Part 1 is approximately 73 minutes long.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
                        <p>Click the "Next" button when you're ready.</p>
                    </div>
                </div>
            </div>

            {/* Syllabus Table Card */}
            <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden w-full max-w-5xl border border-gray-100 p-8 md:p-12">
                <div className="border border-gray-300 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-4 px-6 font-bold text-lg border-r border-gray-300 w-1/4">Section</th>
                                <th className="py-4 px-6 font-bold text-lg border-r border-gray-300 w-2/4">Content</th>
                                <th className="py-4 px-6 font-bold text-lg w-1/4">Time Allowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Section 01 */}
                            <tr className="border-b border-gray-300">
                                <td className="py-4 px-6 font-bold text-gray-700 border-r border-gray-300 align-top" rowSpan={8}>
                                    Section-01
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 border-r border-gray-300">
                                    Reading and writing; fill in the blanks
                                </td>
                                <td className="py-4 px-6 align-middle text-center md:text-left" rowSpan={8}>
                                    43 minutes
                                </td>
                            </tr>
                            <tr><td className="py-4 px-6 border-b border-gray-200 border-r hover:border-gray-300">
                                Multiple-choice, choose rmjltiple answers
                            </td></tr>
                            <tr><td className="py-4 px-6 border-b border-gray-200 border-r hover:border-gray-300">
                                Re-order paragraphs
                            </td></tr>
                            <tr><td className="py-4 px-6 border-b border-gray-200 border-r hover:border-gray-300">
                                Reading: fill in the blanks
                            </td></tr>
                            <tr><td className="py-4 px-6 border-b border-gray-200 border-r hover:border-gray-300">
                                Multiple-choice, choose single answer
                            </td></tr>
                            <tr>
                               
                                </tr>
                            <tr></tr>
                            <tr className="border-b border-gray-300"></tr>

                            {/* Section 02 */}
                            
                           
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-auto mt-6">
                <button className='bg-[#0F172A] text-white w-full md:w-auto px-10 py-4 text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95'>
                    <File size={20} /> Save & Exist
                </button>

                <Link to="/pte-examination-reading/fill-in-blanks">
                    <button className='bg-[#A22BDE] text-white w-full md:w-auto px-16 py-4 text-lg shadow-lg rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95'>
                        Next <MdDoubleArrow />
                    </button>
                </Link>
            </div>

            {/* Footer Disclaimer */}
            <div className="flex items-center gap-2 text-gray-600 font-medium mt-4">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
                    <div className="w-2 h-2 bg-[#8673FF] rounded-full"></div>
                </div>
                <p>In the actual test, you will use a QWERTY keyboard.</p>
            </div>
        </div>
    );
};

export default ReadingSyllubus;
