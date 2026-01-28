import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaPlus } from "react-icons/fa6";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const FaqSection = () => {
  const accordingData = [
    {
      title: "What is the purpose of wireframing in design?",
      description:
        "Wireframing outlines the basic structure and layout of a design, serving as a visual guide before detailed development. It helps stakeholders focus on functionality before getting distracted by visual aesthetics.",
    },
    {
      title: "Why is user-centered design important?",
      description:
        "User-centered design ensures products meet the needs and preferences of the end-users, enhancing usability and satisfaction. It reduces development costs by fixing issues early in the design process.",
    },
    {
      title: "What role does contrast play in graphic design?",
      description:
        "Contrast in graphic design emphasizes differences, making elements stand out and improving visual hierarchy. It guides the user's eye to the most important information on the page.",
    },
    {
      title: 'Define the term "responsive design" in web development.',
      description:
        "Responsive design ensures web pages adapt to various screen sizes, providing an optimal user experience on different devices, from desktop monitors to mobile phones.",
    },
    {
      title: "What is the significance of color theory in design?",
      description:
        "Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs that align with brand identity.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  const handleToggle = (index) =>
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Starts animation when top of section hits 90% of viewport
          end: "bottom 50%",
          toggleActions: "play none none none", // Play once and keep it visible
        },
      });

      // Animate Header (Title & Text)
      tl.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
      // Animate FAQ Items
      .from(
        ".faq-item",
        {
          y: 10,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all" // Removes inline styles after animation to prevent conflicts
        },
        "-=0.4"
      );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="w-full px-4">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header Section */}
        <div ref={headerRef} className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked <span>Questions</span>
          </h1>
          <p className=" dark:text-gray-400 text-lg">
            Everything you need to know about our design philosophy and process.
          </p>
        </div>

        {/* Accordion List */}
        <div className="flex flex-col gap-4">
          {accordingData.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                onClick={() => handleToggle(index)}
                // Added 'faq-item' class here for GSAP target
                className={`faq-item group border rounded-2xl p-1 bg-white dark:bg-slate-800 transition-all duration-300 cursor-pointer 
                  ${
                    isActive
                      ? "border-blue-500 shadow-md ring-1 ring-blue-500/20"
                      : "border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-500 hover:shadow-sm"
                  }`}
              >
                <div className="p-5">
                  <div className="flex justify-between items-center gap-4">
                    <h2
                      className={`font-semibold text-lg md:text-xl transition-colors duration-300 ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                      }`}
                    >
                      {item.title}
                    </h2>

                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 shrink-0
                      ${
                        isActive
                          ? "bg-custom rotate-45"
                          : "bg-gray-100 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-slate-600"
                      }`}
                    >
                      <FaPlus
                        className={`text-sm transition-colors duration-300 
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-blue-600"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Grid Animation for Accordion Content */}
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                      isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-dashed border-gray-200 dark:border-slate-700 mt-4">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;