"use client";

import React, { useState } from 'react';
import { ChevronDown, Search, MapPin, Star, Info, ChevronRight, Filter, X } from 'lucide-react';
import CitiesCarousel from '@/components/Vendor/CitiesCarousel';
import { useRouter } from 'next/navigation';

export default function SearchResults() {
  const router = useRouter();
  const [sortBy, setSortBy] = useState('Popularity');
  const [vendorType, setVendorType] = useState('Food Catering');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocalities, setSelectedLocalities] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState([100, 5000]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showCaterbazarChoice, setShowCaterbazarChoice] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const localities = ['Aiipore', 'Ballygunge', 'Behala', 'Garla', 'Howrah'];
  const preferences = [
    { name: 'Pure Veg', count: 347 },
    { name: 'Jain Friendly', count: 87 },
    { name: 'Halal', count: 156 },
    { name: 'Kosher', count: 23 },
    { name: 'Non-Veg Friendly', count: 789 }
  ];
  const capacities = ['Under 100', '100-200', '200-300', '300-500', 'Above 500'];
  const budgetOptions = ['Under ₹400', '₹400-₹700', '₹700-₹1200'];

  const caterers = Array(9).fill({
    name: 'Royal Feast Caterers',
    location: 'Neeladri Vihar, Bhubaneswar',
    rating: 5.0,
    reviews: '1.6k reviews',
    price: '₹550',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    isCaterbazarChoice: true
  }).map((caterer, idx) => ({ ...caterer, id: idx + 1 }));

  const toggleSelection = (array: string[], setArray: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter((i: string) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-8">
        <CitiesCarousel />
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold shadow-md"
          >
            <Filter className="w-5 h-5" />
            Filters & Sort
          </button>
        </div>

        <div className="flex gap-6 lg:gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <div className="hidden lg:block w-64 shrink-0">
            <div className="bg-white rounded-lg p-3 space-y-6 sticky top-6 border border-gray-200">{/* Filter Content */}
              {/* Sort By */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Sort by
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                  >
                    <option>Popularity</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Vendor Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Vendor Type
                </label>
                <div className="relative">
                  <select
                    value={vendorType}
                    onChange={(e) => setVendorType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                  >
                    <option>Food Catering</option>
                    <option>Decorators</option>
                    <option>Photographers</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Search within results */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Search within results
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search caterers..."
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Locality */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Locality
                </label>
                <div className="flex flex-wrap gap-2">
                  {localities.map((locality) => (
                    <button
                      key={locality}
                      onClick={() => toggleSelection(selectedLocalities, setSelectedLocalities, locality)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedLocalities.includes(locality)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {locality}
                    </button>
                  ))}
                </div>
              </div>

              {/* Food Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Food Preference
                </label>
                <div className="space-y-2">
                  {preferences.map((pref) => (
                    <button
                      key={pref.name}
                      onClick={() => toggleSelection(selectedPreferences, setSelectedPreferences, pref.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedPreferences.includes(pref.name)
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pref.name} <span className="text-gray-500">({pref.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Guests Capacity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Guests Capacity
                </label>
                <div className="flex flex-wrap gap-2">
                  {capacities.map((capacity) => (
                    <button
                      key={capacity}
                      onClick={() => toggleSelection(selectedCapacities, setSelectedCapacities, capacity)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCapacities.includes(capacity)
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {capacity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Budget (₹/plate)
                </label>
                <div className="px-2">
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    value={budgetRange[1]}
                    onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-600 mt-2">
                    <span>₹{budgetRange[0]}</span>
                    <span>₹{budgetRange[1]}</span>
                  </div>
                </div>
                <div className="space-y-2 mt-3">
                  {budgetOptions.map((option) => (
                    <button
                      key={option}
                      className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Rating
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" className="w-4 h-4 text-orange-500" />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700">& up (456)</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="rating" className="w-4 h-4 text-orange-500" />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700">& up (789)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Caterbazar Choice */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-900">
                    Caterbazar Choice
                  </label>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={showCaterbazarChoice}
                    onChange={(e) => setShowCaterbazarChoice(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded"
                  />
                  Show only curated caterers
                </label>
              </div>

              {/* Action Buttons */}
                <div className="flex gap-2 pt-4 border-t">
                <button className="flex-[0_0_30%] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  Reset
                </button>
                <button className="flex-[0_0_70%] px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Apply Filters (1,247)
                </button>
                </div>
            </div>
          </div>

          {/* Mobile Filter Modal */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50 overflow-y-auto">
              <div className="min-h-screen px-4 py-4">
                <div className="bg-white rounded-lg p-4 space-y-6 max-w-md mx-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-3 border-b">
                    <h2 className="text-lg font-bold text-gray-900">Filters & Sort</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filter Content (Same as Desktop) */}
                  {/* Sort By */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Sort by
                    </label>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                      >
                        <option>Popularity</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Rating</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Vendor Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Vendor Type
                    </label>
                    <div className="relative">
                      <select
                        value={vendorType}
                        onChange={(e) => setVendorType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                      >
                        <option>Food Catering</option>
                        <option>Decorators</option>
                        <option>Photographers</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Search within results */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Search within results
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search caterers..."
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      />
                      <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>
                  </div>

                  {/* Locality */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Locality
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {localities.map((locality) => (
                        <button
                          key={locality}
                          onClick={() => toggleSelection(selectedLocalities, setSelectedLocalities, locality)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            selectedLocalities.includes(locality)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {locality}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Food Preference
                    </label>
                    <div className="space-y-2">
                      {preferences.map((pref) => (
                        <button
                          key={pref.name}
                          onClick={() => toggleSelection(selectedPreferences, setSelectedPreferences, pref.name)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedPreferences.includes(pref.name)
                              ? 'bg-orange-50 text-orange-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {pref.name} <span className="text-gray-500">({pref.count})</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests Capacity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Guests Capacity
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {capacities.map((capacity) => (
                        <button
                          key={capacity}
                          onClick={() => toggleSelection(selectedCapacities, setSelectedCapacities, capacity)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedCapacities.includes(capacity)
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {capacity}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Budget (₹/plate)
                    </label>
                    <div className="px-2">
                      <input
                        type="range"
                        min="100"
                        max="5000"
                        value={budgetRange[1]}
                        onChange={(e) => setBudgetRange([budgetRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-orange-500 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-600 mt-2">
                        <span>₹{budgetRange[0]}</span>
                        <span>₹{budgetRange[1]}</span>
                      </div>
                    </div>
                    <div className="space-y-2 mt-3">
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Rating
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="rating" className="w-4 h-4 text-orange-500" />
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-700">& up (456)</span>
                        </div>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="rating" className="w-4 h-4 text-orange-500" />
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-700">& up (789)</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Caterbazar Choice */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-900">
                        Caterbazar Choice
                      </label>
                      <Info className="w-4 h-4 text-gray-400" />
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={showCaterbazarChoice}
                        onChange={(e) => setShowCaterbazarChoice(e.target.checked)}
                        className="w-4 h-4 text-orange-500 rounded"
                      />
                      Show only curated caterers
                    </label>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t sticky bottom-0 bg-white">
                    <button className="flex-[0_0_30%] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-[0_0_70%] px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Apply Filters (1,247)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Content - Results */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Search Results:</h1>
                <p className="text-xs sm:text-sm text-gray-600">1,247 caterers found</p>
              </div>
              <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm">
                Next Page
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {caterers.map((caterer, index) => (
                <div key={index} className="p-4 rounded-lg overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow">
                  {/* Image */}
                  <div className="relative h-36 sm:h-40 ">
                    <img
                      src={caterer.image}
                      alt={caterer.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {caterer.isCaterbazarChoice && (
                      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-white/70 rounded-full px-2 sm:px-3 py-1 flex items-center gap-1 shadow-md">
                        <span className="text-[10px] sm:text-xs font-semibold text-gray-800">Caterbazar Choice</span>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-[10px] sm:text-xs">✓</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="py-2 pt-4">
                    <div className="flex items-start gap-2 mb-2">
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-gray-900">{caterer.rating}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">({caterer.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                      {caterer.name}
                    </h3>

                    <div className="flex items-start gap-1 mb-3 sm:mb-4">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{caterer.location}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 gap-2">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Starting Price ( Veg )</p>
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">{caterer.price}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Onwards</p>
                      </div>
                      <button
                        onClick={() => router.push(`/vendors/${caterer.id}`)}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors text-xs sm:text-sm whitespace-nowrap"
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}