import React, { useState } from 'react';
import { Upload, Clock } from 'lucide-react';

export default function BusinessDetails() {
  const [formData, setFormData] = useState({
    yearOfEstablishment: '',
    yearsInBusiness: '',
    teamSize: '',
    minGuests: '',
    maxGuests: '',
    idealBookingTime: '',
    vendorCategory: 'Food Catering',
    country: 'INDIA',
    state: '',
    locality: '',
    pin: '',
    vegPrice: '',
    nonVegPrice: '',
    weeksInAdvance: '',
    operationalRadius: ''
  });

  const [serviceSpecialization, setServiceSpecialization] = useState({
    multiCuisine: true,
    jainCateringOnly: false,
    chaatStreetFood: false,
    smallSizeGathering: false,
    drinksOnly: false
  });

  const [cuisineOptions, setCuisineOptions] = useState({
    northIndian: true,
    southIndian: false,
    chinese: false,
    greek: false,
    lebanese: false,
    thai: false,
    desserts: false,
    bengali: false,
    gujarati: false,
    rajasthani: false,
    goab: false,
    maharashtrian: false
  });

  const [menuUploads, setMenuUploads] = useState({
    starters: false,
    vegMainCourse: true,
    nonVegMainCourse: true,
    dessertsDrinks: true
  });

  const [others, setOthers] = useState({
    fssaiCertified: true
  });

  const [refundType, setRefundType] = useState('noRefund');

  const [policyDetails, setPolicyDetails] = useState('');

  const [languages, setLanguages] = useState({
    hindi: false,
    english: false,
    marathi: false,
    tamil: false,
    telugu: false,
    kannada: false,
    bengali: false,
    gujarati: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (category: string, field: string) => {
    if (category === 'service') {
      setServiceSpecialization(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    } else if (category === 'cuisine') {
      setCuisineOptions(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    } else if (category === 'menu') {
      setMenuUploads(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    } else if (category === 'others') {
      setOthers(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    } else if (category === 'language') {
      setLanguages(prev => ({
        ...prev,
        [field]: !prev[field as keyof typeof prev]
      }));
    }
  };

  const handleSave = () => {
    console.log('Saving business details:', {
      formData,
      serviceSpecialization,
      cuisineOptions,
      menuUploads,
      others,
      refundType,
      policyDetails,
      languages
    });
  };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Business Details</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Manage your catering business information</p>
      
      <div className="rounded-xl p-4 sm:p-6 border border-gray-200">
        {/* Business Information */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Business Information</h2>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Year of Establishment
              </label>
              <input
                type="text"
                name="yearOfEstablishment"
                value={formData.yearOfEstablishment}
                onChange={handleInputChange}
                placeholder="2019"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Years in Business
              </label>
              <input
                type="text"
                name="yearsInBusiness"
                value={formData.yearsInBusiness}
                onChange={handleInputChange}
                placeholder="6"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Team Size
              </label>
              <select
                name="teamSize"
                value={formData.teamSize}
                onChange={handleInputChange}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base bg-white"
              >
                <option value="">Select team size</option>
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="51-100">51-100</option>
                <option value="100+">100+</option>
              </select>
            </div>
          </div>
        </div>

        {/* Capacity & Booking */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Capacity & Booking</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Minimum Guests You Cater To
              </label>
              <input
                type="text"
                name="minGuests"
                value={formData.minGuests}
                onChange={handleInputChange}
                placeholder="e.g., 50"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Maximum Guests You Can Cater To
              </label>
              <input
                type="text"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleInputChange}
                placeholder="e.g., 500"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Ideal Advance Booking Time
            </label>
            <div className="relative">
              <input
                type="time"
                name="idealBookingTime"
                value={formData.idealBookingTime}
                onChange={handleInputChange}
                placeholder="12:23 PM"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
              <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Vendor Category
            </label>
            <div className="relative">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-medium">
                Food Catering
              </button>
              <select
                name="vendorCategory"
                value={formData.vendorCategory}
                onChange={handleInputChange}
                className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
              >
                <option value="Food Catering">Food Catering</option>
                <option value="Decoration">Decoration</option>
                <option value="Photography">Photography</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="INDIA"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="e.g., Odisha"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Locality
              </label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                placeholder="e.g., Patia"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Pin
              </label>
              <input
                type="text"
                name="pin"
                value={formData.pin}
                onChange={handleInputChange}
                placeholder="751024"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        {/* Pricing Details */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Pricing Details</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Starting Per Plate Price (Vegetarian)
              </label>
              <input
                type="text"
                name="vegPrice"
                value={formData.vegPrice}
                onChange={handleInputChange}
                placeholder="200"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Starting Per Plate Price (Non-Vegetarian)
              </label>
              <input
                type="text"
                name="nonVegPrice"
                value={formData.nonVegPrice}
                onChange={handleInputChange}
                placeholder="300"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Service Specialization */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Service Specialization (What Type of Caterer Are You)
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceSpecialization.multiCuisine}
                  onChange={() => handleCheckboxChange('service', 'multiCuisine')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Multi-Cuisine</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceSpecialization.jainCateringOnly}
                  onChange={() => handleCheckboxChange('service', 'jainCateringOnly')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Jain Catering Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceSpecialization.chaatStreetFood}
                  onChange={() => handleCheckboxChange('service', 'chaatStreetFood')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Chaat & Street Food Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceSpecialization.smallSizeGathering}
                  onChange={() => handleCheckboxChange('service', 'smallSizeGathering')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Small Size Gathering Only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={serviceSpecialization.drinksOnly}
                  onChange={() => handleCheckboxChange('service', 'drinksOnly')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Drinks Only</span>
              </label>
            </div>
          </div>

          {/* Cuisine Options */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Cuisine Options (Which of the following cuisines do you offer)
            </label>
            <div className="grid sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.northIndian}
                  onChange={() => handleCheckboxChange('cuisine', 'northIndian')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">North Indian</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.southIndian}
                  onChange={() => handleCheckboxChange('cuisine', 'southIndian')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">South Indian</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.chinese}
                  onChange={() => handleCheckboxChange('cuisine', 'chinese')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Chinese</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.greek}
                  onChange={() => handleCheckboxChange('cuisine', 'greek')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Greek</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.lebanese}
                  onChange={() => handleCheckboxChange('cuisine', 'lebanese')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Lebanese</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.thai}
                  onChange={() => handleCheckboxChange('cuisine', 'thai')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Thai</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.desserts}
                  onChange={() => handleCheckboxChange('cuisine', 'desserts')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Desserts</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.bengali}
                  onChange={() => handleCheckboxChange('cuisine', 'bengali')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Bengali</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.gujarati}
                  onChange={() => handleCheckboxChange('cuisine', 'gujarati')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Gujarati</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.rajasthani}
                  onChange={() => handleCheckboxChange('cuisine', 'rajasthani')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Rajasthani</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.goab}
                  onChange={() => handleCheckboxChange('cuisine', 'goab')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Goab</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={cuisineOptions.maharashtrian}
                  onChange={() => handleCheckboxChange('cuisine', 'maharashtrian')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm text-gray-700">Maharashtrian</span>
              </label>
            </div>
          </div>
        </div>

        {/* Menu Details */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Menu Details</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuUploads.starters}
                  onChange={() => handleCheckboxChange('menu', 'starters')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Starters</span>
              </label>
              <button className="w-full px-4 py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuUploads.vegMainCourse}
                  onChange={() => handleCheckboxChange('menu', 'vegMainCourse')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Veg Main Course</span>
              </label>
              <button className="w-full px-4 py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuUploads.nonVegMainCourse}
                  onChange={() => handleCheckboxChange('menu', 'nonVegMainCourse')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Non-Veg Main Course</span>
              </label>
              <button className="w-full px-4 py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>

            <div>
              <label className="flex items-center gap-2 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={menuUploads.dessertsDrinks}
                  onChange={() => handleCheckboxChange('menu', 'dessertsDrinks')}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Desserts/Drinks (if included)</span>
              </label>
              <button className="w-full px-4 py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </button>
            </div>
          </div>
        </div>

        {/* Others */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Others</h2>
          <div className="mb-4">
            <label className="flex items-center gap-2 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={others.fssaiCertified}
                onChange={() => handleCheckboxChange('others', 'fssaiCertified')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm font-semibold text-gray-900">FSSAI Certified</span>
            </label>
            <button className="w-full sm:w-auto px-4 py-2.5 border-2 border-orange-500 text-orange-500 rounded-lg text-sm font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </button>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Refund Type (Select one)
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="refundType"
                  value="noRefund"
                  checked={refundType === 'noRefund'}
                  onChange={(e) => setRefundType(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm text-gray-700">No Refund Offered</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="refundType"
                  value="partialRefund"
                  checked={refundType === 'partialRefund'}
                  onChange={(e) => setRefundType(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm text-gray-700">No Refund, but Date Adjustment Possible</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="refundType"
                  value="fullRefund"
                  checked={refundType === 'fullRefund'}
                  onChange={(e) => setRefundType(e.target.value)}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="text-sm text-gray-700">Full Refund Offered</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Policy Details / Terms and Conditions
            </label>
            <textarea
              value={policyDetails}
              onChange={(e) => setPolicyDetails(e.target.value)}
              placeholder="Please describe in detail - eg No refunds within a month of the wedding day or 50% amount refundable"
              rows={4}
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base resize-none"
            />
          </div>
        </div>

        {/* Languages Spoken */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Languages Spoken</h2>
          <div className="grid sm:grid-cols-4 gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.hindi}
                onChange={() => handleCheckboxChange('language', 'hindi')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Hindi</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.english}
                onChange={() => handleCheckboxChange('language', 'english')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">English</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.marathi}
                onChange={() => handleCheckboxChange('language', 'marathi')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Marathi</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.tamil}
                onChange={() => handleCheckboxChange('language', 'tamil')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Tamil</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.telugu}
                onChange={() => handleCheckboxChange('language', 'telugu')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Telugu</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.kannada}
                onChange={() => handleCheckboxChange('language', 'kannada')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Kannada</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.bengali}
                onChange={() => handleCheckboxChange('language', 'bengali')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Bengali</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={languages.gujarati}
                onChange={() => handleCheckboxChange('language', 'gujarati')}
                className="w-4 h-4 text-orange-500 rounded"
              />
              <span className="text-sm text-gray-700">Gujarati</span>
            </label>
          </div>
        </div>

        {/* Additional Fields */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Weeks in advance for booking?
            </label>
            <input
              type="text"
              name="weeksInAdvance"
              value={formData.weeksInAdvance}
              onChange={handleInputChange}
              placeholder="5"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Operational Radius (km)
            </label>
            <input
              type="text"
              name="operationalRadius"
              value={formData.operationalRadius}
              onChange={handleInputChange}
              placeholder="30"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
            <p className="text-xs text-gray-500 mt-1">Service coverage area from your base location</p>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-orange-600 transition-colors"
          >
            Save Business Details
          </button>
        </div>
      </div>
    </div>
  );
}
