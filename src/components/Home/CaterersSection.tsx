import React from 'react';
import { ArrowRight, Users, Gift, Utensils, Leaf } from 'lucide-react';

export default function CaterersSection() {
  const categories = [
    {
      title: 'Wedding Caterers',
      count: '20, 456',
      icon: Users,
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Birthday Parties',
      count: '14, 654',
      icon: Gift,
      image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Buffet Specialists',
      count: '2, 460',
      icon: Utensils,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Pure Veg Caterers',
      count: '8, 912',
      icon: Leaf,
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

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
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Column - 4 Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer rounded-xl"
                >
                  {/* Image */}
                  <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 lg:p-5 bg-white">
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                      <button className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-orange-500 group-hover:bg-orange-500 transition-all shrink-0">
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-white transition-colors" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-600">
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{category.count} available</span>
                    </div>
                  </div>
                </div>
              );
            })}
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
      </div>
    </div>
  );
}