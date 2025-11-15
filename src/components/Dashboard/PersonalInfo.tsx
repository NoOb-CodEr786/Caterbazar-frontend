import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { getVendorProfile, updateVendorProfile } from '@/api/vendor/vendor.api';

export default function PersonalInfo() {
  const [formData, setFormData] = useState({
    fullName: '',
    brandName: '',
    email: '',
    businessEmail: '',
    businessMobile: '',
    whatsappNumber: '',
    alternateContact: '',
    websiteUrl: '',
    facebookPage: '',
    instagramHandle: '',
    shortBio: ''
  });

  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch vendor profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getVendorProfile();
        if (response.success && response.data) {
          const vendor = response.data.vendor;
          setFormData({
            fullName: vendor.fullName || '',
            brandName: '',
            email: vendor.email || '',
            businessEmail: vendor.email || '',
            businessMobile: vendor.phoneNumber || '',
            whatsappNumber: '',
            alternateContact: '',
            websiteUrl: '',
            facebookPage: '',
            instagramHandle: '',
            shortBio: ''
          });
          setProfilePicture(vendor.profilePicture);
          setIsPhoneVerified(vendor.isPhoneVerified);
          setIsEmailVerified(vendor.isEmailVerified);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const response = await updateVendorProfile({
        fullName: formData.fullName,
        profilePicture: profilePicture,
      });

      if (response.success) {
        setSuccess('Profile updated successfully!');
        // Update localStorage with new data
        const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
        vendorData.fullName = formData.fullName;
        vendorData.profilePicture = profilePicture;
        localStorage.setItem('vendorData', JSON.stringify(vendorData));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Personal Information</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Manage your business profile details</p>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span className="text-sm">{success}</span>
        </div>
      )}

      {/* Profile Photo Section */}
      <div className="rounded-xl p-4 sm:p-6 border border-gray-200 mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Profile Photo</h2>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-2xl">
              {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'V'}
            </div>
          )}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <button className="px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-300 rounded-lg font-semibold text-sm sm:text-base text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Upload className="w-4 h-4" />
              Upload New Photo
            </button>
            <span className="text-xs sm:text-sm text-gray-500">JPG or PNG. Max size 2MB.</span>
          </div>
        </div>
      </div>

      {/* Information Overview Form */}
      <div className="rounded-xl p-4 sm:p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Information Overview</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex text-sm font-semibold text-gray-900 mb-2 items-center gap-1">
              Email <span className="text-red-500">*</span>
              {isEmailVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="surajitsaha9434@gmail.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Brand Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Brand Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              placeholder="Enter your brand name"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Business Email */}
          <div>
            <label className="flex text-sm font-semibold text-gray-900 mb-2 items-center gap-1">
              Business Email <span className="text-red-500">*</span>
              {isEmailVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
            </label>
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleInputChange}
              placeholder="surajit@caterbazar.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Business Mobile */}
          <div>
            <label className="flex text-sm font-semibold text-gray-900 mb-2 items-center gap-1">
              Business Mobile <span className="text-red-500">*</span>
              {isPhoneVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
            </label>
            <div className="flex gap-2">
              <select className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base bg-white">
                <option>+91</option>
                <option>+1</option>
                <option>+44</option>
              </select>
              <input
                type="tel"
                name="businessMobile"
                value={formData.businessMobile}
                onChange={handleInputChange}
                placeholder="9800306702"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
              />
            </div>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              WhatsApp Number
            </label>
            <input
              type="tel"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
              placeholder="WhatsApp number"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Alternate Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Alternate Contact
            </label>
            <input
              type="tel"
              name="alternateContact"
              value={formData.alternateContact}
              onChange={handleInputChange}
              placeholder="Alternate phone"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Website URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Website URL (Optional)
            </label>
            <input
              type="url"
              name="websiteUrl"
              value={formData.websiteUrl}
              onChange={handleInputChange}
              placeholder="https://yourwebsite.com"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Facebook Page */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Facebook Page (Optional)
            </label>
            <input
              type="text"
              name="facebookPage"
              value={formData.facebookPage}
              onChange={handleInputChange}
              placeholder="Facebook page URL"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>

          {/* Instagram Handle */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Instagram Handle (Optional)
            </label>
            <input
              type="text"
              name="instagramHandle"
              value={formData.instagramHandle}
              onChange={handleInputChange}
              placeholder="@yourhandle"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Short Bio */}
        <div className="mt-4 sm:mt-6">
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Short Bio (50 words)
          </label>
          <textarea
            name="shortBio"
            value={formData.shortBio}
            onChange={handleInputChange}
            placeholder="Describe your business in 50 words..."
            maxLength={250}
            rows={4}
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm sm:text-base resize-none"
          />
          <div className="text-right text-xs sm:text-sm text-gray-500 mt-1">
            {formData.shortBio.length}/250
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={handleSaveProfile}
            disabled={saving}
            className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 bg-orange-500 text-white rounded-lg text-sm sm:text-base font-semibold hover:bg-orange-600 transition-colors disabled:bg-orange-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
