"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Raleway } from "next/font/google";
import "./globals.css";
import React, { useState, ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";


const raleway = Raleway({ 
  subsets: ["latin"], 
  weight: ["400", "700"] 
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [queryClient] = useState<QueryClient>(() => new QueryClient());

  return (
    <html lang="en">
      {/* suppressHydrationWarning যোগ করা হয়েছে */}
      <body className={raleway.className} suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}