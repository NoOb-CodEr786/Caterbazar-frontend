"use client";
import React, { useState } from 'react';
import { Star, MapPin, Heart, Share2, HelpCircle, ChevronRight } from 'lucide-react';

export default function VendorDetailsPage() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-2 hidden sm:block">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm overflow-x-auto hide-scrollbar">
            <a href="#" className="text-orange-500 hover:text-orange-600 whitespace-nowrap">Home</a>
            <span className="text-gray-400">/</span>
            <a href="#" className="text-orange-500 hover:text-orange-600 whitespace-nowrap">Catering</a>
            <span className="text-gray-400">/</span>
            <a href="#" className="text-orange-500 hover:text-orange-600 whitespace-nowrap">Kolkata</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 whitespace-nowrap">Royal Feast Caterers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Hero Image */}
            <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Royal Feast Caterers"
                className="w-full h-48 sm:h-64 lg:h-96 object-cover"
              />
            </div>

            {/* Vendor Info */}
            <div className="px-2 sm:px-0">
              <div className="flex items-start justify-between gap-3 mb-3 sm:mb-4">
                <div className="flex-1">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">Royal Feast Caterers</h1>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 sm:mb-3">Multi-cuisine wedding & event specialists</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm sm:text-base font-semibold">4.8</span>
                      <span className="text-xs sm:text-sm text-gray-600">• 124 reviews</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">Mumbai</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isFavorite
                        ? 'bg-orange-50 border-orange-500'
                        : 'border-gray-300 hover:border-orange-500'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isFavorite ? 'fill-orange-500 text-orange-500' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-orange-500 transition-colors">
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg sm:rounded-2xl p-4 sm:p-6 shadow-lg">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About Royal Feast Caterers</h2>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-gray-700">
                <p>
                  Royal Feast Caterers has been serving Mumbai's finest events since 2010, specializing in creating
                  unforgettable culinary experiences for weddings, corporate events, and special celebrations.
                </p>
                <p>
                  Our expert chefs craft authentic multi-cuisine menus using the finest ingredients, while our
                  professional service team ensures flawless execution from setup to cleanup.
                </p>
                <p>
                  We pride ourselves on customizing every menu to your preferences, dietary requirements, and
                  cultural traditions, making your event truly special.
                </p>
              </div>

            {/* Menu Details */}
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 mt-6 sm:mt-10">Menu Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Starters</span>
                  <button className="px-3 sm:px-4 py-1 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-orange-600 transition-colors">
                    View <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Non-Veg Main Course</span>
                  <button className="px-3 sm:px-4 py-1 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-orange-600 transition-colors">
                    View <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Veg Main Course</span>
                  <button className="px-3 sm:px-4 py-1 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-orange-600 transition-colors">
                    View <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <span className="text-sm sm:text-base font-semibold text-gray-900">Desserts/Drinks</span>
                  <button className="px-3 sm:px-4 py-1 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 hover:bg-orange-600 transition-colors">
                    View <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🍽️</div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">Multi-Cuisine</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">Indian, Chinese, Continental</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">👥</div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">50-2000 Guests</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">Flexible capacity</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📍</div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">Mumbai & Pune</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">Service areas</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🏆</div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">FSSAI Certified</h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">Quality assured</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pricing Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md lg:sticky lg:top-24">
              {/* Discount Badge */}
              <div className="inline-block bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                30% Off
              </div>

              {/* Pricing */}
                <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
                <div className="border-r-2 border-gray-200">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-0.5 sm:mb-1">Veg</h3>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">From ₹5000</span>
                  </div>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">₹1200</span>
                  <span className="text-[10px] sm:text-xs text-gray-600">/ Plate</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">Non-Veg</h3>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-[10px] sm:text-xs text-gray-400 line-through">From ₹6000</span>
                  </div>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">₹1300</span>
                  <span className="text-[10px] sm:text-xs text-gray-600">/ Plate</span>
                  </div>
                </div>
                </div>

              {/* Benefits */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Best Price Guaranteed</span>
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-auto" />
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">No Booking Fees</span>
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-auto" />
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">✓</span>
                  </div>
                  <span className="text-gray-700">Full Refund Offered upon cancellation</span>
                  <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 ml-auto" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Chat on WhatsApp
                </button>
                <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Inquiry
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-center text-gray-500 mt-3 sm:mt-4">
                *Proceed with our Book Now, Pay Later option!*
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}