'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Utensils, ArrowRight, CheckCircle } from 'lucide-react';

export default function HeroSection() {
  const [vendorType, setVendorType] = useState('');
  const [location, setLocation] = useState('');
  const [caterbazarChoice, setCaterbazarChoice] = useState(true);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Redefining Dining Experiences for Your Events';

  useEffect(() => {
    const startTyping = () => {
      let index = 0;
      setTypedText('');
      
      const typingInterval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 50); // Adjust speed here (lower = faster)
    };

    // Start typing immediately
    startTyping();

    // Repeat every 3 seconds
    const repeatInterval = setInterval(() => {
      startTyping();
    }, 7000);

    return () => {
      clearInterval(repeatInterval);
    };
  }, []);

  const handleSearch = () => {
    console.log('Search:', { vendorType, location, caterbazarChoice });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4 min-h-20 sm:min-h-[120px]">
                {typedText}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Curated menus, elegant setups, and flawless service perfection on every plate.
              </p>
            </div>

            {/* Trusted By Section */}
            {/* <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 lg:mb-4">Trusted by :</p>
              <div className="overflow-hidden">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 opacity-40 animate-scroll">
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">LaunchSimple</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Lightbox</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Lightspeed</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Company</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">LaunchSimple</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Lightbox</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Lightspeed</div>
                  <div className="text-gray-400 text-xs sm:text-sm lg:text-base font-semibold whitespace-nowrap">Company</div>
                </div>
              </div>
            </div> */}
          </div>

          {/* Right Side - Image with Search Card */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Chefs preparing food"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>

              {/* Search Card Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  {/* Vendor Type Dropdown */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Vendor Type
                    </label>
                    <div className="relative">
                      <Utensils className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <select
                        value={vendorType}
                        onChange={(e) => setVendorType(e.target.value)}
                        className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-xs sm:text-sm bg-white appearance-none text-gray-600"
                      >
                        <option value="">Select Vendor</option>
                        <option value="wedding">Wedding Catering</option>
                        <option value="corporate">Corporate Catering</option>
                        <option value="party">Party Catering</option>
                        <option value="event">Event Catering</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Location Dropdown */}
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full pl-8 sm:pl-10 pr-8 sm:pr-10 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition text-xs sm:text-sm bg-white appearance-none text-gray-600"
                      >
                        <option value="">Find Location</option>
                        <option value="mumbai">Mumbai</option>
                        <option value="delhi">Delhi</option>
                        <option value="bangalore">Bangalore</option>
                        <option value="pune">Pune</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Caterbazar Choice Checkbox and Search Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={caterbazarChoice}
                      onChange={(e) => setCaterbazarChoice(e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label className="ml-2 text-xs sm:text-sm text-gray-700 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                      Caterbazar Choice
                    </label>
                  </div>

                  <button
                    onClick={handleSearch}
                    className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    Search
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}