import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CitiesCarousel() {
  const scrollRef = useRef(null);

  const cities = [
    {
      name: 'Delhi',
      image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Mumbai',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Chennai',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Chennai',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Bangalore',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Chennai',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Pune',
      image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Kolkata',
      image: 'https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Lucknow',
      image: 'https://images.unsplash.com/photo-1609920658906-8223bd289001?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
    }
  ];



  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto hide-scrollbar scroll-smooth pb-4"
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="shrink-0 flex flex-col items-center cursor-pointer group"
              >
                {/* City Image Circle */}
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden mb-2 sm:mb-3 transition-all duration-300">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* City Name */}
                <p className={`text-[10px] sm:text-xs font-semibold transition-colors ${
                  city.name === 'Kolkata'
                    ? 'text-orange-500'
                    : 'text-gray-800 group-hover:text-orange-500'
                }`}>
                  {city.name}
                </p>
              </div>
            ))}

            {/* Next Arrow Circle */}
            {/* <div className="flex-shrink-0 flex flex-col items-center">
              <button
                onClick={() => scroll('right')}
                className="w-24 h-24 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-colors mb-3"
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>
            </div> */}
          </div>

          {/* Left Arrow Button */}
          {/* <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button> */}

          {/* Right Arrow Button */}
          {/* <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button> */}
        </div>
      </div>
    </div>
  );
}