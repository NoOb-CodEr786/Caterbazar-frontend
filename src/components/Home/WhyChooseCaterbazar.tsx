import React from "react";
import { CheckCircle, MessageCircle, DollarSign } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Verified Vendors",
    description: "Only trusted and background-checked caterers onboarded.",
    link: "Learn more",
  },
  {
    icon: MessageCircle,
    title: "Direct WhatsApp Enquiry",
    description: "Chat instantly — no middleman, no waiting.",
    link: "Learn more",
  },
  {
    icon: DollarSign,
    title: "Budget-Friendly Options",
    description: "Compare packages and pick what fits your budget.",
    link: "Learn more",
  },
];

export default function WhyChooseCaterbazar() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Why Choose Caterbazar
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Fast discovery, verified vendors, and pricing that fits.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 shadow-md hover:shadow-xl transition-shadow text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-orange-500 text-orange-500 mb-4 sm:mb-5 lg:mb-6">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  {feature.description}
                </p>

                {/* Link */}
                <button className="text-orange-500 hover:text-orange-600 font-semibold text-xs sm:text-sm transition-colors">
                  {feature.link}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
