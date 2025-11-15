"use client";

import React, { useState } from 'react';
import { 
  Upload, Image as ImageIcon, Edit, Trash2, Eye, Plus, 
  MoreVertical, Calendar, ToggleLeft, ToggleRight 
} from 'lucide-react';

export default function HeroImageManagement() {
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock hero images data
  const heroImages = [
    {
      id: 1,
      title: 'Premium Wedding Catering',
      description: 'Elegant catering solutions for your special day',
      imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400',
      isActive: true,
      position: 1,
      createdDate: '2024-10-15',
      clickCount: 1247,
      conversionRate: '8.5%'
    },
    {
      id: 2,
      title: 'Corporate Event Catering',
      description: 'Professional catering for corporate events and meetings',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
      isActive: true,
      position: 2,
      createdDate: '2024-10-20',
      clickCount: 892,
      conversionRate: '6.2%'
    },
    {
      id: 3,
      title: 'Traditional Indian Cuisine',
      description: 'Authentic flavors from across India',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      isActive: false,
      position: 3,
      createdDate: '2024-11-01',
      clickCount: 456,
      conversionRate: '4.7%'
    },
    {
      id: 4,
      title: 'Outdoor BBQ Catering',
      description: 'Perfect for outdoor events and gatherings',
      imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400',
      isActive: true,
      position: 4,
      createdDate: '2024-09-28',
      clickCount: 723,
      conversionRate: '7.1%'
    }
  ];

  const toggleImageStatus = (imageId: number) => {
    // In a real app, this would make an API call
    console.log(`Toggling status for image ${imageId}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Hero Image Management</h2>
          <p className="text-gray-600 mt-1">Manage homepage hero images and banners</p>
        </div>
        
        <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
          <Plus className="w-5 h-5" />
          Add New Image
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Images</p>
              <p className="text-2xl font-bold text-blue-900">12</p>
            </div>
            <ImageIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Active Images</p>
              <p className="text-2xl font-bold text-green-900">8</p>
            </div>
            <ToggleRight className="w-8 h-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-900">45,231</p>
            </div>
            <Eye className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Avg. Conversion</p>
              <p className="text-2xl font-bold text-orange-900">6.8%</p>
            </div>
            <Upload className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Image Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 hover:border-orange-400 transition-colors">
        <div className="text-center">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Hero Image</h3>
          <p className="text-gray-600 mb-4">Drag and drop your image here, or click to browse</p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Choose File
          </button>
          <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WebP (Max 5MB, 1920x1080 recommended)</p>
        </div>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {heroImages.map((image) => (
          <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            {/* Image Preview */}
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={image.imageUrl} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  Position {image.position}
                </span>
                <button
                  onClick={() => toggleImageStatus(image.id)}
                  className={`p-1 rounded ${
                    image.isActive ? 'text-green-500' : 'text-gray-500'
                  }`}
                >
                  {image.isActive ? (
                    <ToggleRight className="w-6 h-6" />
                  ) : (
                    <ToggleLeft className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>

            {/* Image Details */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600">{image.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Status and Metrics */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{image.createdDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{image.clickCount.toLocaleString()} clicks</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    image.isActive 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {image.isActive ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {image.conversionRate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Editor Modal would go here */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal content would go here */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Edit Hero Image</h3>
              {/* Form fields for editing image */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}