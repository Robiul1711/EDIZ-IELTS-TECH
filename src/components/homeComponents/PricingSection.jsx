import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaCheckCircle, FaArrowRight, FaSpinner } from "react-icons/fa";
import { useApiQuery } from "@/hooks/apiQuery";
import { useApiMutation } from "@/hooks/apiMutation";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const PricingSection = () => {
  const [activeTab, setActiveTab] = useState("IELTS");

  // Fetch plans using useApiQuery
  const { data: plans = [], isLoading: loading } = useApiQuery({
    queryKey: ["pricing-plans", activeTab],
    url: "/plans",
    params: { type: activeTab.toLowerCase() },
    secure: false,
    select: (response) => {
      if (response.success) {
        const apiPlans = response.data[activeTab.toLowerCase()];
        return apiPlans.map((plan, index) => ({
          id: plan.id,
          title: plan.name,
          subtitle:
            plan.price_monthly === "0.00" ? "Free Access" : "Billed Monthly",
          price: parseFloat(plan.price_monthly).toLocaleString(),
          originalPrice:
            plan.price_yearly !== "0.00"
              ? parseFloat(plan.price_yearly / 10).toLocaleString()
              : null,
          description: plan.description,
          features: plan.features
            .map((f) =>
              f.feature_value === "true"
                ? f.feature_label
                : f.feature_value === "false"
                  ? null
                  : `${f.feature_label}: ${f.feature_value}`,
            )
            .filter(Boolean),
          buttonText:
            plan.price_monthly === "0.00" ? "Start Free" : "Subscribe Now",
          isPopular: index === 1,
        }));
      }
      return [];
    },
  });

  const [submittingId, setSubmittingId] = useState(null);

  // Handle subscription using useApiMutation
  const { mutate: subscribe } = useApiMutation({
    url: (id) => `/subscribe/${id}`,
    method: "POST",
    secure: true,
    successMessage: "Redirecting to payment...",
    onSuccess: (data) => {
      if (data.success && data.payment_url) {
        window.location.href = data.payment_url;
      }
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        toast.warning("Please login to subscribe");
      }
    },
    onSettled: () => {
      setSubmittingId(null);
    },
  });

  const handleSubscribe = (planId) => {
    setSubmittingId(planId);
    subscribe(planId);
  };

  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

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
    { scope: containerRef },
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
    { scope: containerRef, dependencies: [activeTab] },
  );

  return (
    <section
      id="pricing"
      ref={containerRef}
      className="  section-padding-x my-20 "
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
            <div className="bg-white dark:bg-gray-800 p-1 gap-3 rounded-xl inline-flex shadow-sm ">
              {["IELTS", "PTE"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-800 text-[#7B5BF2] shadow-md border  border-gray-100"
                      : "text-gray-500 hover:text-[#7B5BF2] border  border-transparent"
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start min-h-[400px]"
        >
          {loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <FaSpinner className="text-4xl text-[#604CDF] animate-spin mb-4" />
              <p className="text-gray-500">Loading plans...</p>
            </div>
          ) : (
            plans.map((plan, index) => (
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
                      <PricingContent
                        plan={plan}
                        isPopular={true}
                        onSubscribe={() => handleSubscribe(plan.id)}
                        isSubscribing={submittingId === plan.id}
                      />
                    </div>
                  </div>
                ) : (
                  /* Normal Card */
                  <div className="bg-white rounded-[32px] p-8 shadow-lg border border-gray-100 dark:border-gray-700  dark:shadow-gray-900 dark:bg-gray-900 h-full transform transition-transform duration-300 hover:-translate-y-1">
                    <PricingContent
                      plan={plan}
                      isPopular={false}
                      onSubscribe={() => handleSubscribe(plan.id)}
                      isSubscribing={submittingId === plan.id}
                    />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

// Sub-component for inner content to keep code clean
const PricingContent = ({ plan, isPopular, onSubscribe, isSubscribing }) => (
  <div className="flex flex-col h-full">
    <div className="mb-6">
      <h3 className="text-xl font-bold text-[#1C1C33] dark:text-white">
        {plan.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">{plan.subtitle}</p>
    </div>

    <div className="mb-6">
      <div className="flex items-baseline gap-2">
        <span className="text-lg italic font-semibold text-gray-500 dark:text-gray-400  ">
          BDT
        </span>

        {plan.originalPrice && (
          <span className="text-2xl text-gray-400 line-through decoration-gray-400 dark:decoration-gray-600 decoration-2">
            {plan.originalPrice}
          </span>
        )}

        <span className="text-4xl font-bold text-[#1C1C33] dark:text-white">
          {plan.price}
        </span>
        <span className="text-gray-500 text-sm font-medium">/month</span>
      </div>
      <p className="text-sm text-gray-500 mt-3 dark:text-gray-400">
        {plan.description}
      </p>
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
      onClick={onSubscribe}
      disabled={isSubscribing}
      className={`w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
        isPopular
          ? "bg-[#604CDF] text-white hover:bg-[#4c3cb5] shadow-lg  dark:shadow-gray-900 shadow-purple-200"
          : "bg-white dark:bg-gray-800 dark:text-white dark:hover:bg-Primary text-[#604CDF] border border-[#604CDF]/30 hover:bg-[#604CDF] hover:text-white"
      } ${isSubscribing ? "opacity-70 cursor-not-allowed" : ""}`}
    >
      {isSubscribing ? (
        <FaSpinner className="animate-spin" />
      ) : (
        <>
          {plan.buttonText}
          <FaArrowRight className="text-sm" />
        </>
      )}
    </button>
  </div>
);

export default PricingSection;
