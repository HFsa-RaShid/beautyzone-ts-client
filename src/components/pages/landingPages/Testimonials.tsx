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
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Star, RefreshCw } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import useAllReviews from "@/hooks/useAllReviews";

const Testimonials: React.FC = () => {
  const { reviews, isLoading, refetch } = useAllReviews();

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

      {/* 🔽 ডটগুলোকে আরও নিচে নামানোর জন্য নেস্টেড CSS ক্লাস অ্যাড করা হয়েছে */}
      <div className="container mx-auto px-6 relative [&_.swiper-pagination]:!bottom-[-15px]">
        {reviews.length > 0 ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            loop={true} // 🔄 স্লাইড কখনো শেষ হবে না, গোল চাকার মতো ঘুরবে
            speed={8000} // 🐌 গতি কমানো হলো (৮ সেকেন্ড)। কার্ডগুলো এখন অনেক আস্তে ও স্মুথলি যাবে
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 0, // ⏱️ কোনো থামাথামি বা ব্রেক ছাড়া অনবরত চলতে থাকবে
              disableOnInteraction: false,
            }}
            // 🛑 হুভার (Hover) করলে ১০০% গ্যারান্টিসহ স্টপ এবং স্টার্ট করার আসল ট্রিক:
            onMouseEnter={(swiper) => swiper.autoplay.stop()}
            onMouseLeave={(swiper) => swiper.autoplay.start()}
            allowTouchMove={true}
            className="pb-20 pt-4"
            style={{
              // @ts-ignore (ধাক্কাধাক্কি বন্ধ করে একদম সোজা লাইনে চালানোর জন্য)
              "--swiper-wrapper-transition-timing-function": "linear",
            }}
          >
            {/* 💡 লুপ যেন নিখুঁতভাবে ঘোরে, তাই রিভিউর সংখ্যা কম থাকলে ডাবল করে দেখানোর ট্রিক */}
            {(reviews.length < 4 ? [...reviews, ...reviews] : reviews).map((rev, index) => (
              <SwiperSlide key={`${rev._id}-${index}`} className="py-2">
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
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-400">No reviews found.</p>
        )}
      </div>
    </section>
  );
};

export default Testimonials;