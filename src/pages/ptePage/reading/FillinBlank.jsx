import React, { useState } from "react";
import { ChevronDown, File } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const FillinBlank = () => {
  const [selections, setSelections] = useState({
    blank1: "",
    blank2: "",
    blank3: "",
    blank4: "",
    blank5: "",
  });

  const [activeBlank, setActiveBlank] = useState(null);

  const questions = {
    blank1: ["remote", "remotest", "remotely", "remoter"],
    blank2: ["making it the", "making it a", "it is the", "it is a"],
    blank3: ["living on", "live on", "lived on", "lives on"],
    blank4: ["consists", "consist", "consisting", "consisted"],
    blank5: ["pristine", "original", "primary", "initial"],
  };

  const handleSelect = (blankId, value) => {
    setSelections((prev) => ({ ...prev, [blankId]: value }));
    setActiveBlank(null);
  };

  const BlankDropdown = ({ id, value }) => {
    const isOpen = activeBlank === id;

    return (
      <div className="relative inline-block mx-1 align-middle">
        <button
          onClick={() => setActiveBlank(isOpen ? null : id)}
          className={`flex items-center justify-between min-w-[140px] px-3 py-1.5 border rounded-lg transition-all duration-200 ${
            isOpen
              ? "border-[#8673FF] ring-2 ring-[#8673FF]/20 bg-white dark:bg-slate-800"
              : "border-gray-300 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              value ? "text-[#8673FF]" : "text-transparent"
            }`}
          >
            {value || "Select..."}
          </span>
          <ChevronDown
            size={16}
            className={`ml-2 transition-transform duration-200 ${
              isOpen
                ? "rotate-180 text-[#8673FF]"
                : "text-gray-400 dark:text-slate-500"
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
            {questions[id].map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(id, option)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-[#8673FF]/10 dark:hover:bg-slate-700 transition-colors flex items-center gap-3"
              >
                <span className="text-gray-400 dark:text-slate-500 font-medium">
                  {index + 1}.
                </span>
                <span
                  className={
                    value === option
                      ? "text-[#8673FF] font-semibold"
                      : "text-gray-700 dark:text-slate-300"
                  }
                >
                  {option}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8  w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2 md:mb-6">
          Reading and writing: fill in the blanks
        </h1>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 w-full overflow-hidden flex flex-col transition-all duration-300">
        {/* Header Decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>

        <div className="p-6 md:p-12 space-y-8 md:space-y-10">
          {/* Instructions */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700/50">
            <p className="text-slate-700 dark:text-slate-300 font-medium text-xs md:text-base leading-relaxed">
              Below is a text with blanks. Click on each blank, and a list of
              choices will appear. Select the appropriate answer choice for each
              blank.
            </p>
          </div>

          {/* Passage Container */}
          <div className="text-slate-700 dark:text-slate-300 leading-[2.5] md:leading-[3] text-sm md:text-lg font-medium">
            <p className="inline">The Pitcairn Islands are one of the</p>
            <BlankDropdown id="blank1" value={selections.blank1} />
            <p className="inline">
              inhabited island groups in the world. Located in the distant South
              Pacific, the main island of Pitcairn has a population of only 47
              people,
            </p>
            <BlankDropdown id="blank2" value={selections.blank2} />
            <p className="inline">
              smallest sovereign state or dependency in existence. The other
              islands in the archipelago have no settlements on them. Its
              nearest neighbor with a permanent population is Mangareva Island
              of French Polynesia, which has about 1,200 people
            </p>
            <BlankDropdown id="blank3" value={selections.blank3} />
            <p className="inline">
              it. Due in large part to its isolation and lack of people, the
              islands have a bountiful marine ecosystem that
            </p>
            <BlankDropdown id="blank4" value={selections.blank4} />
            <p className="inline">
              of over 1,250 species, many of which are endemic. In 2016, the
              United Kingdom, of which the islands are a dependency, declared
              their entire exclusive economic zone to be a marine protected
              area. Surveys have shown that the wildlife there is not only
              abundant, but it is also a completely
            </p>
            <BlankDropdown id="blank5" value={selections.blank5} />
            <p className="inline">marine ecosystem.</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-4 md:gap-6 w-full md:w-auto md:mt-10">
        <button className="bg-slate-900 dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-base md:text-lg shadow-lg rounded-2xl font-bold flex items-center justify-center gap-3 transition-all hover:bg-black active:scale-95">
          <File size={20} /> Save & Exit
        </button>

        <Link
          to={"/pte-examination-reading/mcq-question"}
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

export default FillinBlank;
