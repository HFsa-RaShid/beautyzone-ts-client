"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


interface Category {
  name: string;
  img: string;
}

const categories: Category[] = [
  { name: 'Cleansers', img: '/images/c1.jpg' },
  { name: 'Serums', img: '/images/c2.jpg' },
  { name: 'Moisturizers', img: '/images/c3.jpg' },
  { name: 'Masks', img: '/images/c4.jpg' },
];

const ShopByCategory: React.FC = () => {

  const handleCategoryClick = (name: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCategory", name);
    }
  };

  return (
    <section className="py-16 bg-[#F9EFF1]">
      <div className="container mx-auto px-10">
        <h2 className="text-3xl font-bold mb-8 text-center md:text-left text-gray-800">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link 
              key={index} 
              href="/all-products" 
              onClick={() => handleCategoryClick(cat.name)}
              className="group relative h-64 overflow-hidden rounded-lg cursor-pointer"
            >

              <Image 
                src={cat.img} 
                alt={cat.name} 
                fill
                sizes="(max-width: 208px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              
 
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 group-hover:bg-black/20">
                <span className="text-white text-xl font-medium tracking-wide">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;