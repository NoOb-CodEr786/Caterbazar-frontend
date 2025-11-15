'use client';

import React from 'react';
import { X, FolderPlus } from 'lucide-react';

export default function GalleryManagement() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Gallery Management</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Manage Gallery Images</p>

      <div className="space-y-6">
        {/* Menu Upload Card */}
        <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-2xl">
          <div className="p-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Menu Upload</h2>
                <p className="text-sm text-gray-600">Add your documents here, and you can upload up to 5 files max</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FolderPlus className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-700 font-medium mb-2">Drag your file(s) to start uploading</p>
              <p className="text-gray-500 text-sm mb-4">OR</p>
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Browse files
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Only support .jpg, .png and .mp4 files</p>
          </div>

          <div className="p-2 flex justify-end gap-3">
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>

        {/* Highlights Upload Card */}
        <div className=" p-5 bg-white rounded-2xl shadow-lg border border-gray-200 max-w-2xl">
          <div className="p-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Highlights Upload</h2>
                <p className="text-sm text-gray-600">Add Highlight images and videos</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <FolderPlus className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-700 font-medium mb-2">Drag your file(s) to start uploading</p>
              <p className="text-gray-500 text-sm mb-4">OR</p>
              <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Browse files
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">Only support .jpg, .png and .mp4 files</p>
          </div>

          <div className="p-2 flex justify-end gap-3">
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
