import React, { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("IELTS");

  // Pricing Data Structure
  const pricingData = {
    IELTS: [
      {
        title: "Free",
        subtitle: "Google ads",
        price: "0.00",
        originalPrice: null,
        description: "Begin your IELTS journey",
        features: [
          "Foundation of all four modules",
          "Grammar + Vocabulary essentials",
          "Listening & Reading practice sets",
          "Weekly study tracking",
          "Access to basic lesson library",
          "Email support",
        ],
        buttonText: "Start now",
        isPopular: false,
      },
      {
        title: "Standard",
        subtitle: "Billed Monthly",
        price: "2,900",
        originalPrice: null,
        description: "Boost your score with full guidance",
        features: [
          "All Starter features",
          "Complete Writing Task 1 & 2 training",
          "Daily Speaking questions & tips",
          "Band-wise strategies & templates",
          "Full-length mock tests",
          "Instructor feedback twice a week",
        ],
        buttonText: "Get best value",
        isPopular: true, // This triggers the purple card design
      },
      {
        title: "Premium",
        subtitle: "Billed Monthly",
        price: "1,000",
        originalPrice: "3,900",
        description: "Target your exact band score",
        features: [
          "1-on-1 Speaking sessions",
          "Advanced Writing correction",
          "Band 7+ strategies",
          "Custom study plan",
          "Topic-wise intensive practice",
          "Priority instructor access",
        ],
        buttonText: "Build your plan",
        isPopular: false,
      },
    ],
    // Placeholder data for PTE to demonstrate the switch
    PTE: [
      {
        title: "PTE Starter",
        subtitle: "Basic Access",
        price: "0.00",
        originalPrice: null,
        description: "Start your PTE preparation",
        features: [
          "Intro to Speaking & Writing",
          "Basic Reading materials",
          "Limited Mock Tests",
          "Community Support",
        ],
        buttonText: "Start Free",
        isPopular: false,
      },
      {
        title: "PTE Pro",
        subtitle: "Billed Monthly",
        price: "3,500",
        originalPrice: null,
        description: "Everything you need to pass",
        features: [
          "Full AI Scoring",
          "Unlimited Mock Tests",
          "Speaking Templates",
          "Writing Correction",
        ],
        buttonText: "Go Pro",
        isPopular: true,
      },
      {
        title: "PTE Elite",
        subtitle: "Billed Monthly",
        price: "5,000",
        originalPrice: "6,500",
        description: "Guaranteed Results",
        features: [
          "1-on-1 Coaching",
          "Personalized Study Plan",
          "Exam Booking Assistance",
          "Priority Support",
        ],
        buttonText: "Get Elite",
        isPopular: false,
      },
    ],
  };

  const currentPlans = pricingData[activeTab];

  const containerRef = React.useRef(null);
  const headerRef = React.useRef(null);
  const cardsRef = React.useRef(null);

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
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  // Animate cards when tab changes or on initial scroll
  useGSAP(
    () => {
      gsap.from(cardsRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef, dependencies: [activeTab] }
  );

  return (
    <section id="pricing"
      ref={containerRef}
      className="bg-[#F3F0FF]/80 dark:bg-[#1A1A1A]/80  section-padding-x my-20 "
    >
      <div className="section-padding-y ">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 max-w-5xl mx-auto">
            Transparent pricing, built for every {activeTab} learner
          </h2>
          <p className="text-[#5D5D75]  max-w-2xl mx-auto">
            Flexible plans tailored to your goals clear, simple, and
            result-focused.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 flex justify-center">
            <div className="bg-white dark:bg-gray-800 p-1 rounded-xl inline-flex shadow-sm ">
              {["IELTS", "PTE"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-800 text-[#7B5BF2] shadow-md border  border-gray-100 transform scale-105"
                      : "text-gray-500 hover:text-[#7B5BF2]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
        >
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative ${plan.isPopular ? "-mt-4 md:-mt-8" : ""}`}
            >
              {/* Standard (Popular) Card Wrapper */}
              {plan.isPopular ? (
                <div className="bg-gradient-to-b from-[#9F5BF2] to-[#7B5BF2] rounded-[32px] p-1 pb-1 shadow-2xl transform transition-transform duration-300 hover:scale-[1.01]">
                  <div className="text-center text-white font-semibold text-sm py-3 tracking-wide">
                    BEST VALUE TO PRICE
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-[28px] p-8 h-full">
                    <PricingContent plan={plan} isPopular={true} />
                  </div>
                </div>
              ) : (
                /* Normal Card */
                <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 dark:bg-gray-800 h-full transform transition-transform duration-300 hover:-translate-y-1">
                  <PricingContent plan={plan} isPopular={false} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component for inner content to keep code clean
const PricingContent = ({ plan, isPopular }) => (
  <div className="flex flex-col h-full">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#1C1C33] dark:text-white">{plan.title}</h3>
      <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
    </div>

    <div className="mb-6">
      <div className="flex items-baseline gap-2">
        <span className="text-lg italic font-semibold text-gray-500 dark:text-gray-400  ">BDT</span>

        {plan.originalPrice && (
          <span className="text-2xl text-gray-400 line-through decoration-gray-400 dark:decoration-gray-600 decoration-2">
            {plan.originalPrice}
          </span>
        )}

        <span className="text-4xl font-bold text-[#1C1C33] dark:text-white">{plan.price}</span>
        <span className="text-gray-500 text-sm font-medium">/month</span>
      </div>
      <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">{plan.description}</p>
    </div>

    <ul className="space-y-4 mb-8 flex-grow">
      {plan.features.map((feature, i) => (
        <li key={i} className="flex items-start gap-3">
          <FaCheckCircle className="text-[#604CDF] text-xl shrink-0 mt-0.5" />
          <span className="text-[#5D5D75] dark:text-white text-sm leading-relaxed">
            {feature}
          </span>
        </li>
      ))}
    </ul>

    <button
      className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
        isPopular
          ? "bg-[#604CDF] text-white hover:bg-[#4c3cb5] shadow-lg shadow-purple-200"
          : "bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-Primary text-[#604CDF] border border-[#604CDF]/30 hover:bg-[#604CDF] hover:text-white"
      }`}
    >
      {plan.buttonText}
      <FaArrowRight className="text-sm" />
    </button>
  </div>
);

export default PricingSection;
