import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const numberRefs = useRef([]);

  const stats = [
    { number: 4000000, label: "Clients trust Hostinger" }, // 4M+
    { number: 150, label: "Countries served" }, // Changed for variety
    { number: 20, label: "Years of experience" }, // Changed for variety
    { number: 10000000, label: "Projects completed" }, // 10M+
  ];

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K+';
    }
    return num.toString() + '+';
  };

  useGSAP(
    () => {

      // Number counting animation
      cardsRef.current.forEach((card, index) => {
        const numberElement = card.querySelector("h3");
        const targetNumber = stats[index].number;
        
        gsap.from(numberElement, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            onEnter: () => {
              animateNumber(numberElement, targetNumber);
            },
          },
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          clearProps: "all",
        });
      });
    },
   
  );

  const animateNumber = (element, target) => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    const end = target;
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      
      // Format the number during animation
      const displayNumber = Math.floor(start);
      element.textContent = formatNumber(displayNumber);
    }, 16);
  };

  return (
    <section  className="bg-[#EFEDFF] dark:bg-gray-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="bg-[#7261EF] rounded-2xl p-8 md:p-10 shadow-lg 
                         hover:shadow-xl transition-all duration-300 
                         transform hover:-translate-y-1"
            >
              <h3 className="text-white text-5xl md:text-6xl font-bold mb-3 tracking-tight">
                {formatNumber(item.number)}
              </h3>
              <p className="text-white/90 text-sm md:text-base font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;