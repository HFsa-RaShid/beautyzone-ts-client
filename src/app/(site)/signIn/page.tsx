"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// সার্ভার থেকে আসা এরর মেসেজের জন্য ইন্টারফেস
interface BackendError {
  message: string;
}

const SignInPage: React.FC = () => {
  const { loginUser } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries()) as Record<string, string>;

    try {
      const result = await loginUser(email, password);
      if (result) {
        toast.success("Successfully logged In!");
        router.push("/");
      }
    } catch (error: unknown) {
      console.error(error);
      
      // Axios Error হ্যান্ডলিং
      if (axios.isAxiosError(error)) {
        const errorData = error.response?.data as BackendError | undefined;
        toast.error(errorData?.message || "Login failed. Check credentials.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f5e9da] min-h-screen font-sans flex flex-col">
      <div className="grow flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center">
          <h2 className="text-4xl font-serif mb-2 text-black">Sign in to your account</h2>
          <p className="text-sm mb-10 text-gray-600">
            Or <Link href="/signUp" className="font-bold underline hover:text-gray-800">create a new account</Link>
          </p>
          
          <div className="bg-white p-10 shadow-sm rounded-sm text-left">
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  Email address
                </label>
                <input 
                  name="email"
                  type="email" 
                  required
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 block">
                  Password
                </label>
                <input 
                  name="password"
                  type="password" 
                  required
                  className="w-full border border-gray-200 p-3 outline-none focus:border-black transition-colors"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-black">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black" /> 
                  Show password
                </label>
                <Link href="/" className="hover:underline">Forgot your password?</Link>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900 active:scale-95"
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
          
          <p className="mt-8 text-[11px] text-gray-400 leading-relaxed">
            By signing in, you agree to our <span className="text-black font-bold border-b border-black">Terms of Service</span> and <span className="text-black font-bold border-b border-black">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;