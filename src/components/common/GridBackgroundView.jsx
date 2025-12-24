"use client";

import React, { useState, useEffect } from "react";

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseMove = event => {
      const {
        clientX,
        clientY
      } = event;
      const x = clientX - window.innerWidth / 2;
      const y = clientY - window.innerHeight / 2;
      setMousePosition({
        x,
        y
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden transition-transform duration-300 ease-out" 
      style={{

        backgroundImage: `
          linear-gradient(to right, #f2f3f5 1px, transparent 1px),
          linear-gradient(to bottom, #f2f3f5 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        animation: "moveGrid 20s linear infinite",
        transform: `translate(${mousePosition.x / 30}px, ${mousePosition.y / 30}px)`
      }}
    >
 
      
     
    </div>
  );
};

export default function GridBackgroundView() {
  /* UPDATED: Changed bg-slate-950 to bg-white */
  return (
    <div className="relative w-full h-screen ">
            <div className="w-[871px] h-[871px] bg-[#C371EF] rounded-[871px] opacity-[0.37] blur-[403px] absolute top-[-40%] left-[-30%] "></div>
          <div className="w-[871px] h-[871px] bg-[#C371EF] rounded-[871px] opacity-[0.37] blur-[403px] absolute top-[-40%] right-[-30%] "></div> 
      <GridBackground />
    </div>
  );
}