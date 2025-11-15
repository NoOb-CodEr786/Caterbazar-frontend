import React from "react";
import HeroSection from "@/components/Home/HeroSection";
import CaterersSection from "@/components/Home/CaterersSection";
import TopRatedCaterers from "@/components/Home/TopRatedCaterers";
import WhyChooseCaterbazar from "@/components/Home/WhyChooseCaterbazar";
import TrustSection from "@/components/Home/TrustSection";
import CateringProfessionalCTA from "@/components/Home/CateringProfessionalCTA";


const page = () => {
  return (
    <div>
      <HeroSection />
      <CaterersSection />
      <TopRatedCaterers />
      <WhyChooseCaterbazar />
      <TrustSection />
      <CateringProfessionalCTA />
    </div>
  );
};

export default page;
