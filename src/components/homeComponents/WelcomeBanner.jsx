import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ImageAssets } from "@/lib/ImageProvider";
const WelcomeBanner = () => {
  const containerRef = React.useRef(null);
  const contentRef = React.useRef(null);
  const imageRef = React.useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(contentRef.current.children, {
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }).from(
        imageRef.current,
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
    <section ref={containerRef} className="section-padding-x section-padding-y">
      <div className="bg-[#EDE8FD] dark:bg-[#1C1C33] rounded-xl p-8 md:p-12  flex flex-col md:flex-row items-center justify-between w-full gap-8">
        {/* Left Content */}
        <div ref={contentRef} className="md:w-2/5 mb-8 md:mb-0">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C33] dark:text-white mb-4">
            Welcome Offer For New Students
          </h2>
          <p className="text-[#5D5D75] text-base md:text-lg lg:text-xl mb-8">
            Enroll now to receive 68% savings on your membership and a free mock
            test to elevate your preparation.
          </p>
          <button  onClick={() =>
                  window.scrollTo({
                    top: document.getElementById("pricing").offsetTop,
                    behavior: "smooth",
                  })
                } className="bg-[#1C1C33] dark:bg-[#604CDF] text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-colors">
            JOIN NOW
          </button>
        </div>

        {/* Right Illustration */}
        <div ref={imageRef} className="md:w-1/3 flex justify-center">
          {/* Placeholder for the illustration image. Replace with the actual image path. */}
          <img
            src={ImageAssets.newStudents} // Replace with actual image URL
            alt="Graduate with Bell Illustration"
            className="max-w-full h-auto"
            style={{ maxHeight: "350px" }} // Adjust height as needed
          />
        </div>
      </div>
    </section>
  );
};

export default WelcomeBanner;
