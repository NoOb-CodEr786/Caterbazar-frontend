"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  MapPin,
  Heart,
  Share2,
  HelpCircle,
  ChevronRight,
  MessageCircle,
  Facebook,
  Instagram,
  Globe,
  Users,
  Calendar,
  Award,
  Shield,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { VendorProfileData, GalleryImage } from "@/api/user/public.api";
import InquiryModal from "@/components/Modals/InquiryModal";

interface VendorDetailsPageProps {
  vendor: VendorProfileData;
  setupImages: GalleryImage[];
}

export default function VendorDetailsPage({
  vendor,
  setupImages,
}: VendorDetailsPageProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Format cuisine options for display
  const formatText = (text: string) => {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Check if user is logged in
  const isUserLoggedIn = (): boolean => {
    const accessToken = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("userRole");
    return !!(accessToken && userRole === "user");
  };

  // Handle inquiry button click - check login status
  const handleInquiryClick = () => {
    if (!isUserLoggedIn()) {
      // Redirect to customer signin
      router.push("/auth/customer/signin");
      return;
    }
    // Open inquiry modal if user is logged in
    setIsInquiryModalOpen(true);
  };

  // Generate share text
  const getShareText = () => {
    const brandName =
      vendor.businessRegistrationId?.brandName || vendor.userId.fullName;
    const location = `${vendor.address.locality}, ${vendor.address.state}`;
    const rating = vendor.stats.averageRating.toFixed(1);
    return `Check out ${brandName} - A top-rated caterer in ${location} with ${rating}⭐ rating on Caterbazar!`;
  };

  // Get current page URL
  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.href;
    }
    return "";
  };

  // Handle copy to clipboard
  const handleCopyLink = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Generate social sharing links
  const generateShareLinks = () => {
    const shareText = getShareText();
    const shareUrl = getShareUrl();

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`,
    };
  };

  const shareLinks = generateShareLinks();

  const cuisineDisplay = vendor.pricing.cuisineOptions
    .map(formatText)
    .slice(0, 3)
    .join(", ");

  // Get current image to display
  const currentImage =
    setupImages.length > 0
      ? setupImages[currentImageIndex].url
      : vendor.profilePhoto ||
        "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-2 hidden sm:block">
        <div className="container mx-auto px-4 sm:px-6 py-2 sm:py-3">
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm overflow-x-auto hide-scrollbar">
            <a
              href="/"
              className="text-orange-500 hover:text-orange-600 whitespace-nowrap"
            >
              Home
            </a>
            <span className="text-gray-400">/</span>
            <a
              href="/vendors"
              className="text-orange-500 hover:text-orange-600 whitespace-nowrap"
            >
              Vendors
            </a>
            <span className="text-gray-400">/</span>
            <a
              href={`/vendors?state=${vendor.address.state}`}
              className="text-orange-500 hover:text-orange-600 whitespace-nowrap"
            >
              {vendor.address.state}
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700 whitespace-nowrap">
              {vendor.businessRegistrationId?.brandName ||
                vendor.userId.fullName}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Mobile: Image First */}
          <div className="lg:hidden">
            {/* Hero Image Gallery */}
            <div className="bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md group">
              <div className="relative aspect-video sm:aspect-[16/10] lg:aspect-[16/9]">
                <img
                  src={currentImage}
                  alt={
                    vendor.businessRegistrationId?.brandName ||
                    vendor.userId.fullName
                  }
                  className="w-full h-full object-cover"
                />

                {/* Image Counter */}
                {setupImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    {currentImageIndex + 1} / {setupImages.length}
                  </div>
                )}

                {/* Navigation Arrows for larger screens */}
                {setupImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? setupImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === setupImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {setupImages.length > 1 && (
                <div className="p-3 sm:p-4 bg-gray-50 flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar">
                  {setupImages.map((image, index) => (
                    <button
                      key={image._id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile: Price Card */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md">
              {/* Pricing */}
              {vendor.capacity.vendorCategory === "full_catering" ||
              vendor.capacity.vendorCategory === "other" ? (
                <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div className="border-r-2 border-gray-200">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-0.5 sm:mb-1">
                      Veg
                    </h3>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        ₹{vendor.pricing.vegPricePerPlate}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-600">
                        / Plate
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">
                      Non-Veg
                    </h3>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        ₹{vendor.pricing.nonVegPricePerPlate}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-600">
                        / Plate
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                    Starting Price
                  </h3>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      ₹{vendor.pricing.vegPricePerPlate}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-600">
                      / Plate
                    </span>
                  </div>
                </div>
              )}

              {/* Benefits */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">Best Price Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {formatText(vendor.cancellationPolicy.policyType)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {vendor.capacity.advanceBookingTime} advance booking
                  </span>
                </div>
                {vendor.fssaiCertificate?.url && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-[10px] sm:text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-700">FSSAI Certified</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {vendor.profileCompletionPercentage}% Profile Complete
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                {(() => {
                  const getWhatsAppMessage = () => {
                    const brandName =
                      vendor.businessRegistrationId?.brandName ||
                      vendor.userId.fullName;
                    const location = `${vendor.address.locality}, ${vendor.address.state}`;
                    const category = formatText(vendor.capacity.vendorCategory);
                    const cuisines = vendor.pricing.cuisineOptions
                      .map(formatText)
                      .join(", ");
                    const capacity = `${vendor.capacity.minGuests}-${vendor.capacity.maxGuests}`;
                    const rating = vendor.stats.averageRating.toFixed(1);
                    const reviews = vendor.stats.totalReviews;

                    let message = `Hello,\n\n`;
                    message += `*INTERESTED IN CATERING SERVICES*\n\n`;
                    message += `*Vendor Details:*\n`;
                    message += `Vendor: _${brandName}_\n`;
                    message += `Location: _${location}_\n`;
                    message += `Category: _${category}_\n\n`;

                    message += `*Service Information:*\n`;
                    message += `Cuisines: _${cuisines}_\n`;
                    message += `Capacity: _${capacity} guests_\n`;

                    if (
                      vendor.capacity.vendorCategory === "full_catering" ||
                      vendor.capacity.vendorCategory === "other"
                    ) {
                      message += `Veg Price: _₹${vendor.pricing.vegPricePerPlate}/plate_\n`;
                      message += `Non-Veg Price: _₹${vendor.pricing.nonVegPricePerPlate}/plate_\n\n`;
                    } else {
                      message += `Starting Price: _₹${vendor.pricing.vegPricePerPlate}/unit_\n\n`;
                    }

                    message += `*Vendor Rating:*\n`;
                    message += `Rating: _${rating}/5_ (${reviews} reviews)\n`;
                    message += `Profile Complete: _${vendor.profileCompletionPercentage}%_\n\n`;

                    message += `*Please provide details on:*\n`;
                    message += `• Event date availability\n`;
                    message += `• Custom menu options\n`;
                    message += `• Additional charges (if any)\n`;
                    message += `• Booking terms & conditions\n\n`;
                    message += `Thank you!`;

                    return encodeURIComponent(message);
                  };

                  return (
                    <a
                      href={`https://wa.me/8260061212?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  );
                })()}
                <button
                  onClick={handleInquiryClick}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send Inquiry
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-center text-gray-500 mt-3 sm:mt-4">
                *Proceed with our Book Now, Pay Later option!*
              </p>
            </div>
          </div>

          {/* Desktop & Mobile: Product Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Hero Image Gallery - Desktop */}
            <div className="hidden lg:block bg-white rounded-lg sm:rounded-xl overflow-hidden shadow-md group">
              <div className="relative aspect-video sm:aspect-[16/10] lg:aspect-[16/9]">
                <img
                  src={currentImage}
                  alt={
                    vendor.businessRegistrationId?.brandName ||
                    vendor.userId.fullName
                  }
                  className="w-full h-full object-cover"
                />

                {/* Image Counter */}
                {setupImages.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
                    {currentImageIndex + 1} / {setupImages.length}
                  </div>
                )}

                {/* Navigation Arrows for larger screens */}
                {setupImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? setupImages.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === setupImages.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {setupImages.length > 1 && (
                <div className="p-3 sm:p-4 bg-gray-50 flex gap-2 sm:gap-3 overflow-x-auto hide-scrollbar">
                  {setupImages.map((image, index) => (
                    <button
                      key={image._id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? "border-orange-500 ring-2 ring-orange-200"
                          : "border-gray-300 hover:border-orange-300"
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Vendor Info */}
            <div className="px-2 sm:px-0">
              <div className="flex justify-between items-start gap-3 mb-4">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                    About{" "}
                    {vendor.businessRegistrationId?.brandName ||
                      vendor.userId.fullName}
                  </h2>
                  <div className="flex items-center gap-1 my-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs sm:text-sm font-semibold">
                      {vendor.stats.averageRating.toFixed(1)}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">
                      • {vendor.stats.totalReviews} reviews
                    </span>
                  </div>
                </div>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsShareModalOpen(!isShareModalOpen)}
                    className="p-2.5 sm:p-3 bg-orange-50 hover:bg-orange-100 text-orange-500 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                    title="Share this vendor"
                  >
                    <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>

                  {/* Share Modal */}
                  {isShareModalOpen && (
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 sm:p-5 z-10 w-56">
                      <h3 className="font-bold text-gray-900 mb-3 text-sm">
                        Share Vendor
                      </h3>

                      <div className="space-y-2">
                        {/* WhatsApp */}
                        <a
                          href={shareLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        >
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                          <span className="text-gray-700">WhatsApp</span>
                        </a>

                        {/* Facebook */}
                        <a
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        >
                          <Facebook className="w-5 h-5 text-blue-600" />
                          <span className="text-gray-700">Facebook</span>
                        </a>

                        {/* Twitter */}
                        <a
                          href={shareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        >
                          <Twitter className="w-5 h-5 text-black" />
                          <span className="text-gray-700">Twitter (X)</span>
                        </a>

                        {/* LinkedIn */}
                        <a
                          href={shareLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        >
                          <Linkedin className="w-5 h-5 text-blue-700" />
                          <span className="text-gray-700">LinkedIn</span>
                        </a>

                        {/* Email */}
                        <a
                          href={shareLinks.email}
                          className="flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm"
                        >
                          <Mail className="w-5 h-5 text-red-600" />
                          <span className="text-gray-700">Email</span>
                        </a>

                        {/* Copy Link */}
                        <button
                          onClick={handleCopyLink}
                          className="w-full flex items-center gap-3 p-2.5 hover:bg-gray-50 rounded-lg transition-colors text-sm text-left"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-5 h-5 text-green-600" />
                              <span className="text-green-600 font-medium">
                                Link Copied!
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-5 h-5 text-gray-600" />
                              <span className="text-gray-700">Copy Link</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Close on clicking outside */}
                      <div
                        className="fixed inset-0 -z-10"
                        onClick={() => setIsShareModalOpen(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm lg:text-base text-gray-700">
                <p>
                  {vendor.bio ||
                    "Professional catering service dedicated to making your events memorable with exceptional food and service."}
                </p>
                <p>
                  Established in {vendor.businessInfo.yearOfEstablishment}, with{" "}
                  {vendor.businessInfo.yearsInBusiness}+ years of experience in
                  the catering industry.
                </p>
                {vendor.pricing.servicesSpecialization.length > 0 && (
                  <p>
                    Specializing in:{" "}
                    {vendor.pricing.servicesSpecialization
                      .map(formatText)
                      .join(", ")}
                  </p>
                )}
              </div>

              {/* Business Info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Established</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.businessInfo.yearOfEstablishment}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <Award className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Experience</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.businessInfo.yearsInBusiness}+ Years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">Team Size</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.businessInfo.teamSize}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              {(vendor.socialMedia?.facebookHandle ||
                vendor.socialMedia?.instagramHandle ||
                vendor.socialMedia?.personalWebsite) && (
                <div className="mt-6">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                    Connect With Us
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {vendor.socialMedia.facebookHandle && (
                      <a
                        href={vendor.socialMedia.facebookHandle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </a>
                    )}
                    {vendor.socialMedia.instagramHandle && (
                      <a
                        href={vendor.socialMedia.instagramHandle}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </a>
                    )}
                    {vendor.socialMedia.personalWebsite && (
                      <a
                        href={vendor.socialMedia.personalWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        <Globe className="w-4 h-4" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* FSSAI Certificate */}
              {vendor.fssaiCertificate?.url && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-green-900 mb-1">
                        FSSAI Certified
                      </h3>
                      <p className="text-sm text-green-700 mb-3">
                        This vendor is certified by the Food Safety and
                        Standards Authority of India
                      </p>
                      <a
                        href={vendor.fssaiCertificate.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium"
                      >
                        View Certificate
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Operations Info */}
              <div className="mt-6">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3">
                  Operations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">
                      Languages Spoken
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.operations.languagesSpoken
                        .map(formatText)
                        .join(", ")}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Service Radius</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.operations.operationalRadius} km
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">
                      Advance Booking
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.operations.weeksAdvanceBooking} weeks minimum
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Profile Views</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {vendor.analytics?.profileViews || 0} views
                    </p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4  mb-4 sm:mb-6 mt-6 sm:mt-10">
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">
                    Cuisines
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    {vendor.pricing.cuisineOptions
                      .map(formatText)
                      .slice(0, 5)
                      .join(", ")}
                  </p>
                  {vendor.pricing.cuisineOptions.length > 5 && (
                    <p className="text-[10px] text-orange-600 mt-1">
                      +{vendor.pricing.cuisineOptions.length - 5} more
                    </p>
                  )}
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">
                    {vendor.capacity.minGuests}-{vendor.capacity.maxGuests}{" "}
                    Guests
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Flexible capacity
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">
                    {vendor.stats.totalOrders || 0}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Orders Completed
                  </p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5 sm:mb-1">
                    {vendor.analytics?.responseRate || 0}%
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-600">
                    Response Rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Pricing Card (Desktop Only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md lg:sticky lg:top-24">
              {/* Discount Badge */}
              {/* <div className="inline-block bg-yellow-400 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4">
                30% Off
              </div> */}

              {/* Pricing */}
              {vendor.capacity.vendorCategory === "full_catering" ||
              vendor.capacity.vendorCategory === "other" ? (
                <div className="grid grid-cols-2 gap-4 mb-4 sm:mb-6">
                  <div className="border-r-2 border-gray-200">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600 mb-0.5 sm:mb-1">
                      Veg
                    </h3>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        ₹{vendor.pricing.vegPricePerPlate}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-600">
                        / Plate
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-600 mb-0.5 sm:mb-1">
                      Non-Veg
                    </h3>
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        ₹{vendor.pricing.nonVegPricePerPlate}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-600">
                        / Plate
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">
                    Starting Price
                  </h3>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                      ₹{vendor.pricing.vegPricePerPlate}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-600">
                      / Plate
                    </span>
                  </div>
                </div>
              )}

              {/* Profile Stats */}
              {/* <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 mb-4 sm:mb-6">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{vendor.stats.totalOrders || 0}</p>
                    <p className="text-[10px] sm:text-xs text-gray-600">Total Orders</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">{vendor.stats.totalCustomers || 0}</p>
                    <p className="text-[10px] sm:text-xs text-gray-600">Happy Customers</p>
                  </div>
                </div>
              </div> */}

              {/* Benefits */}
              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">Best Price Guaranteed</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {formatText(vendor.cancellationPolicy.policyType)}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {vendor.capacity.advanceBookingTime} advance booking
                  </span>
                </div>
                {vendor.fssaiCertificate?.url && (
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                      <span className="text-green-600 text-[10px] sm:text-xs">
                        ✓
                      </span>
                    </div>
                    <span className="text-gray-700">FSSAI Certified</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded flex items-center justify-center shrink-0">
                    <span className="text-green-600 text-[10px] sm:text-xs">
                      ✓
                    </span>
                  </div>
                  <span className="text-gray-700">
                    {vendor.profileCompletionPercentage}% Profile Complete
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 sm:space-y-3">
                {(() => {
                  const getWhatsAppMessage = () => {
                    const brandName =
                      vendor.businessRegistrationId?.brandName ||
                      vendor.userId.fullName;
                    const location = `${vendor.address.locality}, ${vendor.address.state}`;
                    const category = formatText(vendor.capacity.vendorCategory);
                    const cuisines = vendor.pricing.cuisineOptions
                      .map(formatText)
                      .join(", ");
                    const capacity = `${vendor.capacity.minGuests}-${vendor.capacity.maxGuests}`;
                    const rating = vendor.stats.averageRating.toFixed(1);
                    const reviews = vendor.stats.totalReviews;

                    let message = `Hello,\n\n`;
                    message += `*INTERESTED IN CATERING SERVICES*\n\n`;
                    message += `*Vendor Details:*\n`;
                    message += `Vendor: _${brandName}_\n`;
                    message += `Location: _${location}_\n`;
                    message += `Category: _${category}_\n\n`;

                    message += `*Service Information:*\n`;
                    message += `Cuisines: _${cuisines}_\n`;
                    message += `Capacity: _${capacity} guests_\n`;

                    if (
                      vendor.capacity.vendorCategory === "full_catering" ||
                      vendor.capacity.vendorCategory === "other"
                    ) {
                      message += `Veg Price: _₹${vendor.pricing.vegPricePerPlate}/plate_\n`;
                      message += `Non-Veg Price: _₹${vendor.pricing.nonVegPricePerPlate}/plate_\n\n`;
                    } else {
                      message += `Starting Price: _₹${vendor.pricing.vegPricePerPlate}/unit_\n\n`;
                    }

                    message += `*Vendor Rating:*\n`;
                    message += `Rating: _${rating}/5_ (${reviews} reviews)\n`;
                    message += `Profile Complete: _${vendor.profileCompletionPercentage}%_\n\n`;

                    message += `*Please provide details on:*\n`;
                    message += `• Event date availability\n`;
                    message += `• Custom menu options\n`;
                    message += `• Additional charges (if any)\n`;
                    message += `• Booking terms & conditions\n\n`;
                    message += `Thank you!`;

                    return encodeURIComponent(message);
                  };

                  return (
                    <a
                      href={`https://wa.me/8260061212?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                  );
                })()}
                <button
                  onClick={handleInquiryClick}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  Send Inquiry
                </button>
              </div>

              <p className="text-[10px] sm:text-xs text-center text-gray-500 mt-3 sm:mt-4">
                *Proceed with our Book Now, Pay Later option!*
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        vendorId={vendor.userId._id}
        vendorName={
          vendor.businessRegistrationId?.brandName || vendor.userId.fullName
        }
      />
    </div>
  );
}
