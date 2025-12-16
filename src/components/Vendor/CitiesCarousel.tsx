"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface CitiesCarouselProps {
  selectedLocality: string;
  onLocalityChange: (locality: string) => void;
}

export default function CitiesCarousel({
  selectedLocality,
  onLocalityChange,
}: CitiesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const cities = [
    {
      name: "Agra",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Ahmedabad",
      image:
        "https://images.unsplash.com/photo-1523454118563-e48b6ada2029?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Balasore",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Berhampur",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Bhadrak",
      image:
        "https://images.unsplash.com/photo-1483653364400-eedcfb9f1f88?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Bhubaneswar",
      image:
        "https://plus.unsplash.com/premium_photo-1673515243097-b2b9b194b056?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Chandigarh",
      image:
        "https://plus.unsplash.com/premium_photo-1697729976089-8d36aca4929d?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Chennai",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Cuttack",
      image:
        "https://plus.unsplash.com/premium_photo-1680652044459-dabb90d99905?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Delhi NCR",
      image:
        "https://plus.unsplash.com/premium_photo-1697730323859-b093b74df90a?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Goa",
      image:
        "https://plus.unsplash.com/premium_photo-1697729701846-e34563b06d47?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Gurgaon",
      image:
        "https://images.unsplash.com/photo-1695667424131-a9680e0307ee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Indore",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Jim Corbett",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kanpur",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kochi",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kolkata",
      image:
        "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Lucknow",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Pune",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Puri",
      image:
        "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Rourkela",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sambalpur",
      image:
        "https://images.unsplash.com/photo-1576426340752-ae9effb0af50?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Udaipur",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const handleCityClick = (cityName: string) => {
    if (selectedLocality === cityName) {
      onLocalityChange(""); // Deselect if clicking the same city
    } else {
      onLocalityChange(cityName);
    }
  };

  const handleReset = () => {
    onLocalityChange("");
    router.push("/vendors");
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header with Reset Button */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Browse by Locality
          </h2>
          {selectedLocality && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Filter
            </button>
          )}
        </div>

        <div className="relative">
          {/* Left Arrow Button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg rounded-full flex items-center justify-center hover:from-orange-500 hover:to-orange-600 hover:shadow-xl transition-all duration-300 border border-orange-300/50 group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg rounded-full flex items-center justify-center hover:from-orange-500 hover:to-orange-600 hover:shadow-xl transition-all duration-300 border border-orange-300/50 group"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar scroll-smooth px-12"
          >
            {cities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCityClick(city.name)}
                className="shrink-0 flex flex-col items-center cursor-pointer group"
              >
                {/* City Image Circle */}
                <div
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden mb-2 sm:mb-3 transition-all duration-300 `}
                >
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* {selectedState === city.name && (
                    <div className="absolute inset-0 bg-orange-500 bg-opacity-20"></div>
                  )} */}
                </div>

                {/* City Name */}
                <p
                  className={`text-[10px] sm:text-xs font-semibold transition-colors ${
                    selectedLocality === city.name
                      ? "text-orange-500"
                      : "text-gray-800 group-hover:text-orange-500"
                  }`}
                >
                  {city.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
