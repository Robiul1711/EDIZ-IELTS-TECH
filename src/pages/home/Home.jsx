import AdsSection from "@/components/homeComponents/AdsSection";
import Banner from "@/components/homeComponents/Banner";
import FaqSection from "@/components/homeComponents/FaqSection";
import HowItWorks from "@/components/homeComponents/HowItWorks";
import PricingSection from "@/components/homeComponents/PricingSection";
import StatsSection from "@/components/homeComponents/StatsSection";
import StepExam from "@/components/homeComponents/StepExam";
import TestimonialSection from "@/components/homeComponents/TestimonialSection";

import WelcomeBanner from "@/components/homeComponents/WelcomeBanner";
import React from "react";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <Banner />
      <TestimonialSection />
      <StepExam />
      <StatsSection />
      <HowItWorks />
      <AdsSection />
      <PricingSection />
      <FaqSection />
      <WelcomeBanner />
    </div>
  );
};

export default Home;
