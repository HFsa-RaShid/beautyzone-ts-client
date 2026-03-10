"use client";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

interface SiteLayoutProps {
  children: ReactNode;
}

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}