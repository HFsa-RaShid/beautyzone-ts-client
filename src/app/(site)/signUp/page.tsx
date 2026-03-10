"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const SignUpPage: React.FC = () => {
  const { setUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  interface BackendError {
    message: string;
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const { name, email, password, confirmPassword } = Object.fromEntries(
      formData.entries(),
    ) as Record<string, string>;

    if (password !== confirmPassword) {
      setLoading(false);
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
        confirmButtonColor: "#1a1a1a",
      });
    }

    try {
      const res = await axiosPublic.post("/api/auth/register", {
        name,
        email,
        password,
      });

      if (res.data.status === "success") {
        setUser(res.data.user);
        toast.success("Successfully Signed Up!");
        router.push("/");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
     
        const errorData = err.response?.data as BackendError | undefined;

        console.error("Signup error:", err.response?.data);

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: errorData?.message || "Something went wrong.",
          confirmButtonColor: "#1a1a1a",
        });
      } else {
        console.error("Unexpected error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unexpected error occurred.",
          confirmButtonColor: "#1a1a1a",
        });
      }
    }
  };

  return (
    <div className="bg-[#f5e9da] min-h-screen font-sans flex flex-col">
      <div className="grow flex items-center justify-center py-20 px-6">
        <div className="max-w-md w-full text-center">
          <h2 className="text-4xl font-serif mb-2 text-black">
            Create your account
          </h2>
          <p className="text-sm mb-10 text-gray-600">
            Or{" "}
            <Link
              href="/signIn"
              className="font-bold underline hover:text-gray-800"
            >
              sign in to your existing account
            </Link>
          </p>

          <div className="bg-white p-10 shadow-sm rounded-sm text-left">
            <form onSubmit={handleSignUp} className="space-y-5">
              {[
                {
                  label: "Full name",
                  name: "name",
                  type: "text",
                  placeholder: "Hafsa Rashid",
                },
                {
                  label: "Email address",
                  name: "email",
                  type: "email",
                  placeholder: "hafsa@gmail.com",
                },
                {
                  label: "Password",
                  name: "password",
                  type: "password",
                  placeholder: "........",
                },
                {
                  label: "Confirm password",
                  name: "confirmPassword",
                  type: "password",
                  placeholder: "........",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    className="w-full border border-gray-200 p-3 text-sm focus:outline-black"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div className="pt-2">
                <label className="flex items-start gap-3 text-[10px] font-medium text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 accent-black"
                  />
                  <span>
                    I agree to the{" "}
                    <span className="text-black font-bold underline">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-black font-bold underline">
                      Privacy Policy
                    </span>
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-black text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] transition-all mt-4 ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                }`}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signIn" className="font-bold text-black">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
