"use client";

import React from 'react';
import { 
  Users, UserCheck, Image, ShoppingBag, Shield, HelpCircle 
} from 'lucide-react';

interface SuperAdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SuperAdminSidebar({ activeTab, onTabChange }: SuperAdminSidebarProps) {
  const menuItems = [
    { id: 'vendors', label: 'Vendor Management', icon: Users },
    { id: 'customers', label: 'Customer Management', icon: UserCheck },
    { id: 'hero-images', label: 'Hero Image Management', icon: Image },
    { id: 'total-orders', label: 'Total Orders', icon: ShoppingBag }
  ];

  return (
    <div className="w-72 shrink-0 hidden lg:block">
      <div className="rounded-2xl border border-orange-200 p-4 sticky top-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Super Admin</h2>
            <p className="text-sm text-gray-600">Platform Control</p>
          </div>
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm lg:text-base">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Admin Support */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-orange-500 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
            <span className="text-sm lg:text-base">Admin Support</span>
            <HelpCircle className="w-5 h-5" />
          </button>
          <p className="text-xs text-gray-600 text-center mt-3">
            Technical Issues?{' '}
            <a href="mailto:admin@caterbazar.com" className="text-orange-500 hover:underline">
              admin@caterbazar.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}