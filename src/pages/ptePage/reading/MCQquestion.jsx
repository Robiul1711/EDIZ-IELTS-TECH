import React, { useState } from 'react';
import { File, Check } from 'lucide-react';
import { MdDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';

const MCQquestion = () => {
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    const options = [
        { id: 'A', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'B', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'C', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'D', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
        { id: 'E', text: 'The El Castillo ramid ma soon collapse into a cave beneath it.' },
    ];

    const toggleAnswer = (id) => {
        setSelectedAnswers(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col items-center gap-8 py-6 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Title */}
            <div className="w-full text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                    Multiple-choice, choose multiple answers
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
                {/* Left Column: Passage */}
                <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10 flex flex-col h-full ring-1 ring-black/5">
                    <div className="mb-6 p-4 bg-gray-50/80 rounded-2xl border border-gray-100">
                        <p className="text-gray-700 font-bold text-base leading-relaxed">
                            Read the text and answer the question by selecting all the correct responses. You will need to select more than one response.
                        </p>
                    </div>

                    <div className="text-gray-600 leading-[1.8] text-xs md:text-sm font-medium space-y-4 overflow-y-auto max-h-[600px] pr-4 scrollbar-thin scrollbar-thumb-gray-200">
                        <p>
                            Researchers investigating the ruins of the Mayan city of Chichen Itza have made some significant discoveries about the large central pyramid El Castillo using tri-dimensional electric resistivity tomography (ERT-3D). This technology works by inserting metal probes into the ground and sending electrical pulses through it. Soil, stone, air and water all resist electricity to different degrees, with water being very conductive and empty air being highly resistant, meaning electricity passes through the former easily and the latter hardly at all. The signals that the probes received allowed scientists to create a three-dimensional image of what lies concealed beneath the ground.
                        </p>
                        <p>
                            Underneath the pyramid, they discovered an irregular empty space that was partially filled with water and was 25 metres by 35 metres and up to 20 metres deep. This kind of rock formation is called a cenote when they are open to the surface, and they were very important to the Maya. They were one of the society's main sources of fresh water, and they were an integral part of their religious beliefs. This cenote is covered by four metres of limestone that is constantly being worn thinner by erosion, but it may already have an as yet unknown connection to the surface.
                        </p>
                        <p>
                            Later, the researchers placed their ERT-3D sensors on the pyramid itself to see what else they could learn. Excavations in the 1940s had revealed that the 30-metre pyramid was actually a shell built over an older 20-metre pyramid, and the scans showed that there was a third 10-metre pyramid inside the middle structure. Now, scientists plan to excavate tunnels that the Maya constructed and later filled in that may have connected the many temples of the city to each other and its cenotes.
                        </p>
                    </div>
                </div>

                {/* Right Column: Question & Options */}
                <div className="flex flex-col gap-6">
                    <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-10 h-full ring-1 ring-black/5">
                        <h2 className="text-gray-800 font-bold text-lg md:text-xl mb-10 leading-snug">
                            According to the text, which statements are true about the Chichen Itza site?
                        </h2>

                        <div className="space-y-4">
                            {options.map((option) => {
                                const isSelected = selectedAnswers.includes(option.id);
                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => toggleAnswer(option.id)}
                                        className={`w-full group text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${isSelected
                                            ? 'bg-[#8673FF]/10 border-[#8673FF] shadow-md translate-x-1'
                                            : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${isSelected
                                            ? 'bg-[#8673FF] border-[#8673FF]'
                                            : 'bg-white border-gray-300 group-hover:border-[#8673FF]'
                                            }`}>
                                            {isSelected && <Check size={16} className="text-white fill-current stroke-[3px]" />}
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <span className={`font-bold text-lg ${isSelected ? 'text-[#8673FF]' : 'text-gray-500'}`}>
                                                {option.id}
                                            </span>
                                            <span className={`text-sm md:text-base font-medium leading-relaxed ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
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
            <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-8">
                <button className='bg-[#0F172A] text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                    <File size={22} className="text-gray-400" /> Save & Exit
                </button>

                <Link to={"/pte-examination-reading/fill-in-blanks-2"}>
                    <button className='bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95'>
                        Next <MdDoubleArrow size={24} />
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default MCQquestion;
