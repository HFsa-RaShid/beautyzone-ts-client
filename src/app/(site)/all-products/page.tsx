"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import useAllProducts from "@/hooks/useAllProducts";
import { useCart } from "@/context/CartContext";

const AllProducts: React.FC = () => {
  // ১. localStorage থেকে ক্যাটাগরি পড়ার লজিক
  const [activeCategory, setActiveCategory] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedCategory");
      if (saved) {
        localStorage.removeItem("selectedCategory");
        return saved;
      }
    }
    return "All Product";
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("Featured");
  const [showSortMenu, setShowSortMenu] = useState<boolean>(false);

  const { allProducts, isLoading, refetch } = useAllProducts(currentPage, 12);
  const router = useRouter();
  const { addToCart } = useCart();

  const categories: string[] = [
    "All Product", "Serums", "Sun Care", "Toners", 
    "Cleansers", "Kits", "Moisturizers", "Makeup",
  ];

  const memoizedRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    memoizedRefetch();
  }, [currentPage, activeCategory, memoizedRefetch]);

  if (isLoading) {
    return <div className="text-center py-20 animate-pulse">Loading Products...</div>;
  }

  const productsArray: Product[] = Array.isArray(allProducts)
    ? allProducts
    : allProducts?.data?.products || [];

  let displayProducts = activeCategory === "All Product"
    ? productsArray
    : productsArray.filter((p) => p.category?.trim().toLowerCase() === activeCategory.trim().toLowerCase());

  if (sortOption === "Price: Low to High") {
    displayProducts = [...displayProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "Price: High to Low") {
    displayProducts = [...displayProducts].sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(productsArray.length / 12) || 1;

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Filter Bar */}
      <div className="bg-[#fdf2e3]">
        <div className="container mx-auto flex flex-wrap px-6 md:px-12 py-3 justify-between items-center border-b border-orange-100">
          <div className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setCurrentPage(1);
                }}
                className={`text-[13px] font-medium transition-all whitespace-nowrap pb-1 ${
                  activeCategory === cat ? "text-black border-b-2 border-black" : "text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <div
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 text-[13px] font-medium text-black cursor-pointer"
            >
              Sort : <span className="text-gray-500 flex items-center gap-1">{sortOption} <ChevronDown size={14} /></span>
            </div>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl z-50 rounded-md py-2 text-xs">
                {["Featured", "Price: Low to High", "Price: High to Low"].map((opt) => (
                  <div key={opt} onClick={() => { setSortOption(opt); setShowSortMenu(false); }} className="px-4 py-2 hover:bg-gray-50 cursor-pointer">{opt}</div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto py-16 px-6">
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {displayProducts.map((product) => (
              <div key={product._id} className="group cursor-pointer">
                <div className="relative aspect-4/5 bg-gray-100 overflow-hidden" onClick={() => router.push(`/product/${product._id}`)}>
                  <Image src={product.images[0] || "/placeholder.jpg"} alt={product.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 25vw" />
                  <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition shadow-lg">Add to Cart</button>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 font-bold">{product.category}</p>
                  <h3 className="text-[15px] font-medium text-black mb-1 truncate">{product.name}</h3>
                  <p className="text-[18px] font-bold text-black mb-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">No products found.</div>
        )}

        {/* Pagination using handlePageChange */}
        <div className="mt-20 flex justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200"
          >
            <ArrowLeft size={14} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-8 h-8 text-[12px] border ${currentPage === index + 1 ? "bg-black text-white" : "border-gray-200"}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;