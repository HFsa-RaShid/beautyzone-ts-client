import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-16 border-t border-gray-100">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Logo Section */}
        <div>
          <Link href="/" className="cursor-pointer inline-block mb-4">
            <Image 
              src="/images/logo.png" 
              alt="Seoul Mirage Logo" 
              width={150} 
              height={64} 
              className="w-auto h-16 mx-auto md:mx-0"
            />
          </Link>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed max-w-xs mx-auto md:mx-0">
            Premium skincare that combines innovation with clean, effective ingredients for your daily ritual.
          </p>
          <div className="flex justify-center md:justify-start gap-4 text-[#d4a0a7]">
            <Facebook className="w-5 h-5 cursor-pointer hover:text-black transition" />
            <Instagram className="w-5 h-5 cursor-pointer hover:text-black transition" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-black transition" />
          </div>
        </div>

        {/* Shop Links */}
        <div>
          <h4 className="mb-6 uppercase text-lg font-bold tracking-widest">Shop</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/all-products" className="hover:text-black transition">All Products</Link></li>
            <li><Link href="/bestsellers" className="hover:text-black transition">Bestsellers</Link></li>
            <li><Link href="/new-arrivals" className="hover:text-black transition">New Arrivals</Link></li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h4 className="mb-6 uppercase text-lg font-bold tracking-widest">About</h4>
          <ul className="space-y-3 text-sm text-gray-600">
            <li><Link href="/about" className="hover:text-black transition">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-black transition">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-black transition">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-12 text-[10px] text-gray-400 border-t pt-8">
        © {currentYear} Seoul Mirage. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;