import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rhea Kapoor",
    role: "Verified Host",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial:
      "Caterbazar helped us book the perfect wedding caterer — the food was incredible, the service punctual, and our guests couldn't stop complimenting the menu. Stress-free planning!",
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Event Planner",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial:
      "Transparent pricing and quick vendor replies saved us hours. We compared menus, scheduled a tasting, and confirmed the caterer all within a week.",
  },
  {
    id: 3,
    name: "Neha Rao",
    role: "Birthday Host",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    testimonial:
      "I needed a pure-veg menu at short notice — Green Bowl Caterers delivered beautifully. Friendly team, neat presentation, and everyone loved the food.",
  },
];

const ratings = [
  { text: "Rated 5 Stars in Customer Reviews", stars: 5 },
  { text: "Recommended by Event Planners", stars: 5 },
  { text: "Top Rated on Event Guides", stars: 5 },
];

export default function TrustSection() {
  return (
    <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Top Section - Trust Info and Ratings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-10 lg:mb-12">
          {/* Left Side - Trust Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              10,000+ hosts trust{" "}
              <span className="italic text-orange-500 font-serif">Caterbazar</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              We connect you with verified caterers who deliver great food and
              flawless service. Read real stories from hosts who planned
              memorable events with Caterbazar.
            </p>
          </div>

          {/* Right Side - Rating Badges */}
          <div className="space-y-3 sm:space-y-4">
            {ratings.map((rating, index) => (
              <div
                key={index}
                className="bg-orange-50 rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
              >
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(rating.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">{rating.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Testimonials in One Row */}
        <div className="overflow-x-auto pb-4 lg:pb-0  px-2 sm:mx-0 sm:px-0">
          <div className="flex lg:grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 min-w-max lg:min-w-0">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-orange-500 text-white rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-orange-600 transition-colors w-[280px] sm:w-[320px] lg:w-auto shrink-0"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-sm sm:text-base lg:text-lg">{testimonial.name}</h4>
                    <p className="text-orange-100 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
                  "{testimonial.testimonial}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
