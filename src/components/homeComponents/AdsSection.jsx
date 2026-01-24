import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdsSection = () => {
  const containerRef = React.useRef(null);
  const leftSectionRef = React.useRef(null);
  const rightSectionRef = React.useRef(null);
  const contentRef = React.useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(leftSectionRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      })
        .from(
          rightSectionRef.current,
          {
            x: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          contentRef.current.children,
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.5"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section-padding-x ">
      <div className="flex flex-col md:flex-row    ">
        {/* Left Section - Purple */}
        <div
          ref={leftSectionRef}
          className="bg-[#604CDF] p-8 md:p-12 lg:p-16 md:rounded-l-3xl shadow-sm text-white flex-1 flex flex-col justify-center"
        >
          <div ref={contentRef}>
            <div className="w-12 h-1 bg-white mb-6 rounded-full"></div>
            <p className="text-sm font-semibold tracking-wider mb-2">#Ads</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-8">
              Take your website
              <br />
              to the next level
            </h2>
            <Link to="/auth" className="bg-white text-[#604CDF] font-bold py-3 px-8 rounded-xl inline-flex items-center group w-fit hover:bg-gray-100 transition-colors">
              Get started
              <FaArrowRight className="ml-3 text-lg group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Right Section - Light Purple/Placeholder */}
        <div
          ref={rightSectionRef}
          className="bg-[#F5F3FF] p-8 md:p-12 lg:p-16 flex-1 flex items-center md:rounded-r-3xl shadow-sm justify-center relative min-h-[300px]"
        >
          {/* Placeholder Icon (simulated with svg) */}
          <div className="text-[#604CDF]/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-48 h-48 md:w-64 md:h-64"
            >
              <path
                fillRule="evenodd"
                d="M4.5 12a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-12a1.5 1.5 0 0 1-1.5-1.5v-6ZM5.25 18a.75.75 0 0 0 .75.75h12a.75.75 0 0 0 .75-.75v-6a.75.75 0 0 0-.75-.75h-12a.75.75 0 0 0-.75.75v6Z"
                clipRule="evenodd"
              />
              <path d="M5.625 9.75a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Zm7.5 0a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Zm7.5 0a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Z" />
              <path d="M9.375 6a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Zm7.5 0a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Z" />
              <path d="M13.5 3a.375.375 0 1 1 .75 0 .375.375 0 0 1-.75 0Z" />
            </svg>
          </div>

          {/* IELTS TECH Logo */}
          <div className="absolute bottom-4 right-4 flex items-center">
            <img src={ImageAssets.logo} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdsSection;
