// "use client";

// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import Image from "next/image";
// import { Star, RefreshCw } from "lucide-react";
// import "swiper/css";
// import "swiper/css/pagination";
// import useAllReviews from "@/hooks/useAllReviews";

// const Testimonials: React.FC = () => {
//   const { reviews, isLoading, refetch } = useAllReviews();

//   if (isLoading) {
//     return <div className="py-20 text-center animate-pulse">Loading Reviews...</div>;
//   }

//   return (
//     <section className="py-20 bg-white">
//       <div className="text-center mb-12 relative">
//         <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
//           {reviews.length}+ Happy Users
//         </p>
//         <h2 className="text-4xl font-serif text-[#a68269]">
//           Don&apos;t just take our words
//         </h2>
//         <button
//           onClick={() => refetch()}
//           className="absolute right-10 top-0 p-2 hover:rotate-180 transition-transform duration-500"
//           title="Refresh Reviews"
//         >
//           <RefreshCw size={18} className="text-gray-300" />
//         </button>
//       </div>

//       <div className="container mx-auto px-6">
//         {reviews.length > 0 ? (
//           <Swiper
//             modules={[Pagination, Autoplay]}
//             spaceBetween={30}
//             slidesPerView={1}
//             breakpoints={{ 768: { slidesPerView: 2 } }}
//             pagination={{ clickable: true }}
//             autoplay={{ delay: 3000 }}
//             className="pb-10"
//           >
//             {reviews.map((rev) => (
//               <SwiperSlide key={rev._id}>
//                 <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-2xl">
//                   {/* User Image */}
//                   <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0">
//                     <Image
//                       src={rev.userPhoto}
//                       alt={rev.userName}
//                       fill
//                       className="object-cover"
//                       sizes="200px"
//                     />
//                   </div>

//                   {/* Review Content */}
//                   <div className="flex-1">
//                     <div className="flex gap-1 mb-4">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           size={14}
//                           className={
//                             i < rev.rating
//                               ? "fill-[#d4a0a7] text-[#d4a0a7]"
//                               : "text-gray-200"
//                           }
//                         />
//                       ))}
//                     </div>
//                     <p className="text-gray-600 italic mb-6 leading-relaxed">
//                       &quot;{rev.comment}&quot;
//                     </p>
//                     <h4 className="font-bold text-gray-800">{rev.userName}</h4>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <p className="text-center text-gray-400">No reviews found.</p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Star, RefreshCw } from "lucide-react";
import useAllReviews from "@/hooks/useAllReviews";

const Testimonials: React.FC = () => {
  const { reviews, isLoading, refetch } = useAllReviews();
  
  // কাস্টম স্লাইডার কন্ট্রোল করার জন্য স্টেট এবং রেফ
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  // অটো-প্লে এবং স্মুথ লুপ চালু করার জন্য এফেক্ট
  useEffect(() => {
    if (reviews && reviews.length > 0 && !isPaused) {
      // আগের কোনো ইন্টারভাল থাকলে তা ক্লিয়ার করা
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);

      autoPlayInterval.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 5000); // স্লাইডারের গতি পরিবর্তন করতে পারেন
    }

    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
    };
  }, [reviews, isPaused]);

  if (isLoading) {
    return <div className="py-20 text-center animate-pulse">Loading Reviews...</div>;
  }

  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12 relative">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2">
          {reviews.length}+ Happy Users
        </p>
        <h2 className="text-4xl font-serif text-[#a68269]">
          Don&apos;t just take our words
        </h2>
        <button
          onClick={() => refetch()}
          className="absolute right-10 top-0 p-2 hover:rotate-180 transition-transform duration-500"
          title="Refresh Reviews"
        >
          <RefreshCw size={18} className="text-gray-300" />
        </button>
      </div>

      <div className="container mx-auto px-6 relative pb-24"> {/* 🔽 pb-24 বাড়ানো হয়েছে ডটগুলোর জন্য */}
        {reviews.length > 0 ? (
          <>
            {/* 🛑 কাস্টম স্লাইডার কন্টেইনার - Hover করলে Pause হবে */}
            <div 
              ref={sliderRef}
              className="overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div 
                className="flex transition-transform ease-linear"
                style={{ 
                  transform: `translateX(-${activeIndex * (100 / (window.innerWidth >= 768 ? 2 : 1))}%)`,
                  width: `${reviews.length * (100 / (window.innerWidth >= 768 ? 2 : 1))}%`,
                  transitionDuration: isPaused ? '0ms' : '5000ms' // ⚡ স্মুথ মুভমেন্ট এবং Hover-এ সাথে সাথে স্টপ
                }}
              >
                {reviews.map((rev) => (
                  <div 
                    key={rev._id} 
                    className="w-full md:w-1/2 px-4 shrink-0"
                    style={{ width: `${100 / reviews.length}%` }}
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8 p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                      {/* User Image */}
                      <div className="relative w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                        <Image
                          src={rev.userPhoto}
                          alt={rev.userName}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </div>

                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < rev.rating
                                  ? "fill-[#d4a0a7] text-[#d4a0a7]"
                                  : "text-gray-200"
                              }
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 italic mb-6 leading-relaxed">
                          &quot;{rev.comment}&quot;
                        </p>
                        <h4 className="font-bold text-gray-800">{rev.userName}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔽 কাস্টম প্যাজিনেশন ডট (সবচেয়ে নিচে এবং দৃশ্যমান) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? "bg-[#a68269] scale-125" // সক্রিয় ডট bবশishishট এবং বড়
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">No reviews found.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;