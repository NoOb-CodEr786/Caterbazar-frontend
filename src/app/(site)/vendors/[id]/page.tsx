import React from 'react'
import VendorDetailsPage from '@/components/Vendor/VendorProduct'
import ReviewsSection from '@/components/Vendor/Reviews'
import CateringProfessionalCTA from '@/components/Home/CateringProfessionalCTA'

const page = () => {
  return (
    <div>
      <VendorDetailsPage />
      <ReviewsSection />
      <CateringProfessionalCTA />
    </div>
  )
}

export default page