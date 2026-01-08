import React, { useState } from "react";
import { File, Move } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";

const FillinBlank2 = () => {
  const initialWords = [
    "Razed",
    "Defined",
    "Throughout",
    "Alongside",
    "Replaced",
    "Depended",
  ];
  const [availableWords, setAvailableWords] = useState(initialWords);
  const [blanks, setBlanks] = useState({
    blank1: null,
    blank2: null,
    blank3: null,
  });

  const onDragStart = (e, word, fromBlank = "") => {
    e.dataTransfer.setData("word", word);
    e.dataTransfer.setData("fromBlank", fromBlank);
  };

  const onDropToBlank = (e, blankId) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("word");
    const fromBlank = e.dataTransfer.getData("fromBlank");

    // Check if the word is already in this blank
    if (blanks[blankId] === word) return;

    if (fromBlank && fromBlank !== "") {
      // Moving from one blank to another
      const oldWordAtTarget = blanks[blankId];
      setBlanks((prev) => ({
        ...prev,
        [fromBlank]: oldWordAtTarget,
        [blankId]: word,
      }));
    } else {
      // Moving from word bank to blank
      const oldWordAtTarget = blanks[blankId];
      setBlanks((prev) => ({ ...prev, [blankId]: word }));

      setAvailableWords((prev) => {
        const refreshed = prev.filter((w) => w !== word);
        return oldWordAtTarget ? [...refreshed, oldWordAtTarget] : refreshed;
      });
    }
  };

  const onDropToBank = (e) => {
    e.preventDefault();
    const word = e.dataTransfer.getData("word");
    const fromBlank = e.dataTransfer.getData("fromBlank");

    if (fromBlank && fromBlank !== "") {
      setBlanks((prev) => ({ ...prev, [fromBlank]: null }));
      setAvailableWords((prev) => [...prev, word]);
    }
  };

  const allowDrop = (e) => e.preventDefault();

  const Blank = ({ id, value }) => (
    <div
      onDragOver={allowDrop}
      onDrop={(e) => onDropToBlank(e, id)}
      className={`inline-block align-middle mx-1 min-w-[120px] h-9 border-2 border-dashed rounded-lg transition-all duration-200 ${
        value
          ? "border-[#8673FF] bg-[#8673FF]/5 dark:bg-[#8673FF]/10 shadow-sm"
          : "border-gray-200 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50"
      }`}
    >
      {value && (
        <div
          draggable
          onDragStart={(e) => onDragStart(e, value, id)}
          className="flex items-center justify-center w-full h-full text-sm font-semibold text-[#8673FF] cursor-grab active:cursor-grabbing"
        >
          {value}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 py-6 w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
      {/* Page Title */}
      <div className="w-full text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Reading and writing: fill in the blanks
        </h1>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 dark:border-slate-800 w-full overflow-hidden flex flex-col">
        {/* Header Decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#A22BDE] to-[#8673FF]"></div>

        <div className="p-8 md:p-12 space-y-10">
          {/* Instructions */}
          <div className="p-5 bg-gray-50/80 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700">
            <p className="text-gray-700 dark:text-slate-300 font-medium text-sm md:text-base leading-relaxed">
              In text some words are missing. Drag words from the box below to
              the appropriate place in the text. To undo an answer choice, drag
              the word back to the box below the text.
            </p>
          </div>

          {/* Passage Container */}
          <div className="text-gray-700 dark:text-slate-300 leading-[2.5] text-base">
            <p className="inline">
              Gothic architecture is a style of architecture that spread{" "}
            </p>
            <Blank id="blank1" value={blanks.blank1} />
            <p className="inline">
              {" "}
              Europe from the late 12th century to the 16th century. This
              architectural style emphasised verticality and large, often
              stained glass windows. The design elements that{" "}
            </p>
            <Blank id="blank2" value={blanks.blank2} />
            <p className="inline">
              {" "}
              and supported this style of construction were pointed arches and
              flying buttresses. Earlier Romanesque architecture{" "}
            </p>
            <Blank id="blank3" value={blanks.blank3} />
            <p className="inline">
              {" "}
              on thick stone walls to withstand downward pressure, but the
              arches and flying buttresses of Gothic architecture replaced these
              walls and displaced the weight outward.
            </p>
          </div>
        </div>

        {/* Word Bank Footer */}
        <div
          onDragOver={allowDrop}
          onDrop={onDropToBank}
          className="bg-slate-100/80 dark:bg-slate-800/80 p-8 border-t border-gray-100 dark:border-slate-700 min-h-[140px]"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {availableWords.map((word, index) => (
              <div
                key={index}
                draggable
                onDragStart={(e) => onDragStart(e, word)}
                className="group flex items-center gap-2 bg-white dark:bg-slate-700 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-slate-600 shadow-sm cursor-grab active:cursor-grabbing hover:border-[#8673FF] hover:shadow-md transition-all duration-200"
              >
                <Move
                  size={14}
                  className="text-gray-400 dark:text-slate-500 group-hover:text-[#8673FF]"
                />
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-200 group-hover:text-[#8673FF]">
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col-reverse md:flex-row gap-6 w-full md:w-auto mt-8">
        <button className="bg-[#0F172A] dark:bg-slate-800 text-white w-full md:w-auto px-10 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
          <File size={22} className="text-gray-400 dark:text-slate-500" /> Save
          & Exit
        </button>

        <Link to={"/pte-examination-reading/reorder-paragraphs"}>
          <button className="bg-gradient-to-r from-[#A22BDE] to-[#8673FF] text-white w-full md:w-auto px-16 py-4 text-lg shadow-xl rounded-2xl font-semibold flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:shadow-2xl active:scale-95">
            Next <MdDoubleArrow size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FillinBlank2;
