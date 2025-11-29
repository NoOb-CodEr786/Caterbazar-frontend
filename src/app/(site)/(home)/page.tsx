"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import HeroSection from "@/components/Home/HeroSection";
import CaterersSection from "@/components/Home/CaterersSection";
import TopRatedCaterers from "@/components/Home/TopRatedCaterers";
import WhyChooseCaterbazar from "@/components/Home/WhyChooseCaterbazar";
import TrustSection from "@/components/Home/TrustSection";
import CateringProfessionalCTA from "@/components/Home/CateringProfessionalCTA";

function OAuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const user = searchParams.get("user");

    if (accessToken && refreshToken) {
      // Set cookies
      document.cookie = `accessToken=${accessToken}; path=/; max-age=900; secure; samesite=strict`; // 15 minutes
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=604800; secure; samesite=strict`; // 7 days

      // Store tokens in localStorage (matching regular login behavior)
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Store user data
      if (user) {
        try {
          const userData = JSON.parse(decodeURIComponent(user));
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("userRole", userData.role);
        } catch (error) {
          console.error("Failed to parse user data:", error);
        }
      }

      // Clear the URL params
      router.replace("/", { scroll: false });

      // Trigger auth state update
      window.dispatchEvent(new CustomEvent('authStateChanged'));
    }
  }, [searchParams, router]);

  return null; // This component doesn't render anything
}

const page = () => {
  return (
    <>
      <Suspense fallback={null}>
        <OAuthCallbackHandler />
      </Suspense>
      <HeroSection />
      <CaterersSection />
      <TopRatedCaterers />
      <WhyChooseCaterbazar />
      <TrustSection />
      <CateringProfessionalCTA />
    </>
  );
};

export default page;
