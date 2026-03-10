"use client";

import React from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";

const PaymentCancelPage = () => {
    return (
        <div className="min-h-[70vh] container mx-auto px-6 flex flex-col items-center justify-center py-20 text-center bg-white animate-in fade-in duration-500">
           
            <div className="mb-8 text-[#b06d72]">
                <XCircle size={100} strokeWidth={1.5} />
            </div>

          
            <h1 className="text-3xl md:text-4xl font-serif text-black mb-4">
                Oops! Your Payment Wasn&apos;t <span className="text-[#b06d72] italic">Completed!</span>
            </h1>
            
            <p className="text-gray-400 text-xs md:text-sm max-w-md mx-auto mb-10 leading-relaxed">
                It looks like your transaction was canceled or did not go through. 
                Please check your connection or details and try again.
            </p>

          
            <Link 
                href="/checkout" 
                className="bg-black text-white px-8 py-3 rounded-lg flex items-center gap-2 group tracking-widest text-[11px] uppercase transition hover:bg-gray-800"
            >
                Back to Checkout
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
        </div>
    );
};

export default PaymentCancelPage;