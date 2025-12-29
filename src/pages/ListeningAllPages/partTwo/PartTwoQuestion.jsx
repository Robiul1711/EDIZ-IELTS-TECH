import React, { useState } from 'react';
import { Tag } from 'lucide-react';
const PartTwoQuestion = () => {
  // Data for the questions based on the image provided
  const questions = [
    {
      id: 11,
      question: "The Inverness Aquarium opened to the public in",
      options: [
        { label: "A. 1870", value: "A" },
        { label: "B. 1880", value: "B" }, // Selected in image
        { label: "C. 1890", value: "C" }
      ],
      defaultSelected: "B" 
    },
    {
      id: 12,
      question: "Why does the aquarium mainly keep smaller sharks?",
      options: [
        { label: "A. Large sharks tend to consume smaller species quickly.", value: "A" },
        { label: "B. Bigger sharks can endanger staff during feeding.", value: "B" }, // Selected in image
        { label: "C. Large sharks usually do not survive long in enclosed tanks.", value: "C" }
      ],
      defaultSelected: "B"
    },
    {
      id: 13,
      question: "Why are groups limited to eight people?",
      options: [
        { label: "A To give everyone a clear view.", value: "A" },
        { label: "B. Larger groups are harder to manage.", value: "B" }, // Selected in image
        { label: "C. To discourage big family groups.", value: "C" }
      ],
      defaultSelected: "B"
    },
    {
      id: 14,
      question: "Why does the aquarium mainly keep smaller sharks?", // Note: Image repeats Q12 text here
      options: [
        { label: "A. Buy a guidebook.", value: "A" },
        { label: "B. Check the website.", value: "B" }, // Selected in image
        { label: "C. Ask the marine experts.", value: "C" }
      ],
      defaultSelected: "B"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 section-padding-x py-8 text-slate-600 font-sans">
      
      {/* --- Top Header --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
        <p className="font-medium text-slate-800">
          <span className="font-bold">Part -02:</span> Start the audio, then answer questions 11–20 as you go.
        </p>
      </div>

      {/* --- Instruction Box --- */}
      <div className="bg-indigo-50/50 rounded-xl border border-indigo-100 p-8 mb-8 shadow-sm">
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-indigo-100 text-indigo-600 text-sm font-medium shadow-sm">
            <Tag size={14} className="rotate-90" />
            Topic: Spa Packages
          </span>
        </div>
        <p className="text-sm text-slate-600">
          Complete the table below. Write <span className="font-bold text-slate-800">NO MORE THAN TWO WORDS AND/OR A NUMBER</span> in each box
        </p>
      </div>

      {/* --- Main Question Section --- */}
      <div className="bg-white rounded-3xl border border-slate-700/10 shadow-lg p-8 mb-10">
        
        {/* Grid Layout: 1 column on mobile, 2 columns on medium screens+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          
          {questions.map((q) => (
            <QuestionBlock 
              key={q.id} 
              id={q.id} 
              text={q.question} 
              options={q.options} 
              defaultSelected={q.defaultSelected}
            />
          ))}

        </div>

      </div>


    </div>
  );
};

// --- Sub-Component for Individual Questions ---
const QuestionBlock = ({ id, text, options, defaultSelected }) => {
  const [selected, setSelected] = useState(defaultSelected);

  return (
    <div className="flex flex-col gap-4">
      {/* Question Text Box */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
        <h3 className="text-slate-700 font-medium text-base">
          <span className="font-semibold mr-1">{id}.</span> {text}
        </h3>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 pl-2">
        {options.map((option) => (
          <label 
            key={option.value} 
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div className="relative flex items-center mt-0.5">
              <input 
                type="radio" 
                name={`question-${id}`}
                value={option.value}
                checked={selected === option.value}
                onChange={() => setSelected(option.value)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-purple-600 transition-all"
              />
              {/* Custom Inner Dot for Radio Button */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-600 opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"></div>
            </div>
            
            <span className={`text-sm ${selected === option.value ? 'text-slate-800 font-medium' : 'text-slate-600 group-hover:text-slate-700'}`}>
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PartTwoQuestion;