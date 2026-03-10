"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Product } from "@/lib/types"; 

interface UpdateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  refetch: () => void;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ 
  isOpen, 
  onClose, 
  product, 
  refetch 
}) => {
  const { register, handleSubmit, reset } = useForm<Product>();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        stock: product.stock,
        STRAIGHT_UP: product.STRAIGHT_UP,
        THE_LOWDOWN: product.THE_LOWDOWN,
        details: product.details,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: Product) => {
    try {
      if (product?._id) {
        await axiosPublic.patch(`/api/products/${product._id}`, data);
        refetch();
        onClose();
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-xl font-bold mb-6">Update Product</h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Product Name
          </label>
          <input
            {...register("name")}
            className="w-full border p-3 rounded-xl outline-none focus:border-black"
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Price
            </label>
            <input
              {...register("price", { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full border p-3 rounded-xl outline-none focus:border-black"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
              Stock
            </label>
            <input
              {...register("stock", { valueAsNumber: true })}
              type="number"
              className="w-full border p-3 rounded-xl outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Additional Fields */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Straight Up
          </label>
          <input
            {...register("STRAIGHT_UP")}
            className="w-full border p-3 rounded-xl outline-none focus:border-black"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            The Lowdown
          </label>
          <input
            {...register("THE_LOWDOWN")}
            className="w-full border p-3 rounded-xl outline-none focus:border-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
            Details
          </label>
          <textarea
            {...register("details")}
            className="w-full border p-3 rounded-xl outline-none focus:border-black"
            rows={3}
          />
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-xl font-bold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-black text-white px-8 py-2 rounded-xl font-bold hover:bg-gray-800 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductModal;