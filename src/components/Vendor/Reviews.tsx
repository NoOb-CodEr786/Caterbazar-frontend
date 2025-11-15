"use client";
import React, { useState } from 'react';
import { Star, ThumbsUp, ChevronDown, ChevronRight } from 'lucide-react';

export default function ReviewsSection() {
  const [sortBy, setSortBy] = useState('Newest');
  const [filterStars, setFilterStars] = useState<number | null>(null);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      avatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: '3 days ago',
      verified: true,
      title: 'Absolutely phenomenal catering service!',
      content: 'The team exceeded all our expectations for our wedding reception. Every dish was perfectly prepared and beautifully presented. The staff was professional, courteous, and went above and beyond to ensure our special day was perfect. Our guests are still talking about how amazing the food was!',
      images: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=300',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300'
      ],
      helpful: 12,
      notHelpful: 0,
      eventType: 'Wedding Reception'
    },
    {
      id: 2,
      name: 'Michael R.',
      avatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      date: '1 week ago',
      verified: true,
      title: 'Perfect for our corporate event',
      content: 'Hired them for our company\'s annual dinner and they delivered excellence. The menu variety was impressive, dietary restrictions were handled seamlessly, and the presentation was top-notch. Highly recommend for any corporate gathering.',
      images: [],
      helpful: 8,
      notHelpful: 1,
      eventType: 'Corporate Event'
    },
    {
      id: 3,
      name: 'Emma L.',
      avatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      date: '2 weeks ago',
      verified: false,
      title: 'Great food, minor timing issues',
      content: 'The quality of food was excellent and our guests loved the variety. However, there were some minor delays in service timing during our birthday celebration. Overall satisfied and would consider booking again.',
      images: [],
      helpful: 4,
      notHelpful: 2,
      eventType: 'Birthday Party'
    }
  ];

  const ratingBreakdown = [
    { stars: 5, percentage: 78, count: 192 },
    { stars: 4, percentage: 15, count: 37 },
    { stars: 3, percentage: 4, count: 10 },
    { stars: 2, percentage: 2, count: 5 },
    { stars: 1, percentage: 1, count: 4 }
  ];

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Albums Section */}
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Albums</h2>
            <button className="text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-1 text-sm sm:text-base">
              View all
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar pb-2">
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400"
                alt="Menu"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white font-semibold text-sm sm:text-base">Menu</span>
            </div>
            <div className="relative w-28 h-36 sm:w-32 sm:h-40 shrink-0 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400"
                alt="Moments"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 text-white font-semibold text-sm sm:text-base">Moments</span>
            </div>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="mb-6 sm:mb-8">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Overall Rating */}
            <div className="text-center md:text-left">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="flex items-center gap-1 mb-2 justify-center md:justify-start">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600">248 Reviews</p>
            </div>

            {/* Right: Rating Breakdown */}
            <div className="space-y-2">
              {ratingBreakdown.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-700 w-6 sm:w-8">{rating.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                    <div
                      className="bg-orange-400 h-full rounded-full transition-all duration-300"
                      style={{ width: `${rating.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 w-10 sm:w-12 text-right">{rating.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm sm:text-base">
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              Write a Review
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="border border-gray-200 px-3 sm:px-4 py-4 sm:py-5 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 sm:gap-4">
            {/* Sort By */}
            <div className="flex items-center gap-2 w-full lg:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Sort by:</span>
              <div className="relative flex-1 lg:flex-initial">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full lg:w-auto px-3 sm:px-4 py-2 pr-8 sm:pr-10 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium appearance-none bg-white cursor-pointer hover:border-gray-400"
                >
                  <option>Newest</option>
                  <option>Highest Rating</option>
                  <option>Lowest Rating</option>
                  <option>Most Helpful</option>
                </select>
                <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filter by Stars */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Filter:</span>
              <div className="flex gap-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    onClick={() => setFilterStars(filterStars === star ? null : star)}
                    className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                      filterStars === star
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {star}★
                  </button>
                ))}
              </div>
            </div>

            {/* Verified Only Toggle */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700 whitespace-nowrap">Verified Only</span>
              <button
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={`relative w-11 h-6 sm:w-12 sm:h-6 rounded-full transition-colors ${
                  verifiedOnly ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform shadow-sm ${
                    verifiedOnly ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 sm:space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Avatar */}
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">{review.name}</h3>
                    {review.verified && (
                      <span className="bg-green-100 text-green-700 text-[10px] sm:text-xs px-2 py-0.5 sm:py-1 rounded-full font-medium flex items-center gap-1 w-fit">
                        ✓ Verified Booking
                      </span>
                    )}
                  </div>

                  {/* Rating and Date */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            star <= review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">{review.date}</span>
                    {review.eventType && (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-medium">
                        {review.eventType}
                      </span>
                    )}
                  </div>

                  {/* Review Title */}
                  <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base leading-snug">{review.title}</h4>

                  {/* Review Content */}
                  <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">{review.content}</p>

                  {/* Images */}
                  {review.images.length > 0 && (
                    <div className="flex gap-2 mb-3 sm:mb-4 overflow-x-auto hide-scrollbar pb-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt={`Review ${idx + 1}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}

                  {/* Helpful Section */}
                  <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-gray-100">
                    <span className="text-xs sm:text-sm text-gray-600">Was this helpful?</span>
                    <button className="flex items-center gap-1 sm:gap-1.5 text-gray-600 hover:text-orange-500 transition-colors">
                      <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">{review.helpful}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-6 sm:mt-8">
          <button className="w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-orange-500 hover:text-orange-500 transition-colors text-sm sm:text-base">
            Load More Reviews
          </button>
        </div>
      </div>
    </div>
  );
}