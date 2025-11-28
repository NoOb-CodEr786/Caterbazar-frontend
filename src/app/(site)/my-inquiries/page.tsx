"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getMyInquiries, cancelInquiry, Inquiry } from '@/api/user/inquiry.api';
import { getMyReviews, Review } from '@/api/user/review.api';
import { Calendar, MessageSquare, Star, Trash2, Eye, Phone, User as UserIcon, CheckCircle, Clock, Package, Edit } from 'lucide-react';
import ReviewModal from '@/components/Modals/ReviewModal';

export default function MyInquiriesPage() {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'reviews'>('inquiries');
  const [loading, setLoading] = useState(true);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/auth");
      return;
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!loading) {
      if (activeTab === 'inquiries') {
        fetchInquiries();
      } else {
        fetchReviews();
      }
    }
  }, [activeTab, statusFilter, currentPage, loading]);

  const fetchInquiries = async () => {
    setInquiriesLoading(true);
    try {
      const params: any = { page: currentPage, limit: 10 };
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await getMyInquiries(params);
      if (response.success) {
        setInquiries(response.data.inquiries);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error: any) {
      console.error("Failed to fetch inquiries:", error);
      if (error.response?.status === 401) {
        router.push("/auth");
      }
    } finally {
      setInquiriesLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await getMyReviews({ page: currentPage, limit: 10 });
      if (response.success) {
        setReviews(response.data.reviews);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error: any) {
      console.error("Failed to fetch reviews:", error);
      if (error.response?.status === 401) {
        router.push("/auth");
      }
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleCancelInquiry = async (inquiryId: string) => {
    if (!confirm("Are you sure you want to cancel this inquiry?")) return;

    try {
      const response = await cancelInquiry(inquiryId);
      if (response.success) {
        fetchInquiries();
      }
    } catch (error) {
      console.error("Failed to cancel inquiry:", error);
      alert("Failed to cancel inquiry. Please try again.");
    }
  };

  const handleWriteReview = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setIsReviewModalOpen(true);
  };

  const handleReviewSuccess = () => {
    fetchInquiries();
    fetchReviews();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      contacted: 'bg-blue-100 text-blue-800',
      converted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">My Activity</h1>
          <p className="text-gray-600 mt-1">Track your inquiries and reviews</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('inquiries');
                  setCurrentPage(1);
                }}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'inquiries'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  My Inquiries
                </div>
              </button>
              <button
                onClick={() => {
                  setActiveTab('reviews');
                  setCurrentPage(1);
                }}
                className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                  activeTab === 'reviews'
                    ? 'text-orange-600 border-b-2 border-orange-600'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5" />
                  My Reviews
                </div>
              </button>
            </div>
          </div>

          {/* Inquiries Tab Content */}
          {activeTab === 'inquiries' && (
            <div className="p-6">
              {/* Status Filter */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {['all', 'pending', 'contacted', 'converted', 'rejected', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        statusFilter === status
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries List */}
              {inquiriesLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading inquiries...</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No inquiries found</p>
                  <button
                    onClick={() => router.push('/vendors')}
                    className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Browse Vendors
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry._id}
                      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {typeof inquiry.vendorId === 'object' && inquiry.vendorId.fullName}
                              </h3>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusBadge(inquiry.status)}
                                {inquiry.viewedByVendor && (
                                  <span className="flex items-center gap-1 text-xs text-blue-600">
                                    <Eye className="w-3 h-3" />
                                    Viewed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>Event: {formatDate(inquiry.eventDate)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-gray-400" />
                              <span>{inquiry.eventType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <UserIcon className="w-4 h-4 text-gray-400" />
                              <span>{inquiry.guestCount} Guests</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>Sent: {formatDate(inquiry.createdAt)}</span>
                            </div>
                          </div>

                          {inquiry.message && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{inquiry.message}</p>
                            </div>
                          )}

                          {inquiry.vendorResponse?.message && (
                            <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                              <p className="text-sm font-semibold text-blue-900 mb-1">Vendor Response:</p>
                              <p className="text-sm text-blue-800">{inquiry.vendorResponse.message}</p>
                              <p className="text-xs text-blue-600 mt-1">
                                {formatDate(inquiry.vendorResponse.respondedAt!)}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          {inquiry.status === 'pending' && (
                            <button
                              onClick={() => handleCancelInquiry(inquiry._id)}
                              className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap"
                            >
                              <Trash2 className="w-4 h-4" />
                              Cancel
                            </button>
                          )}
                          {(inquiry.status === 'converted' || inquiry.status === 'contacted') && (
                            <>
                              {getStatusBadge(inquiry.status)}
                              <button
                                onClick={() => handleWriteReview(inquiry)}
                                className="flex items-center gap-2 px-4 py-2 text-orange-600 border border-orange-300 rounded-lg hover:bg-orange-50 transition-colors whitespace-nowrap"
                              >
                                <Edit className="w-4 h-4" />
                                Write Review
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === 'reviews' && (
            <div className="p-6">
              {reviewsLoading ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No reviews yet</p>
                  <p className="text-gray-400 text-sm mt-2">Reviews will appear here after your events</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">
                            {review.vendorId.fullName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {review.inquiryId.eventType.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} • {formatDate(review.inquiryId.eventDate)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-lg">{review.rating}</span>
                        </div>
                      </div>

                      {review.title && (
                        <h4 className="text-base font-semibold text-gray-900 mb-2">{review.title}</h4>
                      )}

                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-xs text-gray-600">Food Quality</div>
                          <div className="font-semibold text-orange-600">{review.foodQuality}/5</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-xs text-gray-600">Service</div>
                          <div className="font-semibold text-orange-600">{review.serviceQuality}/5</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-xs text-gray-600">Value</div>
                          <div className="font-semibold text-orange-600">{review.valueForMoney}/5</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-xs text-gray-600">Hygiene</div>
                          <div className="font-semibold text-orange-600">{review.hygiene}/5</div>
                        </div>
                      </div>

                      {review.vendorResponse && (
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Vendor Response:</p>
                          <p className="text-sm text-blue-800">{review.vendorResponse.message}</p>
                          <p className="text-xs text-blue-600 mt-1">
                            {formatDate(review.vendorResponse.respondedAt)}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                        <span>Posted: {formatDate(review.createdAt)}</span>
                        {review.isVerified && (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            Verified Purchase
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedInquiry && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => {
            setIsReviewModalOpen(false);
            setSelectedInquiry(null);
          }}
          vendorId={typeof selectedInquiry.vendorId === 'object' ? selectedInquiry.vendorId._id : selectedInquiry.vendorId}
          vendorName={typeof selectedInquiry.vendorId === 'object' ? selectedInquiry.vendorId.fullName : ''}
          inquiryId={selectedInquiry._id}
          onSuccess={handleReviewSuccess}
        />
      )}
    </div>
  );
}
