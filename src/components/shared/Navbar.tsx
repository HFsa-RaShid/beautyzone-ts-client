
"use client";

import React, { useState } from "react";
import { Search, ShoppingBag, Menu, X, ChevronDown, User as UserIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const router = useRouter();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleCategoryClick = (category: string) => {
    localStorage.setItem("selectedCategory", category);
    setShopOpen(false);
    setMobileMenuOpen(false);
  };

  const categories = ["Serums", "Cleansers", "Moisturizers", "Masks"];

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-100 font-raleway">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 md:px-10">
        {/* Left: Logo & Desktop Menu */}
        <div className="flex items-center gap-10">
          <Link href="/" className="cursor-pointer flex items-center">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="h-18 md:w-22  w-auto mr-2"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-700">
            <li
              className="relative py-2 group cursor-pointer flex items-center gap-1 hover:text-[#b06d72]"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
            >
              Browse <ChevronDown size={14} />
              {shopOpen && (
                <div className="absolute top-full left-0 w-48 bg-white shadow-xl border border-gray-50 py-3 z-50">
                  {categories.map((item) => (
                    <Link
                      key={item}
                      href="/all-products"
                      onClick={() => handleCategoryClick(item)}
                      className="block px-4 py-2 hover:bg-pink-50 hover:text-[#b06d72] transition"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </li>
            <li className="hover:text-[#b06d72] cursor-pointer transition">Collections</li>
            <li><Link href="/aboutUs" className="hover:text-[#b06d72]">About</Link></li>
            <li><Link href="/contactUs" className="hover:text-[#b06d72]">Contact</Link></li>
          </ul>
        </div>

        {/* Right: Icons & Menu */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-5 text-gray-600">
            <Search size={20} className="cursor-pointer hover:text-[#b06d72]" />

            {/* User Icon */}
            <div className="relative hidden md:block" onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
              <div className="py-2 cursor-pointer hover:text-[#b06d72]"><UserIcon size={20} /></div>
              {userMenuOpen && (
                <div className="absolute top-full right-0 w-44 bg-white shadow-xl border border-gray-100 py-3 z-50">
                  {user ? (
                    <>
                      <div className="px-4 pb-2 mb-2 border-b border-gray-50">
                        <p className="text-[9px] font-bold text-gray-400 uppercase">Account</p>
                        <p className="text-[11px] font-semibold text-gray-800 truncate">{user.name}</p>
                      </div>
                      <button onClick={() => router.push(user.email === "admin@gmail.com" ? "/dashboard/overview" : "/profile")} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase hover:bg-gray-50">
                        {user.email === "admin@gmail.com" ? "Dashboard" : "My Account"}
                      </button>
                      <button onClick={handleSignOut} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase text-red-500 hover:bg-red-50 border-t mt-2">Log Out</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => router.push("/signUp")} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase hover:bg-gray-50">SignUp</button>
                      <button onClick={() => router.push("/signIn")} className="w-full text-left px-4 py-2 text-[11px] font-bold uppercase hover:bg-gray-50">Sign-in</button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative cursor-pointer hover:text-[#b06d72]" onClick={() => router.push("/cart")}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-[#d1a2a4] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>}
            </div>
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-gray-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b shadow-lg p-6 flex flex-col gap-6 z-40">
          <ul className="flex flex-col gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-800">
            {categories.map((item) => (
              <li key={item}>
                <Link href="/all-products" onClick={() => handleCategoryClick(item)}>
                  {item}
                </Link>
              </li>
            ))}
            <li><Link href="/aboutUs">About</Link></li>
            <li><Link href="/contactUs">Contact</Link></li>
          </ul>
          <div className="flex flex-col gap-2">
            {user ? (
              <button onClick={handleSignOut} className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase">Log Out</button>
            ) : (
              <>
                <button onClick={() => {router.push("/signUp"); setMobileMenuOpen(false);}} className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase">Sign Up</button>
                <button onClick={() => {router.push("/signIn"); setMobileMenuOpen(false);}} className="border border-black px-8 py-3 rounded-full text-[10px] font-bold uppercase">Sign In</button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;