import { ImageAssets } from "@/lib/ImageProvider";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null); // Renamed for clarity
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

      tl.from(videoRef.current, {
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
      <div className="container mx-auto"> {/* Added container for better alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
{/* LEFT SIDE: YouTube Video (No Autoplay) */}
<div
  ref={videoRef}
  className="lg:col-span-7 rounded-2xl shadow-xl overflow-hidden bg-black flex items-center justify-center"
>
  <div className="w-full h-full aspect-video">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/LDUPq10xYLE?si=5IjUAqrQ_4aPgF5X"  
      title="How it works video"
      frameBorder="0"
      allow="encrypted-media; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
</div>


          {/* RIGHT SIDE: Content Card */}
          <div
            ref={contentRef}
            className="lg:col-span-5 bg-gradient-to-b from-[#604CDF] to-[#884BBE] rounded-[32px] p-8 md:p-14 flex flex-col justify-center items-start shadow-xl text-left relative overflow-hidden"
          >
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