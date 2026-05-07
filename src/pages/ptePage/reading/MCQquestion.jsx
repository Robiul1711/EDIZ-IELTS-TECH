import React, { useState } from "react";
import { File, Check } from "lucide-react";
import { MdDoubleArrow } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

const MCQquestion = () => {
  const [selectedAnswers, setSelectedAnswers] = useState([]);
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
    {
      id: "E",
      text: "The El Castillo ramid ma soon collapse into a cave beneath it.",
    },
  ];

  const toggleAnswer = (id) => {
    setSelectedAnswers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10  md:py-8  w-full max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 font-poppins">
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
              central pyramid El Castillo using tri-dimensional electric
              resistivity tomography (ERT-3D). This technology works by
              inserting metal probes into the ground and sending electrical
              pulses through it. Soil, stone, air and water all resist
              electricity to different degrees, with water being very conductive
              and empty air being highly resistant, meaning electricity passes
              through the former easily and the latter hardly at all. The
              signals that the probes received allowed scientists to create a
              three-dimensional image of what lies concealed beneath the ground.
            </p>
            <p>
              Underneath the pyramid, they discovered an irregular empty space
              that was partially filled with water and was 25 metres by 35
              metres and up to 20 metres deep. This kind of rock formation is
              called a cenote when they are open to the surface, and they were
              very important to the Maya. They were one of the society's main
              sources of fresh water, and they were an integral part of their
              religious beliefs. This cenote is covered by four metres of
              limestone that is constantly being worn thinner by erosion, but it
              may already have an as yet unknown connection to the surface.
            </p>
            <p>
              Later, the researchers placed their ERT-3D sensors on the pyramid
              itself to see what else they could learn. Excavations in the 1940s
              had revealed that the 30-metre pyramid was actually a shell built
              over an older 20-metre pyramid, and the scans showed that there
              was a third 10-metre pyramid inside the middle structure. Now,
              scientists plan to excavate tunnels that the Maya constructed and
              later filled in that may have connected the many temples of the
              city to each other and its cenotes.
            </p>
          </div>
        </div>

        {/* Right Column: Question & Options */}
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl md:rounded-[2.5rem] shadow-xl md:shadow-2xl border border-gray-100 dark:border-slate-800 p-6 md:p-10 h-full ring-1 ring-black/5 dark:ring-white/5 transition-all duration-300">
            <h2 className="text-slate-800 dark:text-white font-bold text-lg md:text-2xl mb-8 md:mb-10 leading-snug">
              According to the text, which statements are true about the Chichen
              Itza site?
            </h2>

            <div className="space-y-3 md:space-y-4">
              {options.map((option) => {
                const isSelected = selectedAnswers.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleAnswer(option.id)}
                    className={`w-full group text-left flex items-start gap-4 p-4 md:p-5 rounded-2xl border transition-all duration-300 ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-500 shadow-md translate-x-1"
                        : "bg-white dark:bg-slate-800/50 border-gray-100 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-800"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-6 h-6 mt-0.5 rounded flex items-center justify-center border-2 transition-all duration-300 ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                          : "bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-indigo-400"
                      }`}
                    >
                      {isSelected && (
                        <Check
                          size={16}
                          className="text-white fill-current stroke-[3px]"
                        />
                      )}
                    </div>

                    <div className="flex items-start gap-3">
                      <span
                        className={`font-bold text-base md:text-lg transition-colors ${
                          isSelected
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-gray-400 dark:text-slate-500"
                        }`}
                      >
                        {option.id})
                      </span>
                      <span
                        className={`text-sm md:text-base font-medium leading-relaxed transition-colors ${
                          isSelected
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
          to={`/${isDashboard ? "dashboard" : "pte-examination-reading"}/fill-in-blanks-2`}
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

export default MCQquestion;
