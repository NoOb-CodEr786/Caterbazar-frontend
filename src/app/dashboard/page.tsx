"use client";

import React, { useState } from 'react';
import Sidebar from '@/components/Dashboard/Sidebar';
import MobileMenu from '@/components/Dashboard/MobileMenu';
import DashboardOverview from '@/components/Dashboard/DashboardOverview';
import PersonalInfo from '@/components/Dashboard/PersonalInfo';
import BusinessDetails from '@/components/Dashboard/BusinessDetails';
import GalleryManagement from '@/components/Dashboard/GalleryManagement';
import SubscriptionPlan from '@/components/Dashboard/SubscriptionPlan';
import ReviewsRatings from '@/components/Dashboard/ReviewsRatings';
import OrdersBookings from '@/components/Dashboard/OrdersBookings';
import SettingsPage from '@/components/Dashboard/SettingsPage';

export default function VendorDashboard() {
  const [activeTab, setActiveTab] = useState('personal');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'personal':
        return <PersonalInfo />;
      case 'business':
        return <BusinessDetails />;
      case 'gallery':
        return <GalleryManagement />;
      case 'subscription':
        return <SubscriptionPlan />;
      case 'reviews':
        return <ReviewsRatings />;
      case 'orders':
        return <OrdersBookings />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex gap-6 lg:gap-8">
          {/* Left Sidebar - Desktop */}
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Right Content */}
          <div className="flex-1 min-w-0">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}