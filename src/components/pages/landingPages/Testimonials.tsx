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

import React from "react";
import Image from "next/image";
import { Star, RefreshCw } from "lucide-react";
import useAllReviews from "@/hooks/useAllReviews";

const Testimonials: React.FC = () => {
  const { reviews, isLoading, refetch } = useAllReviews();

  if (isLoading) {
    return <div className="py-20 text-center animate-pulse">Loading Reviews...</div>;
  }

  // Marquee নিখুঁত করার জন্য রিভিউ কম থাকলে ডেটা ডাবল-ত্রিপল করে নেওয়া হচ্ছে
  const duplicatedReviews = 
    reviews.length > 0 
      ? [...reviews, ...reviews, ...reviews, ...reviews] 
      : [];

  return (
    <section className="py-20 bg-white overflow-hidden">
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

      <div className="w-full">
        {reviews.length > 0 ? (
          /* মূল কন্টেইনার - group-hover দিয়ে মাউস নিলে অ্যানিমেশন পজ করা হচ্ছে */
          <div className="flex w-full overflow-hidden group">
            <div 
              className="flex gap-8 whitespace-nowrap group-hover:[animation-play-state:paused]"
              style={{
                animation: "marquee 25s linear infinite", // ২৫ সেকেন্ড লুপ স্পিড (কমাইলে ফাস্ট হবে, বাড়াইলে স্লো হবে)
              }}
            >
              {/* ইনলাইন সিএসএস অ্যানিমেশন কিফ্রেম ইনজেক্ট করা হয়েছে এখানে */}
              <style>{`
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
              `}</style>

              {duplicatedReviews.map((rev, index) => (
                <div 
                  key={`${rev._id}-${index}`} 
                  className="w-[450px] shrink-0 flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl select-none"
                >
                  {/* User Image */}
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={rev.userPhoto}
                      alt={rev.userName}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>

                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-1 mb-3">
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
                    <p className="text-gray-600 italic mb-4 leading-relaxed whitespace-normal text-sm line-clamp-3">
                      &quot;{rev.comment}&quot;
                    </p>
                    <h4 className="font-bold text-gray-800 text-base truncate">{rev.userName}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No reviews found.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;