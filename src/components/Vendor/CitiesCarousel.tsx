import React, { useRef } from "react";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

interface CitiesCarouselProps {
  selectedState: string;
  onStateChange: (state: string) => void;
}

export default function CitiesCarousel({
  selectedState,
  onStateChange,
}: CitiesCarouselProps) {
  const scrollRef = useRef(null);

  const cities = [
    {
      name: "Andhra Pradesh",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Arunachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Assam",
      image:
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Bihar",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Chhattisgarh",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Gujarat",
      image:
        "https://images.unsplash.com/photo-1523454118563-e48b6ada2029?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Odisha",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Haryana",
      image:
        "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Himachal Pradesh",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Jharkhand",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Karnataka",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Kerala",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Madhya Pradesh",
      image:
        "https://images.unsplash.com/photo-1609137144813-7d9921338f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Maharashtra",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Manipur",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Meghalaya",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Mizoram",
      image:
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Nagaland",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Punjab",
      image:
        "https://images.unsplash.com/photo-1605648916361-9bc12ad6a569?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Sikkim",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Tamil Nadu",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Telangana",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Tripura",
      image:
        "https://images.unsplash.com/photo-1585338107529-13afc5f02586?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Uttar Pradesh",
      image:
        "https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Uttarakhand",
      image:
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "West Bengal",
      image:
        "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "Delhi",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    },
  ];

  const handleCityClick = (cityName: string) => {
    if (selectedState === cityName) {
      onStateChange(""); // Deselect if clicking the same city
    } else {
      onStateChange(cityName);
    }
  };

  const handleReset = () => {
    onStateChange("");
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Header with Reset Button */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Browse by State
          </h2>
          {selectedState && (
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
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
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
                    selectedState === city.name
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
