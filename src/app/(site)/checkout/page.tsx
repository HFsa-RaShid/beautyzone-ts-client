"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, ArrowRight } from "lucide-react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postcode: string;
}

const CheckoutPage: React.FC = () => {
  const { items } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [shippingCost, setShippingCost] = useState<number>(5.99);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const handleShippingChange = (cost: number) => setShippingCost(cost);

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      router.push("/signUp");
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as unknown as CheckoutFormData;

    const orderData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      items: items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      totalAmount: total.toFixed(2),
    };

    try {
      const response = await axiosPublic.post("/api/payment/init", orderData);
      if (response.data?.url) {
        window.location.replace(response.data.url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="bg-[#f5e9da] min-h-screen font-sans">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-serif mb-12 text-[#1a1a1a]">Checkout</h1>

        <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-8">
          {/* Shipping Form */}
          <div className="w-full lg:w-[65%] bg-white p-8 md:p-12 shadow-sm rounded-sm">
            <section className="mb-10">
              <h2 className="text-lg font-bold mb-8">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {["firstName", "lastName", "email", "phone"].map((field) => (
                  <div key={field} className="space-y-1">
                    <label className="text-[10px] uppercase text-gray-400 font-bold">
                      {field.replace(/([A-Z])/g, " $1")}
                    </label>
                    <input
                      name={field}
                      required
                      defaultValue={user && field === "email" ? user.email : ""}
                      type={field === "email" ? "email" : "text"}
                      className="w-full border border-gray-200 p-3 text-sm focus:outline-black"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-1">
                <label className="text-[10px] uppercase text-gray-400 font-bold">Apartment, suite, etc.</label>
                <input name="address" required type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-black" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-bold">City</label>
                  <input name="city" required type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-black" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-bold">State</label>
                  <div className="relative">
                    <select name="state" className="w-full border border-gray-200 p-3 text-sm bg-white appearance-none">
                      <option>Dhaka</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-400 font-bold">Postal Code</label>
                  <input name="postcode" required type="text" className="w-full border border-gray-200 p-3 text-sm focus:outline-black" />
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section>
              <h2 className="text-lg font-bold mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { label: "Standard (5-7 days)", cost: 5.99 },
                  { label: "Express (2-3 days)", cost: 12.99 },
                  { label: "Overnight (1 day)", cost: 24.99 },
                ].map((method) => (
                  <label key={method.label} className="flex items-center justify-between border border-gray-200 p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingCost === method.cost}
                        onChange={() => handleShippingChange(method.cost)}
                        className="accent-black"
                      />
                      <span className="text-xs font-bold uppercase">{method.label}</span>
                    </div>
                    <span className="font-bold text-sm">${method.cost}</span>
                  </label>
                ))}
              </div>
            </section>

            <button type="submit" className="mt-10 bg-black text-white w-full py-4 uppercase font-bold text-xs tracking-widest hover:bg-gray-800 transition flex justify-center items-center gap-2">
              Proceed to Payment <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[35%]">
            <div className="bg-white p-8 shadow-sm">
              <h2 className="text-[12px] font-bold uppercase tracking-widest mb-8 text-gray-400">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-75 overflow-y-auto">
                {items.map(({ product, quantity }) => (
                  <div key={product._id} className="flex gap-4">
                    <div className="relative w-16 h-20 bg-gray-100">
                      <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <h3 className="text-[11px] font-bold uppercase leading-tight">{product.name}</h3>
                      <p className="text-[10px] text-gray-400">Qty: {quantity} | ${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-6 space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Shipping</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-4 border-t">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;