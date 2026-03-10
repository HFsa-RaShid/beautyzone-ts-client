"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "What is your shipping policy?", a: "We offer worldwide shipping with estimated delivery times of 5-7 business days." },
    { q: "How can I track my order?", a: "Once your order ships, you will receive an email with your tracking number." },
    { q: "Are your products cruelty-free?", a: "Yes, all Seoul Mirage products are ethically sourced and cruelty-free." },
    { q: "Can I return a product?", a: "Yes, we accept returns within 30 days of purchase if the product is unused." },
    { q: "Do you have wholesale options?", a: "Yes, please contact our support team for partnership inquiries." },
    { q: "Where are your products made?", a: "Our products are formulated and manufactured in Seoul, South Korea." },
  ];

  return (
    <div className="font-raleway bg-white">
      <div className="container mx-auto px-6 md:px-10 py-10">
        <h1 className="text-4xl font-serif mb-12">Contact Us</h1>

        {/* Get in Touch Section */}
        <section className="flex flex-col md:flex-row items-stretch gap-12 pb-20">
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold mb-2">Get in Touch</h3>
            <p className="text-xs text-gray-500 mb-8">
              Have a question or need assistance? Fill out the form below and
              our team will get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 p-3 outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Email</label>
                <input type="email" className="w-full border border-gray-200 p-3 outline-none focus:border-black transition" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">How can we help</label>
                <textarea rows={4} className="w-full border border-gray-200 p-3 outline-none focus:border-black transition" />
              </div>
              <button className="border border-gray-300 px-8 py-2 rounded-full text-[10px] font-bold hover:bg-black hover:text-white transition">
                Let Us Know
              </button>
            </form>
          </div>
          <div className="md:w-1/2 relative min-h-100">
            <Image src="/images/contact/contact1.jpg" alt="Contact" fill className="object-cover rounded-sm" />
          </div>
        </section>

        {/* Other Ways Section */}
        <section className="bg-[#f2e9d9] py-16 px-6 md:px-10 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Mail, title: "Email", val: "seoulmirage@gmail.com" },
              { icon: Phone, title: "Phone", val: "+82 2 123 4567" },
              { icon: MapPin, title: "Address", val: "123 Beauty Lane, Gangnam, Seoul" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <item.icon size={20} />
                <div>
                  <h5 className="font-bold text-sm">{item.title}</h5>
                  <p className="text-xs text-gray-600">{item.val}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="flex flex-col md:flex-row items-stretch pb-20">
          <div className="md:w-2/5 relative min-h-75">
            <Image src="/images/contact/contact2.jpg" alt="FAQ" fill className="object-cover" />
          </div>
          <div className="md:w-3/5 p-6 md:p-12 bg-gray-50">
            <h3 className="text-2xl font-serif mb-2">Frequently Asked Questions</h3>
            <p className="text-xs text-gray-500 mb-10">Find answers to our most commonly asked questions.</p>
            <div className="border-t border-gray-200">
              {faqs.map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left transition hover:text-gray-600"
                  >
                    <span className="text-[13px] font-bold text-gray-800">{item.q}</span>
                    {openIndex === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openIndex === index && (
                    <div className="pb-5 text-[11px] text-gray-500 leading-relaxed animate-in fade-in">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;