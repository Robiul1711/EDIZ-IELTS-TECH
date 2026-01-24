import { ImageAssets } from "@/lib/ImageProvider";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IeltsTypeSelectionModal from "../modals/IeltsTypeSelectionModal";

const TestCard = ({
  title,
  count,
  colorClass,
  imagePlaceholder,
  link,
  onClick,
}) => {
  const Component = onClick ? "div" : Link;
  const props = onClick ? { onClick } : { to: link };

  return (
    <Component
      {...props}
      className={`relative ${colorClass} rounded-3xl h-[180px] sm:h-[260px] xl:h-[320px] w-full overflow-hidden group cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-white/10`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-30"></div>

      {/* Ai Badge */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center z-20 border border-white/10 group-hover:scale-110 transition-transform duration-300">
        <span className="text-white font-medium text-sm">Ai</span>
      </div>

      {/* 3D Avatar Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        <div className=" rounded-full bg-white/10 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-colors duration-500"></div>
        <img
          src={imagePlaceholder}
          alt={title}
          className="object-cover w-full relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Glassmorphism Label */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-2 sm:p-4 text-center z-20 shadow-lg group-hover:bottom-6 transition-all duration-500">
        <h3 className="text-white font-bold sm:text-xl tracking-wide">
          {title}
        </h3>
        <p className="text-white/90 text-xs mt-1">Test Takers {count}</p>
      </div>
    </Component>
  );
};

const SectionHeader = ({ logoText, logoColor }) => (
  <div className="flex items-center gap-4 mb-8 group cursor-default">
    <div
      className={`w-12 h-12 bg-custom rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
    >
      <span className="text-white font-bold text-xl">{logoText.charAt(0)}</span>
    </div>
    <div className="border-l-2 border-gray-300 dark:border-gray-700 pl-4 h-10 flex flex-col justify-center group-hover:border-Primary transition-colors duration-300">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-none group-hover:text-Primary transition-colors duration-300">
        {logoText}
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs font-bold text-gray-600 dark:text-gray-400 tracking-wider">
          TOP 5 MOST TAKEN TESTS
        </span>
        <span className="text-[10px] text-gray-400">TAKE YOUR TEST NOW</span>
      </div>
    </div>
  </div>
);

const TestSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingLink, setPendingLink] = useState("");

  const handleCardClick = (link) => {
    setPendingLink(link);
    setIsModalOpen(true);
  };

  const handleSelectType = (type) => {
    setIsModalOpen(false);
    if (pendingLink) {
      navigate(`${pendingLink}?type=${type}`);
    }
  };
  // Data for the cards
  const IELTS = [
    {
      title: "READING",
      color: "bg-gradient-to-b from-purple-500 to-purple-700",
      placeholder: ImageAssets.reading, // Replace with Reading Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/reading",
    },
    {
      title: "WRITING",
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
      placeholder: ImageAssets.writing, // Replace with Writing Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/writing",
    },
    {
      title: "LISTENING",
      color: "bg-gradient-to-b from-yellow-500 to-yellow-600",
      placeholder: ImageAssets.listening, // Replace with Listening Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/listening",
    },
    {
      title: "SPEAKING",
      color: "bg-gradient-to-b from-rose-500 to-rose-700",
      placeholder: ImageAssets.speaking, // Replace with Speaking Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/speaking",
    },
  ];
  const PTE = [
    {
      title: "Reading & Writing",
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
      placeholder: ImageAssets.ptereadandwrite, // Replace with Writing Avatar
      count: "65000+",
      link: "/pte/headset-check",
    },
    {
      title: "SPEAKING",
      color: "bg-gradient-to-b from-purple-500 to-purple-700",
      placeholder: ImageAssets.ptespeak, // Replace with Reading Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/speaking",
    },
    {
      title: "LISTENING",
      color: "bg-gradient-to-b from-yellow-500 to-yellow-600",
      placeholder: ImageAssets.ptelisten, // Replace with Listening Avatar
      count: "65000+",
      link: "/student-dashboard/ielts/listening",
    },
  ];

  return (
    <div className=" relative z-10 grid md:grid-cols-2 gap-5 ">
      {/* Section 1: IELTS */}
      <section className="bg-white/20 dark:bg-gray-900 backdrop-blur-md border border-white/30 dark:border-gray-800 rounded-2xl p-2 sm:p-4">
        <SectionHeader logoText="IELTS" logoColor="bg-blue-600" />
        <div className="grid grid-cols-2  gap-3 lg:gap-6">
          {IELTS?.map((card, index) => (
            <TestCard
              key={`ielts-${index}`}
              title={card.title}
              count={card.count}
              colorClass={card.color}
              imagePlaceholder={card.placeholder}
              link={card.link}
              onClick={() => handleCardClick(card.link)}
            />
          ))}
        </div>
      </section>

      {/* Section 2: PTE */}
      <section className="bg-white/20 dark:bg-gray-900 backdrop-blur-md border border-white/30 dark:border-gray-800 rounded-2xl p-2 sm:p-4">
        <SectionHeader logoText="PTE" logoColor="bg-blue-500" />
        <div className="grid grid-cols-2  gap-3 lg:gap-6">
          {PTE?.map((card, index) => (
            <TestCard
              key={`pte-${index}`}
              title={card.title}
              count={card.count}
              colorClass={card.color}
              imagePlaceholder={card.placeholder}
              link={card.link}
            />
          ))}
        </div>
      </section>
      <IeltsTypeSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectType}
      />
    </div>
  );
};

export default TestSection;
