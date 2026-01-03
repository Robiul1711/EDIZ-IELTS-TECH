import React, { useState } from 'react';

const ReadingPartOneMiddle = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    "The original design of the Greywater Bridge included high-density cable joints.",
    "The original design of the Greywater Bridge included high-density cable joints.",
    "The original design of the Greywater Bridge included high-density cable joints.",
    "The original design of the Greywater Bridge included high-density cable joints.",
    "The original design of the Greywater Bridge included high-density cable joints.",
  ];

  return (
    <div className=" section-padding-x py-10 text-slate-700">
      <div className="space-y-6">
        
        {/* Header Section */}
        <header className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h1 className="text-xl font-medium text-slate-600">
            <span className="font-bold">Part –01:</span> Read the text below and answer questions 1–13
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Reading Passage */}
          <article className="lg:col-span-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[600px]">
            <div className="p-10 overflow-y-auto relative custom-scrollbar">
              <div className="text-center mb-10">
                <h2 className="text-xl font-bold text-slate-800 mb-1">The Greywater Bridge Crisis</h2>
                <p className="italic text-slate-500 text-sm">What Would You Do If a Bridge You Designed Had a Fatal Flaw?</p>
              </div>

              <div className="space-y-8 text-[15px] leading-relaxed text-slate-600">
                <section>
                  <span className="text-indigo-600 font-bold block mb-2 text-lg">1.</span>
                  <p>
                    When the coastal city of Marindale commissioned a new suspension bridge across the Greywater Strait, 
                    engineer Laura Bennett was selected to lead the project. The city needed a structure that could 
                    withstand powerful ocean winds and constant heavy traffic, yet remain visually striking to boost tourism. 
                    Bennett's design featured a lightweight steel deck supported by two asymmetrical towers—a bold concept 
                    that had never been attempted in the region. Despite initial concerns, the city council approved the plan, 
                    impressed by its modern appearance and projected low maintenance cost.
                  </p>
                </section>

                <section>
                  <span className="text-indigo-600 font-bold block mb-2 text-lg">2.</span>
                  <p>
                    When the coastal city of Marindale commissioned a new suspension bridge across the Greywater Strait, 
                    engineer Laura Bennett was selected to lead the project. The city needed a structure that could 
                    withstand powerful ocean winds and constant heavy traffic, yet remain visually striking to boost tourism. 
                    Bennett's design featured a lightweight steel deck supported by two asymmetrical towers—a bold concept 
                    that had never been attempted in the region. Despite initial concerns, the city council approved the plan, 
                    impressed by its modern appearance and projected low maintenance cost.
                  </p>
                </section>
              </div>

              {/* Custom Scrollbar Track Indicator */}
              <div className="absolute right-2 top-10 bottom-10 w-1.5 bg-slate-100 rounded-full">
                <div className="h-1/2 w-full bg-slate-400 rounded-full"></div>
              </div>
            </div>
          </article>

          {/* Right Column: Questions */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Instructions Box */}
            <div className="bg-[#F5F3FF] rounded-2xl p-6 border border-indigo-50">
              <h3 className="font-bold text-slate-800 mb-2 text-lg">Questions 01–05</h3>
              <div className="text-sm space-y-1 text-slate-600">
                <p>Choose <span className="font-bold">TRUE</span> if the statement agrees with the information,</p>
                <p>Choose <span className="font-bold">FALSE</span> if it contradicts the information,</p>
                <p>Choose <span className="font-bold">NOT GIVEN</span> if there is no information.</p>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {questions.map((q, idx) => (
                <div key={idx} className="space-y-4">
                  <div className={`p-4 rounded-xl transition-all ${idx === 0 ? 'bg-indigo-50 border border-indigo-100' : 'bg-[#F1F3F5]'}`}>
                    <p className="text-sm font-medium text-slate-700">
                      <span className="text-indigo-600 mr-2">{idx + 1}.</span> {q}
                    </p>
                  </div>
                  
                  {/* Radio Options - Only visible for the active/first question as per image */}
                  {idx === 0 && (
                    <div className="px-4 space-y-3">
                      {['TRUE', 'FALSE', 'NOT GIVEN'].map((option) => (
                        <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="radio"
                              name="bridge-q"
                              className="peer appearance-none w-5 h-5 border-2 border-slate-400 rounded-full checked:border-indigo-600 transition-all"
                              onChange={() => setSelectedOption(option)}
                            />
                            <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                          </div>
                          <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-wide">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPartOneMiddle;