import React from "react";
import ReadingLogo from "@/assets/images/R.png";
import ListeningLogo from "@/assets/images/L.png";
import WritingLogo from "@/assets/images/W.png";
import SpeakingLogo from "@/assets/images/S.png";

const TestSection = () => {
  const sections = [
    { title: "Section Test - IELTS", key: "ielts" },
    { title: "Section Test - PTE", key: "pte" },
  ];

  const testCards = [
    {
      label: "Reading",
      icon: ReadingLogo,
      bgColor: "bg-[#B4A7FF]",
      textColor: "text-[#4A3AFF]",
    },
    {
      label: "Listening",
      icon: ListeningLogo,
      bgColor: "bg-[#FFC978]",
      textColor: "text-[#92400E]",
    },
    {
      label: "Writing",
      icon: WritingLogo,
      bgColor: "bg-[#D9F481]",
      textColor: "text-[#3F6212]",
    },
    {
      label: "Speaking",
      icon: SpeakingLogo,
      bgColor: "bg-[#C4F2F1]",
      textColor: "text-[#155E75]",
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full">
      {sections.map((section) => (
        <div
          key={section.key}
          className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-[2.5rem] p-6 md:p-10 border border-white dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-base font-bold text-slate-800 dark:text-white mb-8 uppercase tracking-widest">
            {section.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 xlg:grid-cols-4 gap-6">
            {testCards.map((card, index) => (
              <div
                key={index}
                className={`${card.bgColor} rounded-[2rem] p-8 flex flex-col min-h-[220px] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group`}
              >
                <h4
                  className={`${card.textColor} text-2xl font-black tracking-tighter relative z-10`}
                >
                  {card.label}
                </h4>

                <div className="absolute -bottom-2 -right-2 w-32 h-32 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <img
                    src={card.icon}
                    alt={card.label}
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestSection;
