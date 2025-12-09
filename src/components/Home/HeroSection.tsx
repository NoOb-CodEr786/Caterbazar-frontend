'use client'

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Utensils, ArrowRight, CheckCircle } from 'lucide-react';
import { TypewriterEffect } from "../ui/typewriter-effect";
import { getHeroImages, HeroImage } from '@/api/user/public.api';

export default function HeroSection() {
  const [vendorType, setVendorType] = useState('');
  const [location, setLocation] = useState('');
  const [caterbazarChoice, setCaterbazarChoice] = useState(false);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
      }, 5000); // Change image every 5 seconds

      return () => clearInterval(interval);
    }
  }, [heroImages.length]);

  const fetchHeroImages = async () => {
    try {
      const response = await getHeroImages();
      if (response.success && response.data.heroImages.length > 0) {
        setHeroImages(response.data.heroImages);
      }
    } catch (error) {
      console.error('Error fetching hero images:', error);
    } finally {
      setLoading(false);
    }
  };

  const words = [
    {
      text: "One",
            className: "text-orange-500",

    },
    {
      text: "Bazar",
      className: "text-orange-500",
    },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (vendorType) params.append('vendorCategory', vendorType);
    if (location) params.append('state', location);
    if (caterbazarChoice) params.append('caterbazarChoice', 'true');
    
    const queryString = params.toString();
    const url = queryString ? `/vendors?${queryString}` : '/vendors';
    
    window.location.href = url;
  };

  return (
    <div className="min-h-auto bg-linear-to-br from-orange-50 via-white to-orange-50">
      <div className="container pb-20 mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Heading */}
            <div>
              <div className="mb-3 sm:mb-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  India’s 1st Cater Bazar - Top Caters {" "}
                  <TypewriterEffect words={words} className="inline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold" />
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-600">
                Curated menus, elegant setups, and flawless service perfection on every plate.
              </p>
            </div>
          </div>

          {/* Right Side - Image with Search Card */}
          <div className="relative">
            {/* Background Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {loading ? (
                <div className="w-full h-[400px] sm:h-[450px] lg:h-[550px] bg-gray-200 animate-pulse"></div>
              ) : (
                <img
                  src={heroImages[currentImageIndex]?.imageUrl || 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'}
                  alt={heroImages[currentImageIndex]?.title || 'Chefs preparing food'}
                  className="w-full h-[400px] sm:h-[450px] lg:h-[550px] object-cover transition-opacity duration-500"
                />
              )}
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
                        <option value="full_catering">Full Catering</option>
                        <option value="snacks_and_starter">Snacks & Starter</option>
                        <option value="dessert_and_sweet">Dessert & Sweets</option>
                        <option value="beverage">Beverage</option>
                        <option value="paan">Paan</option>
                        <option value="water">Water</option>
                        <option value="other">Other</option>
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
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Pune">Pune</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Goa">Goa</option>
                        <option value="Udaipur">Udaipur</option>
                        <option value="Jim Corbett">Jim Corbett</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Indore">Indore</option>
                        <option value="Agra">Agra</option>
                        <option value="Kanpur">Kanpur</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Kochi">Kochi</option>
                        <option value="Bhubaneswar">Bhubaneswar</option>
                        <option value="Cuttack">Cuttack</option>
                        <option value="Puri">Puri</option>
                        <option value="Sambalpur">Sambalpur</option>
                        <option value="Rourkela">Rourkela</option>
                        <option value="Berhampur">Berhampur</option>
                        <option value="Balasore">Balasore</option>
                        <option value="Bhadrak">Bhadrak</option>
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