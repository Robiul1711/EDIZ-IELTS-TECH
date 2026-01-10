import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { ImageAssets } from "@/lib/ImageProvider";
import { Link } from "react-router-dom";
import { ChatBot } from "../svg/AllSVG";
import ChatBox from "./ChatBox";

// 2. Register Plugin
gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef(null);
  const bannerImageRef = useRef(null);
  const textContentRef = useRef(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        // 3. Add ScrollTrigger here so animation waits until visible
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Starts when top of section hits 80% of viewport
          toggleActions: "play none none reverse",
        },
      });

      // Animate icons (IELTS, PTE, etc.)
      tl.from(iconsRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)", // Added a nice bounce effect
      });

      // Animate banner image container
      tl.from(
        bannerImageRef.current,
        {
          scale: 0.95,
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Animate text content (Title + Description + BUTTON)
      tl.from(
        textContentRef.current.children,
        {
          x: 30, // Changed to x for a slide-in effect from right
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.6"
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="section-padding-x section-padding-y mb-10 sm:mb-0">
      <div
        ref={iconsRef}
        className="flex justify-center gap-8 sm:gap-10 lg:gap-20 flex-wrap"
      >
        <Link to="/ielts" className="flex items-center gap-2 md:gap-3 group">
          <img
            src={ImageAssets.I}
            className="w-8 sm:w-12 md:w-20 group-hover:rotate-12 duration-300"
            alt="IELTS"
          />
          <p className=" sm:text-2xl md:text-5xl font-bold">IELTS</p>
        </Link>
        <Link to={"/pte"} className="flex items-center gap-2 md:gap-3 group">
          <img
            src={ImageAssets.P}
            className="w-8 sm:w-12 md:w-20 group-hover:rotate-12 duration-300"
            alt="PTE"
          />
          <p className=" sm:text-2xl md:text-5xl font-bold">PTE</p>
        </Link>
        <Link
          to="/classroom"
          className="flex items-center gap-2 md:gap-3 group"
        >
          <img
            src={ImageAssets.C}
            className="w-8 sm:w-12 md:w-20 group-hover:rotate-12 duration-300"
            alt="Classroom"
          />
          <p className=" sm:text-2xl md:text-5xl font-bold">CLASSROOM</p>
        </Link>
      </div>

      <div className="mt-10 relative">
        <div
          ref={bannerImageRef}
          className="bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden shadow-xl"
          style={{ backgroundImage: `url(${ImageAssets.banner})` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between py-12 px-6 md:py-20 md:px-8 lg:py-32">
            <div className="hidden md:block"></div>

            {/* 4. Wrapped EVERYTHING (Text + Button) inside textContentRef */}
            <div>
              <div ref={textContentRef} className="flex flex-col items-start">
                <p className="text-lg mb-2 text-white font-bold tracking-wide uppercase opacity-90">
                  Get ready in advance
                </p>
                <h2 className="text-white  sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-6 md:mb-8 leading-snug md:leading-tight">
                  Get yourself prepared ahead of time by taking 2026 free mock
                  tests
                </h2>
              </div>
              <Link to="/student-dashboard" className="bg-white text-purple-600 px-8 py-3 sm:py-4 rounded-xl font-bold text-lg hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-lg">
                Get free mock test
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-4  md:-bottom-14 md:right-0 z-10 flex flex-col items-end gap-4">
          {isChatOpen && (
            <div className="mb-2">
              <ChatBox onClose={() => setIsChatOpen(false)} />
            </div>
          )}

          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="p-2 rounded-full bg-[#604CDF] shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <ChatBot />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
