"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const router = useRouter();

  // Subtotal calculation
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  
  const shipping = 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white font-raleway">
        <div className="container mx-auto py-32 text-center">
          <h2 className="text-4xl font-serif mb-6">Your cart is empty</h2>
          <button
            onClick={() => router.push("/all-products")}
            className="bg-black text-white px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-raleway">
      <div className="container mx-auto min-h-screen px-10 py-12">
        <h2 className="text-4xl font-serif mb-10">Shopping Cart</h2>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="w-full lg:w-2/3 space-y-8">
            {items.map(({ product, quantity }) => (
              <div key={product._id} className="flex gap-6 border-b pb-8 border-gray-100">
                <div className="relative w-24 h-32 bg-gray-100">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
                <div className="flex-1 flex justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-gray-400 text-xs mb-4 uppercase tracking-widest">{product.category}</p>

                    <div className="flex items-center gap-2 mt-8">
                      <button 
                        onClick={() => updateQuantity(product._id, -1)} 
                        className="p-3 border border-gray-100 hover:bg-gray-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-4 py-2 text-xs font-bold border border-gray-100">{quantity}</span>
                      <button 
                        onClick={() => updateQuantity(product._id, 1)} 
                        className="p-3 border border-gray-100 hover:bg-gray-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(product._id)} 
                      className="mt-4 text-red-600 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/all-products" className="text-sm font-bold border-b-2 border-black pb-1 mt-6 inline-block">
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="p-6 border border-gray-200">
              <h3 className="text-lg font-bold mb-6">Order Summary</h3>
              <div className="space-y-4 text-sm border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold">${shipping.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link href="/checkout">
                <button className="bg-black text-white w-full py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;