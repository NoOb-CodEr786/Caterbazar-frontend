"use client";

import React, { useState } from "react";
import { ArrowRight, Star } from "lucide-react";

const categories = ["All", "Dessert", "Paan", "Food Counters", "Chaat & Fruit Stalls"];

const caterers = [
  {
    id: 1,
    name: "Royal Feast Caterers",
    location: "Neeladri Vihar, Bhubaneswar",
    rating: 5.0,
    reviews: "1.6k reviews",
    price: "550",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isCaterbazarChoice: true,
  },
  {
    id: 2,
    name: "Royal Feast Caterers",
    location: "Neeladri Vihar, Bhubaneswar",
    rating: 5.0,
    reviews: "1.6k reviews",
    price: "550",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isCaterbazarChoice: false,
  },
  {
    id: 3,
    name: "Royal Feast Caterers",
    location: "Neeladri Vihar, Bhubaneswar",
    rating: 5.0,
    reviews: "1.6k reviews",
    price: "550",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isCaterbazarChoice: false,
  },
  {
    id: 4,
    name: "Royal Feast Caterers",
    location: "Neeladri Vihar, Bhubaneswar",
    rating: 5.0,
    reviews: "1.6k reviews",
    price: "550",
    image: "https://images.unsplash.com/photo-1464093515883-ec948246accb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isCaterbazarChoice: false,
  },
  {
    id: 5,
    name: "Royal Feast Caterers",
    location: "Neeladri Vihar, Bhubaneswar",
    rating: 5.0,
    reviews: "1.6k reviews",
    price: "550",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    isCaterbazarChoice: false,
  },
];

export default function TopRatedCaterers() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="bg-linear-to-br from-amber-950 via-amber-900 to-amber-950 py-8 sm:py-10 lg:py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 sm:mb-6 gap-3 sm:gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
              Top-Rated Caterers <span className="italic font-serif text-orange-400">Handpicked</span> for You
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm">Handpicked professionals making every event unforgettable.</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 sm:gap-3 mb-5 sm:mb-6 overflow-x-auto pb-2   sm:mx-0 sm:px-0 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full font-medium whitespace-nowrap transition-all ${
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-200 border border-gray-500/50 hover:border-orange-500 hover:bg-white/20"
              }`}
            >
              {category}
            </button>
          ))}
          <button className="px-3 sm:px-4 py-1.5 text-xs sm:text-sm rounded-full bg-white text-gray-800 font-medium whitespace-nowrap hover:bg-gray-100 transition-colors flex items-center gap-1 shadow-md">
            View all <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Caterers Cards - Scrollable */}
        <div className="overflow-x-auto pb-4 sm:mx-0 sm:px-0 hide-scrollbar">
          <div className="flex gap-3 sm:gap-4 lg:gap-5">
            {caterers.map((caterer) => (
              <div
                key={caterer.id}
                className="shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-15px)] bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image */}
                <div className="relative h-40 sm:h-44 lg:h-48 overflow-hidden">
                  <img
                    src={caterer.image}
                    alt={caterer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent"></div>
                  {caterer.isCaterbazarChoice && (
                    <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1 shadow-lg">
                      <span className="text-white">★</span>
                      Caterbazar Choice
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{caterer.rating}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({caterer.reviews})</span>
                  </div>

                  {/* Name & Location */}
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {caterer.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3 line-clamp-1 flex items-center gap-1">
                    <span className="text-gray-400">📍</span>
                    {caterer.location}
                  </p>

                  {/* Price & Booking */}
                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-gray-500 text-[10px] sm:text-xs mb-0.5">Starting from</p>
                      <p className="text-xl sm:text-2xl font-bold text-orange-600">₹{caterer.price}</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">Per Plate</p>
                    </div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold transition-all text-xs sm:text-sm whitespace-nowrap shadow-md hover:shadow-lg">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>      
      </div>
    </section>
  );
}
