import React, { useState } from "react";
import { File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const MCQSingleQuestion = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  const options = [
    {
      id: "A",
      text: "The El Castillo ramid ma soon collapse into a cave beneath it.",
    },
    {
      id: "B",
      text: "The El Castillo ramid ma soon collapse into a cave beneath it.",
    },
    {
      id: "C",
      text: "The El Castillo ramid ma soon collapse into a cave beneath it.",
    },
    {
      id: "D",
      text: "The El Castillo ramid ma soon collapse into a cave beneath it.",
    },
  ];

  const handleSelect = (id) => {
    setSelectedAnswer(id);
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 py-4 md:py-8 px-4 md:px-0 w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2 md:mb-6">
          Multiple-choice, choose multiple answers
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
        {/* Left Column: Passage */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 flex flex-col h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
          <div className="mb-6 p-4 md:p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700/50">
            <p className="text-slate-800 dark:text-slate-200 font-bold text-sm md:text-base leading-relaxed">
              Read the text and answer the question by selecting all the correct
              responses. You will need to select more than one response.
            </p>
          </div>

          <div className="text-slate-600 dark:text-slate-400 leading-[1.8] text-sm md:text-base font-medium space-y-4 overflow-y-auto lg:max-h-[600px] pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-800">
            <p>
              Researchers investigating the ruins of the Mayan city of Chichen
              Itza have made some significant discoveries about the large
              Portuguese is one of the most spoken languages with over 230
              million native speakers worldwide. However, the type of Portuguese
              that people speak varies depending on where they live. Portugal
              was once a colonial power, and it had colonies in South America,
              Africa, and Asia, but today most native speakers live in Portugal
              or Brazil. The Brazilian dialect is easily distinguished from the
              European one, and its influence has spread through the popularity
              of Brazilian athletes and television programs. This has caused
              some aggravation for linguistic purists in Portugal, but there is
              little that they can realistically do to reverse the trend. After
              all, Portugal only has about 10.4 million people, whereas Brazil
              has over 200 million.
            </p>
          </div>
        </div>

        {/* Right Column: Question & Options */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
            <h2 className="text-slate-800 dark:text-white font-bold text-lg md:text-2xl mb-8 md:mb-10 leading-snug">
              What is the main topic of the text?
            </h2>

            <div className="space-y-3 md:space-y-4">
              {options.map((option) => {
                const isSelected = selectedAnswer === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className={`w-full group text-left flex items-start gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${isSelected
                        ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md translate-x-1"
                        : "bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-800"
                      }`}
                  >
                    {/* Custom Radio Button Visual */}
                    <div
                      className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isSelected
                          ? "border-indigo-600 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                          : "border-gray-300 dark:border-slate-600 group-hover:border-indigo-400"
                        }`}
                    >
                      <div
                        className={`w-2.5 h-2.5 rounded-full bg-white transition-all duration-300 ${isSelected ? "scale-100" : "scale-0"
                          }`}
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <span
                        className={`font-bold text-base md:text-lg transition-colors ${isSelected
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-400 dark:text-slate-500"
                          }`}
                      >
                        {option.id})
                      </span>
                      <span
                        className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${isSelected
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-600 dark:text-slate-400"
                          }`}
                      >
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
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto  md:mt-10 self-center">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link
          to={`/${isDashboard ? "dashboard" : "pte-examination-reading"}/mcq-multiple-question`}
          className="w-full md:w-auto"
        >
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white w-full md:w-auto px-16 py-4 text-base md:text-lg shadow-lg shadow-indigo-200 dark:shadow-none rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:opacity-95 active:scale-95 group">
            Next{" "}
            <MdDoubleArrow
              size={24}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MCQSingleQuestion;
