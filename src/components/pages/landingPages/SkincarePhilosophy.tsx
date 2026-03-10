import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SkincarePhilosophy: React.FC = () => {
  return (
    <section className="bg-[#ede4d3] overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch container mx-auto px-10">
        
        {/* Left Side: Content */}
        <div className="md:w-1/2 py-16 flex flex-col justify-center">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-serif text-[#2a2a2a] mb-8">
              Our Skincare Philosophy
            </h2>
            <div className="space-y-6 text-gray-700 text-sm md:text-[15px] leading-relaxed font-raleway">
              <p>
                Seoul Mirage was born from a deep appreciation for Korean skincare innovation 
                and the belief that effective products should be accessible to everyone.
              </p>
              <p>
                We combine time-tested Korean ingredients with modern science to create 
                formulations that deliver visible results. Each product is meticulously crafted to 
                honor the tradition of the multi-step skincare ritual while fitting seamlessly into 
                your daily routine.
              </p>
            </div>
            <Link 
              href="/about"
              className="inline-block mt-10 bg-white text-black px-10 py-3 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] border border-transparent hover:border-black transition-all active:scale-95 shadow-sm"
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Right Side: Image using next/image */}
        <div className="md:w-1/2 relative min-h-100">
          <Image 
            src="/images/product.jpg" 
            alt="Skincare Philosophy Presentation" 
            fill
            className="object-cover"
            priority 
          />
        </div>
      </div>
    </section>
  );
};

export default SkincarePhilosophy;