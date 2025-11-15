import React from 'react';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Settings</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Manage your account settings and preferences</p>
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Notification Preferences</h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded" 
              />
              <span className="text-sm sm:text-base text-gray-700">Email notifications for new bookings</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                defaultChecked 
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded" 
              />
              <span className="text-sm sm:text-base text-gray-700">SMS alerts for important updates</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 rounded" 
              />
              <span className="text-sm sm:text-base text-gray-700">Marketing communications</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Password & Security</h3>
          <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg text-sm sm:text-base font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
