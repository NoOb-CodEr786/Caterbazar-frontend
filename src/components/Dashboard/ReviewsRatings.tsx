'use client';

import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, Image as ImageIcon } from 'lucide-react';

interface Review {
  id: number;
  customerName: string;
  customerAvatar: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  images: string[];
  eventType: string;
  helpfulCount: number;
  notHelpfulCount: number;
}

export default function ReviewsRatings() {
  const [reviews] = useState<Review[]>([
    {
      id: 1,
      customerName: 'Sarah M.',
      customerAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      date: '3 days ago',
      verified: true,
      title: 'Absolutely phenomenal catering service!',
      content: 'The team exceeded all our expectations for our wedding reception. Every dish was perfectly prepared and beautifully presented. The staff was professional, courteous, and went above and beyond to ensure our special day was perfect. Our guests are still talking about how amazing the food was!',
      images: [
        'https://images.unsplash.com/photo-1555244162-803834f70033?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop'
      ],
      eventType: 'Wedding Reception',
      helpfulCount: 12,
      notHelpfulCount: 0
    },
    {
      id: 2,
      customerName: 'Rajesh K.',
      customerAvatar: 'https://i.pravatar.cc/150?img=12',
      rating: 5,
      date: '1 week ago',
      verified: true,
      title: 'Outstanding service and delicious food!',
      content: 'We hired them for our corporate event and they delivered exceptional service. The presentation was elegant, the food quality was top-notch, and they were very professional. Highly recommend for any event!',
      images: [],
      eventType: 'Corporate Event',
      helpfulCount: 8,
      notHelpfulCount: 0
    },
    {
      id: 3,
      customerName: 'Priya S.',
      customerAvatar: 'https://i.pravatar.cc/150?img=5',
      rating: 4,
      date: '2 weeks ago',
      verified: true,
      title: 'Great experience overall',
      content: 'Really good food and service. The team was punctual and well-organized. Only minor issue was some dishes could have been a bit warmer, but overall a great experience for our engagement party.',
      images: [
        'https://images.unsplash.com/photo-1530062845289-9109b2c9c868?w=300&h=300&fit=crop'
      ],
      eventType: 'Engagement Party',
      helpfulCount: 5,
      notHelpfulCount: 1
    },
    {
      id: 4,
      customerName: 'Amit P.',
      customerAvatar: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      date: '3 weeks ago',
      verified: true,
      title: 'Perfect for our anniversary celebration',
      content: 'The catering was absolutely perfect for our 25th anniversary. Every detail was taken care of, and the food was exceptional. Our guests loved the variety and quality.',
      images: [],
      eventType: 'Anniversary',
      helpfulCount: 6,
      notHelpfulCount: 0
    }
  ]);

  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 }
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Reviews & Ratings</h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Manage Reviews</p>


      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className=" rounded-xl p-4 sm:p-6 border border-gray-200">
            {/* Review Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                <img 
                  src={review.customerAvatar} 
                  alt={review.customerName}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      {review.customerName}
                    </h3>
                    {review.verified && (
                      <span className="flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 text-xs rounded-full shrink-0">
                        <CheckCircle className="w-3 h-3" />
                        Verified Booking
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${
                            star <= review.rating 
                              ? 'fill-yellow-400 text-yellow-400' 
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <button className="px-4 sm:px-6 py-2 border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition-colors text-sm sm:text-base font-medium shrink-0">
                Reply
              </button>
            </div>

            {/* Review Content */}
            <div className="mb-4">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {review.title}
              </h4>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {review.content}
              </p>
            </div>

            {/* Review Images */}
            {review.images.length > 0 && (
              <div className="flex gap-2 sm:gap-3 mb-4 overflow-x-auto pb-2">
                {review.images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover shrink-0"
                  />
                ))}
              </div>
            )}

            {/* Review Footer */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
              <span className="text-xs sm:text-sm text-gray-600">Was this helpful?</span>
              <button className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm font-medium">{review.helpfulCount}</span>
              </button>
              <button className="flex items-center gap-1.5 text-gray-600 hover:text-orange-500 transition-colors">
                <ThumbsUp className="w-4 h-4 rotate-180" />
                <span className="text-sm font-medium">{review.notHelpfulCount}</span>
              </button>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs sm:text-sm rounded-full font-medium">
                {review.eventType}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
