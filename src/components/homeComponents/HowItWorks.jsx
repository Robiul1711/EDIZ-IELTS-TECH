import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const containerRef = React.useRef(null);
  const imageRef = React.useRef(null);
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

      tl.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }).from(
        contentRef.current,
        {
          x: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="section-padding-x section-padding-y flex items-center justify-center"
    >
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT SIDE: UI Mockup */}
          <div
            ref={imageRef}
            className="lg:col-span-7 rounded-2xl shadow-xl overflow-hidden"
          >
            <img
              src={ImageAssets.howitwork}
              alt="How It Works Mockup"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* RIGHT SIDE: Content Card */}
          <div
            ref={contentRef}
            className="lg:col-span-5 bg-gradient-to-b from-[#604CDF] to-[#884BBE] rounded-[32px] p-8 md:p-14 flex flex-col justify-center items-start shadow-xl text-left relative overflow-hidden"
          >
            {/* Background Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="inline-block bg-[#5B4BC4] text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 shadow-inner border border-white/10">
                How it works
              </div>
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-[1.1] tracking-tight">
                Simple Steps to Get Started
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
