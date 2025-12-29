import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 1. Import ScrollTrigger
import { ImageAssets } from "@/lib/ImageProvider";
import { Link } from "react-router-dom";

// 2. Register Plugin
gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const containerRef = useRef(null);
  const iconsRef = useRef(null);
  const bannerImageRef = useRef(null);
  const textContentRef = useRef(null);

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
    <div ref={containerRef} className="section-padding-x section-padding-y">
      <div ref={iconsRef} className="flex justify-center gap-20 flex-wrap">
        <Link to="/ielts" className="flex items-center gap-3 group">
          <img
            src={ImageAssets.I}
            className="w-16 group-hover:rotate-12 duration-300"
            alt="IELTS"
          />
          <p className="text-4xl font-bold">IELTS</p>
        </Link>
        <div className="flex items-center gap-3 group">
          <img
            src={ImageAssets.P}
            className="w-16 group-hover:rotate-12 duration-300"
            alt="PTE"
          />
          <p className="text-4xl font-bold">PTE</p>
        </div>
        <div className="flex items-center gap-3 group">
          <img
            src={ImageAssets.C}
            className="w-16 group-hover:rotate-12 duration-300"
            alt="Classroom"
          />
          <p className="text-4xl font-bold">CLASSROOM</p>
        </div>
      </div>

      <div className="mt-10">
        <div
          ref={bannerImageRef}
          className="bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden shadow-xl"
          style={{ backgroundImage: `url(${ImageAssets.banner})` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 justify-between py-20 md:py-32 px-8">
            <div className="hidden md:block"></div>
            
            {/* 4. Wrapped EVERYTHING (Text + Button) inside textContentRef */}
              <div>
            <div ref={textContentRef} className="flex flex-col items-start">
              <p className="text-lg mb-2 text-white font-bold tracking-wide uppercase opacity-90">
                Get ready in advance
              </p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                Get yourself prepared ahead of time by taking 2026 free mock tests
              </h2>

              </div>
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-lg">
                Get free mock test
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;