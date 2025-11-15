"use client";

import React, { useEffect, useState } from 'react';
import { 
  X, Mail, Phone, MapPin, Calendar, CheckCircle, XCircle, 
  Clock, User, Shield, Activity, AlertCircle
} from 'lucide-react';
import { getVendorById, type Vendor } from '@/api/superadmin/vendor.api';

interface VendorDetailSidebarProps {
  vendorId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function VendorDetailSidebar({ vendorId, isOpen, onClose }: VendorDetailSidebarProps) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && vendorId) {
      fetchVendorDetails();
    }
  }, [isOpen, vendorId]);

  const fetchVendorDetails = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getVendorById(vendorId);
      if (response.success) {
        setVendor(response.data.vendor);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load vendor details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[90%] md:w-[600px] lg:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-linear-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 z-10">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Vendor Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-300 text-red-800 px-3 sm:px-4 py-3 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          )}

          {vendor && !loading && (
            <div className="flex items-center gap-3 sm:gap-4">
              {vendor.profilePicture ? (
                <img
                  src={vendor.profilePicture}
                  alt={vendor.fullName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 flex items-center justify-center border-3 sm:border-4 border-white shadow-lg">
                  <span className="text-white text-lg sm:text-2xl font-bold">
                    {getInitials(vendor.fullName)}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{vendor.fullName}</h3>
                <p className="text-white/90 text-xs sm:text-sm">{vendor.role.toUpperCase()}</p>
                <span className={`inline-block mt-1.5 sm:mt-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border ${getStatusColor(vendor.accountStatus)}`}>
                  {vendor.accountStatus.toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {vendor && !loading && (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <Mail className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="text-xs sm:text-sm text-gray-900 font-medium break-all">{vendor.email}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {vendor.isEmailVerified ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                          <span className="text-xs text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="text-xs text-red-600">Not Verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3 pt-3 border-t border-gray-200">
                  <Phone className="w-4 h-4 text-gray-400 mt-1 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone Number</p>
                    <p className="text-xs sm:text-sm text-gray-900 font-medium">{vendor.phoneNumber}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {vendor.isPhoneVerified ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                          <span className="text-xs text-green-600">Verified</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3 h-3 text-red-500 shrink-0" />
                          <span className="text-xs text-red-600">Not Verified</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Account Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">Account Status</span>
                  <span className={`px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold border ${getStatusColor(vendor.accountStatus)}`}>
                    {vendor.accountStatus.toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-gray-200 gap-1">
                  <span className="text-xs sm:text-sm text-gray-600">User ID</span>
                  <span className="text-xs sm:text-sm text-gray-900 font-mono break-all">{vendor._id}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-xs sm:text-sm text-gray-600">Login Attempts</span>
                  <span className="text-xs sm:text-sm text-gray-900 font-semibold">{vendor.loginAttempts}</span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-xs sm:text-sm text-gray-600">Role</span>
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                    {vendor.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                Activity Timeline
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Last Login</p>
                    <p className="text-xs text-gray-600 break-words">{formatDate(vendor.lastLogin)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Account Created</p>
                    <p className="text-xs text-gray-600 break-words">{formatDate(vendor.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-900">Last Updated</p>
                    <p className="text-xs text-gray-600 break-words">{formatDate(vendor.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Verification Status</h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className={`p-3 sm:p-4 rounded-lg border-2 ${vendor.isEmailVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center justify-center mb-2">
                    {vendor.isEmailVerified ? (
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                    )}
                  </div>
                  <p className="text-center text-xs sm:text-sm font-medium text-gray-900">Email</p>
                  <p className={`text-center text-xs mt-1 ${vendor.isEmailVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {vendor.isEmailVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>

                <div className={`p-3 sm:p-4 rounded-lg border-2 ${vendor.isPhoneVerified ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center justify-center mb-2">
                    {vendor.isPhoneVerified ? (
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    ) : (
                      <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                    )}
                  </div>
                  <p className="text-center text-xs sm:text-sm font-medium text-gray-900">Phone</p>
                  <p className={`text-center text-xs mt-1 ${vendor.isPhoneVerified ? 'text-green-600' : 'text-red-600'}`}>
                    {vendor.isPhoneVerified ? 'Verified' : 'Not Verified'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 sm:space-y-3 pt-4 border-t border-gray-200">
              {vendor.accountStatus === 'active' ? (
                <button className="w-full bg-red-100 text-red-700 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-red-200 transition-colors">
                  Suspend Account
                </button>
              ) : (
                <button className="w-full bg-green-100 text-green-700 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-green-200 transition-colors">
                  Activate Account
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
