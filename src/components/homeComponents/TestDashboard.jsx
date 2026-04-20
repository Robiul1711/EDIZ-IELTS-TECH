import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TestCard = ({ title, count, colorClass, imagePlaceholder }) => {
  return (
    <div
      className={`relative  rounded-3xl h-[200px] sm:h-[260px] xl:h-[400px] w-full overflow-hidden group cursor-pointer transition-transform hover:scale-[1.02] duration-300 shadow-xl`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-30"></div>
      {/* Ai Badge */}
      <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center z-20 border border-white/10 group-hover:scale-110 transition-transform duration-300">
        <span className="text-white font-medium text-sm">Ai</span>
      </div>

      {/* 3D Avatar Placeholder - Replace 'src' with your actual 3D images */}
      <div className="absolute inset-0 flex justify-center ">
        {/* Using a colored div to simulate the 3D character for now */}
        {/* <div className="w-48 h-48 rounded-full bg-white/10 blur-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div> */}
        <img
          src={imagePlaceholder}
          alt={title}
          className=" object-fill relative z-10 drop-shadow-2xl w-full  hover:scale-110 transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Glassmorphism Label */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/30 backdrop-blur-md border border-white/30 rounded-2xl p-2 sm:p-4 text-center z-20 shadow-lg">
        <h3 className="text-white font-bold sm:text-xl tracking-wide uppercase">
          {title}
        </h3>
        <p className="text-white/90 text-xs mt-1">Test Takers {count}</p>
      </div>
    </div>
  );
};

const SectionHeader = ({ logoText, logoColor }) => (
  <div className="flex items-center justify-center gap-4 mb-8 sm:gap-6">
    {/* Icon Container: Removed fixed w-12/h-12 so it can grow with the content */}
    <div className="  flex items-center justify-center  group">
      <div className="flex items-center gap-3 md:gap-4">
        {logoText === "IELTS" ? (
          <img
            src={ImageAssets.I}
            className="w-10 sm:w-12 md:w-16 lg:w-20 transition-transform duration-300 group-hover:rotate-12"
            alt="IELTS"
          />
        ) : (
          <img
            src={ImageAssets.P}
            className="w-10 sm:w-12 md:w-16 lg:w-20 transition-transform duration-300 group-hover:rotate-12"
            alt="PTE"
          />
        )}
        <span className="text-xl sm:text-2xl md:text-5xl font-black tracking-tight">
          {logoText === "PTE" ? "PTE" : logoText}
        </span>
      </div>
    </div>
    <div className="border-l-4 border-Primary dark:border-Primary  lg:h-12 h-8 sm:h-10 flex flex-col justify-center group-hover:border-Primary transition-colors duration-300"></div>
    {/* Text Content */}
    <div className="flex flex-col justify-center gap-1">
      <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold  dark:text-white tracking-widest uppercase">
        Top 5 Most Taken Tests
      </span>
      <span className="text-xs sm:text-sm lg:text-base xl:text-lg font-bold ">
        TAKE YOUR TEST NOW
      </span>
    </div>
  </div>
);

const TestDashboard = () => {
  // Data for the cards
  const IELTS = [
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
  const PTE = [
    {
      title: "Reading & Writing",
      color: "bg-gradient-to-b from-orange-400 to-orange-600",
      placeholder: ImageAssets.ptereadandwrite, // Replace with Writing Avatar
      count: "65000+",
    },
    {
      title: "SPEAKING",
      color: "bg-gradient-to-b from-purple-500 to-purple-700",
      placeholder: ImageAssets.ptespeak, // Replace with Reading Avatar
      count: "65000+",
    },
    {
      title: "LISTENING",
      color: "bg-gradient-to-b from-yellow-500 to-yellow-600",
      placeholder: ImageAssets.ptelisten, // Replace with Listening Avatar
      count: "65000+",
    },
    // {
    //   title: "SPEAKING",
    //   color: "bg-gradient-to-b from-rose-500 to-rose-700",
    //   placeholder: ImageAssets.speaking, // Replace with Speaking Avatar
    //   count: "65000+",
    // },
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
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className=" relative z-10 space-y-20 md:space-y-30">
      {/* Section 1: IELTS */}
      <section>
        <SectionHeader logoText="IELTS" logoColor="bg-blue-600" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-6">
          {IELTS?.map((card, index) => (
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-20 xl:gap-22">
          {PTE?.map((card, index) => (
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
