"use client";

import React, { FormEvent } from "react";

const Newsletter: React.FC = () => {
 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    console.log("Subscribed with email:", email);
  
  };

  return (
    <div className="py-20 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 font-sans">
        Join Our Community
      </h2>
      <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-sm">
        Subscribe to our newsletter for exclusive offers, skincare tips, and new product announcements.
      </p>
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto"
      >
        <input 
          type="email" 
          name="email"
          placeholder="Your email address" 
          required
          className="w-full sm:flex-1 px-6 py-4 border border-gray-200 rounded-full outline-none focus:border-[#d4a0a7] transition-colors"
        />
        <button 
          type="submit"
          className="bg-[#d4a0a7] text-white px-10 py-4 rounded-full font-medium hover:bg-[#b06d72] transition-all w-full sm:w-auto"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Newsletter;