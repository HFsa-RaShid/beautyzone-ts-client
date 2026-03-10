"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import useAllProducts from "@/hooks/useAllProducts";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

const Bestseller: React.FC = () => {
  const { allProducts, isLoading } = useAllProducts(1, 100);
//   console.log(allProducts)
  const router = useRouter();
  const { addToCart } = useCart();

  if (isLoading)
    return (
      <div className="text-center py-20 font-raleway animate-pulse">
        Loading Bestsellers...
      </div>
    );

  const productsArray: Product[] = Array.isArray(allProducts) ? allProducts : [];

const bestSellers = productsArray.slice(0, 4);
  return (
    <section className="container mx-auto py-16 px-10">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold">Bestsellers</h2>
        <Link
          href="/all-products"
          className="text-sm font-semibold underline hover:text-gray-600"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {bestSellers.map((product) => (
          <div
            key={product._id}
            className="group cursor-pointer"
            onClick={() => router.push(`/product/${product._id}`)}
          >
          
            <div className="relative aspect-3/4 mb-4 overflow-hidden bg-gray-100 rounded-sm">
              <Image
                src={product.images[0]} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product); 
                  }}
                  className="bg-white px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-black hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Details */}
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">
              {product.category || "Sakura"}
            </p>
            <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="fill-yellow-400 text-yellow-400"
                />
              ))}
              <span className="text-[10px] text-gray-400 ml-1">
                {product.rating || "4.9"} ({product.reviewsCount || "150"})
              </span>
            </div>

            <p className="text-xl font-bold text-black">${product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bestseller;