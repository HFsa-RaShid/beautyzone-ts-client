"use client";

import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="font-raleway bg-white">
      {/* Section 1: Our Story */}
      <div className="bg-[#fcfaf5] w-full">
        <section className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-6">
              Our <span className="font-bold">Story</span>
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base max-w-lg">
              Seoul Mirage was born from a passion for Korean skincare
              innovation and a commitment to creating luxury products that
              deliver exceptional results.
            </p>
          </div>
          <div className="md:w-1/2 relative min-h-100">
            <Image
              src="/images/about/about1.jpg"
              alt="Story"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>

      {/* Section 2: Our Journey */}
      <section className="container mx-auto px-6 md:px-10 flex flex-col-reverse md:flex-row items-stretch">
        <div className="md:w-1/2 relative min-h-100">
          <Image
            src="/images/about/about2.jpg"
            alt="Journey"
            fill
            className="object-cover"
          />
        </div>
        <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
          <h2 className="text-4xl font-serif text-gray-800 mb-6">Our Journey</h2>
          <div className="text-gray-600 space-y-4 text-sm md:text-base max-w-lg leading-relaxed">
            <p>
              Founded in 2018 by skincare enthusiast and biochemist Dr.
              Ji-Yoon Park, Seoul Mirage began as a small laboratory in the
              heart of Seoul’s beauty district.
            </p>
            <p>
              What started as a passion project quickly gained recognition for
              its exceptional quality and remarkable results. Today, Seoul
              Mirage has grown into a global brand.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Philosophy */}
      <section className="bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-stretch">
          <div className="md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl font-serif text-gray-800 mb-6">Our Philosophy</h2>
            <p className="text-gray-600 mb-8 text-sm leading-relaxed max-w-lg">
              We believe that skincare should be a blend of ancient wisdom and modern science, focused on purity and efficacy.
            </p>
            <div className="space-y-6">
              {["Purity", "Innovation", "Sustainability"].map((item) => (
                <div key={item} className="border-l-2 border-black pl-6">
                  <h4 className="font-bold text-lg mb-1">{item}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    We source the highest quality ingredients and maintain
                    rigorous standards to ensure our products are safe and effective.
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative min-h-125 mr-10 ml-6">
            <Image
              src="/images/about/about3.jpg"
              alt="Philosophy"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Our Ingredients */}
      <section className="py-20 text-center bg-[#f2e9d9]">
        <div className="container mx-auto px-10">
          <h2 className="text-3xl font-serif mb-4">Our Ingredients</h2>
          <p className="text-xs text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            We believe in the power of nature enhanced by science. Our
            formulations combine time-honored Korean botanical ingredients with
            advanced scientific compounds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Botanical Extracts", img: "/images/about/about4.jpg" },
              { title: "Fermented Ingredients", img: "/images/about/about5.jpg" },
              { title: "Scientific Compounds", img: "/images/about/about6.jpg" },
            ].map((item, index) => (
              <div key={index} className="relative h-64 overflow-hidden group">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-left">
                  <h4 className="text-white font-bold text-sm mb-2">{item.title}</h4>
                  <p className="text-[10px] text-gray-200 leading-tight">
                    Harnessing the power of traditional Korean botanicals and modern innovation.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;