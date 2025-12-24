import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import TestDashboard from "./TestDashboard";

const StepExam = () => {
  const containerRef = React.useRef(null);
  const headerRef = React.useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(headerRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="section-padding-x section-padding-y">
      {/* Header Section */}
      <div ref={headerRef} className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4  max-w-4xl mx-auto">
          Step Into the Exam Fully Ready EDIZIT Has You Covered
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Practice in an Environment That Feels Real
        </p>
      </div>
      <TestDashboard />
    </div>
  );
};

export default StepExam;
