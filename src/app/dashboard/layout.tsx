"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navItems: string[] = ['Overview', 'Products', 'Orders', 'Customers', 'Settings'];

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans relative">
      {/* Mobile Trigger */}
      <button 
        className="md:hidden absolute top-4 left-4 z-50 text-2xl" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-secondary p-6 flex flex-col justify-between shrink-0 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          <Link href='/'>
            <Image 
              src="/images/logo.png" 
              alt="Logo" 
              width={170} 
              height={50} 
              className="mb-10 mx-auto" 
            />
          </Link>
          <nav className="flex flex-col gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            {navItems.map((nav) => {
              const href: string = `/dashboard/${nav.toLowerCase()}`;
              const isActive: boolean = pathname === href;
              return (
                <Link 
                  key={nav}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={isActive ? "text-white bg-black p-3 rounded" : "p-3 hover:bg-gray-200 hover:text-black rounded transition-colors"}
                >
                  {nav}
                </Link>
              );
            })}
          </nav>
        </div>
        <button className="border border-gray-300 py-2 rounded text-xs hover:bg-gray-200 transition-colors">
          Logout
        </button>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30" 
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 bg-white border-b flex justify-end items-center px-8 shrink-0">
          <div className="text-right">
            <p className="text-sm font-bold">Admin</p>
            <p className="text-[10px] text-gray-500">Super User</p>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          {children} 
        </main>
      </div>
    </div>
  );
}