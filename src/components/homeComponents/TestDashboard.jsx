import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestCard = ({ title, count, colorClass, imagePlaceholder }) => {
  return (
    <div
      className={`relative ${colorClass} rounded-3xl h-[320px] w-full overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] duration-300 shadow-xl`}
    >
      {/* Ai Badge */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center z-20 border border-white/10">
        <span className="text-white font-medium text-sm">Ai</span>
      </div>

      {/* 3D Avatar Placeholder - Replace 'src' with your actual 3D images */}
      <div className="absolute inset-0 flex items-center justify-center pt-8">
        {/* Using a colored div to simulate the 3D character for now */}
        <div className="w-48 h-48 rounded-full bg-white/10 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <img
          src={imagePlaceholder}
          alt={title}
          className=" object-contain relative z-10 drop-shadow-2xl"
        />
      </div>

      {/* Glassmorphism Label */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-4 text-center z-20 shadow-lg">
        <h3 className="text-white font-bold text-xl tracking-wide">{title}</h3>
        <p className="text-white/90 text-xs mt-1">Test Takers {count}</p>
      </div>
    </div>
  );
};

const SectionHeader = ({ logoText, logoColor }) => (
  <div className="flex items-center gap-4 mb-8">
    <div
      className={`w-12 h-12 bg-custom rounded-xl flex items-center justify-center shadow-md`}
    >
      <span className="text-white font-bold text-xl">{logoText.charAt(0)}</span>
    </div>
    <div className="border-l-2 border-gray-300 pl-4 h-10 flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-none">
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

const TestDashboard = () => {
  // Data for the cards
  const cardsData = [
    {
      title: "READING",
      color: "bg-gradient-to-b from-purple-500 to-purple-700",
      placeholder: ImageAssets.reading, // Replace with Reading Avatar
      count: "65000+",
    },
    {
      title: "WRITING",
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
      placeholder: ImageAssets.writing, // Replace with Writing Avatar
      count: "65000+",
    },
    {
      title: "LISTENING",
      color: "bg-gradient-to-b from-yellow-500 to-yellow-600",
      placeholder: ImageAssets.listening, // Replace with Listening Avatar
      count: "65000+",
    },
    {
      title: "SPEAKING",
      color: "bg-gradient-to-b from-rose-500 to-rose-700",
      placeholder: ImageAssets.speaking, // Replace with Speaking Avatar
      count: "65000+",
    },
    {
      title: "FULL TEST",
      color: "bg-gradient-to-b from-lime-400 to-lime-600",
      placeholder: ImageAssets.mock, // Replace with Mock Test Icon
      count: "65000+",
    },
  ];

  const containerRef = React.useRef(null);

  useGSAP(
    () => {
      // Animate sections
      const sections = containerRef.current.querySelectorAll("section");
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        // Stagger cards within section
        const cards = section.querySelectorAll(".grid > div");
        gsap.from(cards, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className=" relative z-10 space-y-20">
      {/* Section 1: IELTS */}
      <section>
        <SectionHeader logoText="IELTS" logoColor="bg-blue-600" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardsData.map((card, index) => (
            <TestCard
              key={`ielts-${index}`}
              title={card.title}
              count={card.count}
              colorClass={card.color}
              imagePlaceholder={card.placeholder}
            />
          ))}
        </div>
      </section>

      {/* Section 2: PTE */}
      <section>
        <SectionHeader logoText="PTE" logoColor="bg-blue-500" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {cardsData.map((card, index) => (
            <TestCard
              key={`pte-${index}`}
              title={card.title}
              count={card.count}
              colorClass={card.color}
              imagePlaceholder={card.placeholder}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TestDashboard;
