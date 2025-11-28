"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { ChevronDown, Search, MapPin, Star, Info, ChevronRight, Filter, X } from 'lucide-react';
import CitiesCarousel from '@/components/Vendor/CitiesCarousel';
import { useRouter, useSearchParams } from 'next/navigation';
import { searchVendors, VendorData } from '@/api/user/public.api';

function SearchResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Filter States
  const [sortBy, setSortBy] = useState('popularity');
  const [vendorType, setVendorType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocality, setSelectedLocality] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [foodPreference, setFoodPreference] = useState<'veg' | 'non-veg' | 'both' | ''>('');
  const [minGuests, setMinGuests] = useState<number | ''>('');
  const [maxGuests, setMaxGuests] = useState<number | ''>('');
  const [vegPriceMin, setVegPriceMin] = useState<number | ''>('');
  const [vegPriceMax, setVegPriceMax] = useState<number | ''>('');
  const [nonVegPriceMin, setNonVegPriceMin] = useState<number | ''>('');
  const [nonVegPriceMax, setNonVegPriceMax] = useState<number | ''>('');
  const [minRating, setMinRating] = useState<number | ''>('');
  const [showCaterbazarChoice, setShowCaterbazarChoice] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Data States
  const [vendors, setVendors] = useState<VendorData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    pages: 1
  });

  // Fetch vendors with all filters
  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const params: any = {
          page: pagination.page,
          limit: 20
        };

        // Get initial query parameters from URL
        const urlVendorCategory = searchParams.get('vendorCategory');
        const urlState = searchParams.get('state');
        const urlCaterbazarChoice = searchParams.get('caterbazarChoice');

        // Apply all filters
        if (vendorType || urlVendorCategory) params.vendorCategory = vendorType || urlVendorCategory;
        if (selectedState || urlState) params.state = selectedState || urlState;
        if (selectedLocality) params.locality = selectedLocality;
        if (minGuests) params.minGuests = minGuests;
        if (maxGuests) params.maxGuests = maxGuests;
        if (vegPriceMin) params.vegPriceMin = vegPriceMin;
        if (vegPriceMax) params.vegPriceMax = vegPriceMax;
        if (nonVegPriceMin) params.nonVegPriceMin = nonVegPriceMin;
        if (nonVegPriceMax) params.nonVegPriceMax = nonVegPriceMax;
        if (foodPreference) params.foodPreference = foodPreference;
        if (minRating) params.minRating = minRating;
        if (showCaterbazarChoice || urlCaterbazarChoice === 'true') params.caterbazarChoice = true;
        if (sortBy) params.sortBy = sortBy;
        if (searchQuery) params.searchQuery = searchQuery;

        const response = await searchVendors(params);
        
        if (response.success) {
          setVendors(response.data.vendors);
          setPagination(response.data.pagination);
          
          // Update state based on URL params on first load
          if (urlVendorCategory && !vendorType) setVendorType(urlVendorCategory);
          if (urlState && !selectedState) setSelectedState(urlState);
          if (urlCaterbazarChoice === 'true') setShowCaterbazarChoice(true);
        }
      } catch (error) {
        console.error('Error fetching vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [
    vendorType, selectedState, selectedLocality, minGuests, maxGuests,
    vegPriceMin, vegPriceMax, nonVegPriceMin, nonVegPriceMax,
    foodPreference, minRating, showCaterbazarChoice, sortBy, searchQuery, pagination.page
  ]);

  const handleResetFilters = () => {
    setVendorType('');
    setSelectedState('');
    setSelectedLocality('');
    setMinGuests('');
    setMaxGuests('');
    setVegPriceMin('');
    setVegPriceMax('');
    setNonVegPriceMin('');
    setNonVegPriceMax('');
    setFoodPreference('');
    setMinRating('');
    setShowCaterbazarChoice(false);
    setSearchQuery('');
    setSortBy('popularity');
  };

  const localities = ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur'];
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
  ];
  const capacityRanges = [
    { label: 'Under 100', min: 0, max: 100 },
    { label: '100-200', min: 100, max: 200 },
    { label: '200-300', min: 200, max: 300 },
    { label: '300-500', min: 300, max: 500 },
    { label: 'Above 500', min: 500, max: 10000 }
  ];

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
        <CitiesCarousel 
          selectedState={selectedState}
          onStateChange={setSelectedState}
        />
        
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
                    <option value="popularity">Popularity</option>
                    <option value="rating">Highest Rated</option>
                    <option value="vegPricePerPlate">Price: Low to High</option>
                    <option value="-vegPricePerPlate">Price: High to Low</option>
                    <option value="createdAt">Newest First</option>
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
                    <option value="">All Types</option>
                    <option value="food_catering">Food Catering</option>
                    <option value="decoration">Decoration</option>
                    <option value="photography">Photography</option>
                    <option value="dj_music">DJ & Music</option>
                    <option value="venue">Venue</option>
                    <option value="makeup_artist">Makeup Artist</option>
                    <option value="event_planner">Event Planner</option>
                    <option value="invitation_cards">Invitation Cards</option>
                    <option value="transportation">Transportation</option>
                    <option value="other">Other</option>
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
                  State
                </label>
                <div className="relative">
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                  >
                    <option value="">All States</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Locality
                </label>
                <div className="relative">
                  <select
                    value={selectedLocality}
                    onChange={(e) => setSelectedLocality(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                  >
                    <option value="">All Localities</option>
                    {localities.map((locality) => (
                      <option key={locality} value={locality}>{locality}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Food Preference */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Food Preference
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setFoodPreference('veg')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      foodPreference === 'veg'
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Pure Veg
                  </button>
                  <button
                    onClick={() => setFoodPreference('non-veg')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      foodPreference === 'non-veg'
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Non-Veg
                  </button>
                  <button
                    onClick={() => setFoodPreference('both')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      foodPreference === 'both'
                        ? 'bg-orange-50 text-orange-600 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>

              {/* Guests Capacity */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Guests Capacity
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={minGuests}
                      onChange={(e) => setMinGuests(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxGuests}
                      onChange={(e) => setMaxGuests(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {capacityRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        setMinGuests(range.min);
                        setMaxGuests(range.max);
                      }}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget - Veg Prices */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Veg Price (₹/plate)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={vegPriceMin}
                      onChange={(e) => setVegPriceMin(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={vegPriceMax}
                      onChange={(e) => setVegPriceMax(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Budget - Non-Veg Prices */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Non-Veg Price (₹/plate)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={nonVegPriceMin}
                      onChange={(e) => setNonVegPriceMin(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={nonVegPriceMax}
                      onChange={(e) => setNonVegPriceMax(e.target.value ? parseInt(e.target.value) : '')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Minimum Rating
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating === minRating ? '' : rating)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                        minRating === rating
                          ? 'bg-orange-50 text-orange-600 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span>& up</span>
                      </div>
                    </button>
                  ))}
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
                <button 
                  onClick={handleResetFilters}
                  className="flex-[0_0_30%] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Reset
                </button>
                <button className="flex-[0_0_70%] px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                  Apply Filters ({pagination.total})
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
                        <option value="">Default</option>
                        <option value="popularity">Popularity</option>
                        <option value="rating">Rating</option>
                        <option value="price_low">Price: Low to High</option>
                        <option value="price_high">Price: High to Low</option>
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
                        <option value="">All Types</option>
                        <option value="food_catering">Food Catering</option>
                        <option value="decoration">Decoration</option>
                        <option value="photography">Photography</option>
                        <option value="dj_music">DJ & Music</option>
                        <option value="venue">Venue</option>
                        <option value="makeup_artist">Makeup Artist</option>
                        <option value="event_planner">Event Planner</option>
                        <option value="invitation_cards">Invitation Cards</option>
                        <option value="transportation">Transportation</option>
                        <option value="other">Other</option>
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

                  {/* State & Locality - Same as Desktop */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      State
                    </label>
                    <div className="relative">
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                      >
                        <option value="">All States</option>
                        {states.map((state) => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Locality
                    </label>
                    <div className="relative">
                      <select
                        value={selectedLocality}
                        onChange={(e) => setSelectedLocality(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm appearance-none bg-white"
                      >
                        <option value="">All Localities</option>
                        {localities.map((locality) => (
                          <option key={locality} value={locality}>{locality}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>

                  {/* Food Preference */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Food Preference
                    </label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setFoodPreference('veg')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          foodPreference === 'veg'
                            ? 'bg-orange-50 text-orange-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Pure Veg
                      </button>
                      <button
                        onClick={() => setFoodPreference('non-veg')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          foodPreference === 'non-veg'
                            ? 'bg-orange-50 text-orange-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Non-Veg
                      </button>
                      <button
                        onClick={() => setFoodPreference('both')}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          foodPreference === 'both'
                            ? 'bg-orange-50 text-orange-600 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Both
                      </button>
                    </div>
                  </div>

                  {/* Guests Capacity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Guests Capacity
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="number"
                          placeholder="Min"
                          value={minGuests}
                          onChange={(e) => setMinGuests(e.target.value ? parseInt(e.target.value) : '')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                      <div>
                        <input
                          type="number"
                          placeholder="Max"
                          value={maxGuests}
                          onChange={(e) => setMaxGuests(e.target.value ? parseInt(e.target.value) : '')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Veg Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Veg Price (₹/plate)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={vegPriceMin}
                        onChange={(e) => setVegPriceMin(e.target.value ? parseInt(e.target.value) : '')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={vegPriceMax}
                        onChange={(e) => setVegPriceMax(e.target.value ? parseInt(e.target.value) : '')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Non-Veg Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Non-Veg Price (₹/plate)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={nonVegPriceMin}
                        onChange={(e) => setNonVegPriceMin(e.target.value ? parseInt(e.target.value) : '')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={nonVegPriceMax}
                        onChange={(e) => setNonVegPriceMax(e.target.value ? parseInt(e.target.value) : '')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm"
                      />
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Minimum Rating
                    </label>
                    <div className="space-y-2">
                      {[5, 4, 3, 2].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => setMinRating(rating === minRating ? '' : rating)}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                            minRating === rating
                              ? 'bg-orange-50 text-orange-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            {[...Array(rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span>& up</span>
                          </div>
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
                    <button 
                      onClick={handleResetFilters}
                      className="flex-[0_0_30%] px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-[0_0_70%] px-4 py-2 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      Apply Filters ({pagination.total})
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
                <p className="text-xs sm:text-sm text-gray-600">
                  {loading ? 'Loading...' : `${pagination.total} caterers found`}
                </p>
              </div>
              {pagination.pages > 1 && (
                <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold text-sm">
                  Next Page
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-500">Loading vendors...</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && vendors.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No vendors found. Try adjusting your filters.</p>
              </div>
            )}

            {/* Results Grid */}
            {!loading && vendors.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {vendors.map((vendor, index) => {
                  // Get setup image from gallery or fallback to profile photo
                  const setupImage = vendor.gallery?.find(img => img.category === 'setup');
                  const vendorImage = setupImage?.url || vendor.profilePhoto || 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                  
                  // Skip vendor if address is not available
                  if (!vendor.address || !vendor.address.locality || !vendor.address.state) {
                    return null;
                  }
                  
                  return (
                    <div key={vendor?.userId?._id} className="p-4 rounded-lg overflow-hidden border border-gray-200 hover:shadow-sm transition-shadow">
                      {/* Image */}
                      <div className="relative h-36 sm:h-40 ">
                        <img
                          src={vendorImage}
                          alt={vendor.userId.fullName}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    {vendor.isCaterbazarChoice && (
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
                          <span className="text-xs sm:text-sm font-semibold text-gray-900">{vendor.stats.averageRating.toFixed(1)}</span>
                          <span className="text-[10px] sm:text-xs text-gray-500">({vendor.stats.totalReviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 line-clamp-1">
                      {vendor.userId.fullName}
                    </h3>

                    <div className="flex items-start gap-1 mb-3 sm:mb-4">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-1">{vendor.address.locality}, {vendor.address.state}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 gap-2">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">Starting Price ( Veg )</p>
                        <p className="text-xl sm:text-2xl font-bold text-orange-500">₹{vendor.pricing.vegPricePerPlate}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Onwards</p>
                      </div>
                      <button
                        onClick={() => router.push(`/vendors/${vendor?.userId?._id}`)}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 border border-orange-500 text-orange-500 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-colors text-xs sm:text-sm whitespace-nowrap"
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}