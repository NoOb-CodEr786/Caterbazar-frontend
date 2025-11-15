"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CaterBazarLogin() {
  const [activeTab, setActiveTab] = useState("customer");
  const router = useRouter();


  return (
    <div className="min-h-screen flex bg-gray-50 p-2 sm:p-3">
      {/* Left Side - Image and Testimonial */}
      <div
        className="hidden lg:flex lg:w-1/2 relative bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-end p-8 xl:p-12 text-white">
          <div className="max-w-md">
            <div className="text-5xl xl:text-6xl mb-4 xl:mb-6">"</div>
            <p className="text-xl xl:text-2xl font-light mb-4 xl:mb-6 leading-relaxed">
              CatererBazar made my event planning a breeze! I found the perfect
              caterer in no time. Highly recommended!
            </p>
            <div>
              <p className="font-semibold text-base xl:text-lg">Priya Sharma</p>
              <p className="text-gray-300 text-sm xl:text-base">Event Organizer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg">
          {/* Logo */}
          <div className="mb-6 sm:mb-8">
            <img
              src="/images/logo.png"
              alt="Caterbazar Logo"
              className="h-12 sm:h-16 lg:h-20 w-auto mb-1"
            />
          </div>

          {/* Welcome Text */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-sm sm:text-base text-gray-600">Sign in to your CaterBazar account</p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
            <button
              onClick={() => {
                setActiveTab("customer");
                router.push("/auth/customer/signin");
              }}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium transition-all border-2 flex items-center justify-center text-sm sm:text-base ${
                activeTab === "customer"
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  : "bg-white text-gray-800 border-gray-300 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              <span>Sign in as Customer</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("vendor");
                router.push("/auth/vendor/signin");
              }}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium transition-all border-2 flex items-center justify-center text-sm sm:text-base ${
                activeTab === "vendor"
                  ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
                  : "bg-white text-gray-800 border-gray-300 hover:border-orange-500 hover:text-orange-500"
              }`}
            >
              <span>Sign in as Vendor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
