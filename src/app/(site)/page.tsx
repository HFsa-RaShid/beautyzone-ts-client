"use client";

import Bestseller from "@/components/pages/landingPages/Bestseller";
import Hero from "@/components/pages/landingPages/Hero";
import NewArrivals from "@/components/pages/landingPages/NewArrivals";
import ShopByCategory from "@/components/pages/landingPages/ShopByCategory";
import SkincarePhilosophy from "@/components/pages/landingPages/SkincarePhilosophy";
import Testimonials from "@/components/pages/landingPages/Testimonials";
import Newsletter from "@/components/shared/Newsletter";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Bestseller />
      <ShopByCategory />
      <NewArrivals />
      <SkincarePhilosophy />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default HomePage;