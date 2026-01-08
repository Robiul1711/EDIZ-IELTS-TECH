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
    <div className="flex flex-col items-center gap-8 py-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 ">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Reading and writing: fill in the blanks
        </h1>
      </div>

      {/* Instruction Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 dark:border-slate-800 p-8 md:p-12 w-full relative overflow-hidden">
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A22BDE] to-[#8673FF]"></div>

        <div className="mb-10 p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
          <p className="text-gray-700 dark:text-slate-300 font-medium text-lg">
            Below is a text with blanks. Click on each blank, and a list of
            choices will appear. Select the appropriate answer choice for each
            blank.
          </p>
        </div>

        {/* Question Paragraph */}
        <div className="text-gray-700 dark:text-slate-300 leading-loose text-lg font-medium space-y-2">
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
            islands in the archipelago have no settlements on them. Its nearest
            neighbor with a permanent population is Mangareva Island of French
            Polynesia, which has about 1,200 people
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
            their entire exclusive economic zone to be a marine protected area.
            Surveys have shown that the wildlife there is not only abundant, but
            it is also a completely
          </p>
          <BlankDropdown id="blank5" value={selections.blank5} />
          <p className="inline">marine ecosystem.</p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-8">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
          <File size={22} className="text-gray-400 dark:text-slate-500" /> Save
          & Exit
        </button>

        <Link to={"/pte-examination-reading/mcq-question"}>
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FillinBlank;
