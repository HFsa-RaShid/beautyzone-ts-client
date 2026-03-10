"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// ১. স্লাইড ডেটার জন্য টাইপ ডিফাইন করা
interface HeroSlide {
  img: string;
  title: string;
}

const Hero: React.FC = () => {
  // ২. স্লাইড অ্যারেতে টাইপ অ্যাসাইন করা
  const slides: HeroSlide[] = [
    { img: "/images/slide1.jpg", title: "Discover your skin's true potential" },
    { img: "/images/slide2.jpg", title: "Clean beauty for your natural glow" },
    { img: "/images/slide3.jpg", title: "Clean beauty for your natural glow" },
  ];

  return (
    <div className="h-175 w-full">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-175 flex items-center">
              {/* Background Image Container */}
              <div className="absolute inset-0 w-full h-175">
                <Image
                  src={slide.img}
                  alt={`Hero Slide ${index + 1}`}
                  fill
                  priority={index === 0}
                  className="object-cover object-center"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30"></div>
              </div>

              {/* Content Box */}
              <div className="container mx-auto px-10 relative z-10 text-white">
                <div className="max-w-xl">
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg mb-8 opacity-80">
                    Premium skincare that combines innovation with clean,
                    effective ingredients for all skin types.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/all-products">
                      <button className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition">
                        Shop Now
                      </button>
                    </Link>
                    <Link href="/about">
                      <button className="bg-white/20 backdrop-blur-md border border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-black transition">
                        About Us
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;