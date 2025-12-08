'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Users, Star, MapPin, Loader2 } from 'lucide-react';
import { searchVendors, VendorData } from '@/api/user/public.api';
import { useRouter } from 'next/navigation';

// Demo data for initial display
const DEMO_VENDORS = [
  {
    userId: {
      _id: 'demo1',
      fullName: 'Maharaja Catering Co.',
    },
    address: {
      locality: 'Bhubaneswar',
      state: 'Odisha',
    },
    stats: {
      averageRating: 4.8,
      totalReviews: 156,
    },
    isCaterbazarChoice: true,
    profilePhoto: 'https://images.unsplash.com/photo-1585433389778-2649c0d3c1da?q=80&w=1630&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [],
  },
  {
    userId: {
      _id: 'demo2',
      fullName: 'Royal Feast Kitchen',
    },
    address: {
      locality: 'Bhubaneswar',
      state: 'Odisha',
    },
    stats: {
      averageRating: 4.7,
      totalReviews: 128,
    },
    isCaterbazarChoice: false,
    profilePhoto: 'https://images.unsplash.com/photo-1745176593939-261033cced25?q=80&w=1394&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [],
  },
  {
    userId: {
      _id: 'demo3',
      fullName: 'Golden Spoon Events',
    },
    address: {
      locality: 'Bhubaneswar',
      state: 'Odisha',
    },
    stats: {
      averageRating: 4.6,
      totalReviews: 98,
    },
    isCaterbazarChoice: true,
    profilePhoto: 'https://plus.unsplash.com/premium_photo-1695799627985-45c843f956ba?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gallery: [],
  },
  {
    userId: {
      _id: 'demo4',
      fullName: 'Flavour Paradise',
    },
    address: {
      locality: 'Bhubaneswar',
      state: 'Odisha',
    },
    stats: {
      averageRating: 4.5,
      totalReviews: 87,
    },
    isCaterbazarChoice: false,
    profilePhoto: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    gallery: [],
  },
];

export default function CaterersSection() {
  const router = useRouter();
  const [vendors, setVendors] = useState<any[]>(DEMO_VENDORS);
  const [loading, setLoading] = useState(true);
  const [locality, setLocality] = useState('Bhubaneswar');

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await searchVendors({
        locality: locality,
        page: 1,
        limit: 4,
      });
      if (response.success && response.data.vendors.length > 0) {
        setVendors(response.data.vendors);
      } else {
        // Keep demo data if no API data is available
        setVendors(DEMO_VENDORS);
      }
    } catch (error) {
      console.error('Error fetching vendors:', error);
      // Keep demo data on error
      setVendors(DEMO_VENDORS);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      food_catering: 'Food Catering',
      decoration: 'Decoration',
      photography: 'Photography',
      venue: 'Venue',
    };
    return labels[category] || category;
  };

  const getVendorImage = (vendor: any) => {
    // First, try to get setup category image from gallery
    const setupImage = vendor.gallery?.find((img: any) => img.category === 'setup');
    if (setupImage) {
      return setupImage.url;
    }
    
    // Fallback to profile photo
    if (vendor.profilePhoto) {
      return vendor.profilePhoto;
    }
    
    // Placeholder image when no image is available
    return 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 lg:mb-4">
            <span className="text-orange-400">Find Local Caterers</span>{' '}
            <span className="text-orange-500 italic">You'll Love!</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
            Handpicked professionals making every event unforgettable.
          </p>
        </div>

        {/* Grid Layout */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-orange-500" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Left Column - 4 Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 items-start">
              {vendors.slice(0, 4).map((vendor, index) => (
                <div
                  key={vendor?.userId?._id}
                  // onClick={() => router.push(`/vendors/${vendor?.userId?._id}`)}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl"
                >
                  <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src={getVendorImage(vendor)}
                      alt={vendor.userId.fullName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    {vendor.isCaterbazarChoice && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                        Top Choice
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4 lg:p-5 bg-white">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate">
                        {vendor.userId.fullName}
                      </h3>
                      <button className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 transition-all shrink-0">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm truncate">{vendor.address.locality}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs sm:text-sm">
                          {vendor.stats.averageRating.toFixed(1)} ({vendor.stats.totalReviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Large Image */}
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl h-64 sm:h-80 lg:min-h-[630px]">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Buffet spread"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}