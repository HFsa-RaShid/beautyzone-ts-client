"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { ProductsApiResponse } from "@/lib/types";

const useAllProducts = (page: number = 1, limit: number = 12) => {
  const axiosPublic = useAxiosPublic();
  
  const { refetch, data: allProducts = null, isLoading, isError } = useQuery<ProductsApiResponse>({
    queryKey: ["AllProducts", page, limit], 
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/products`, {
        params: { page, limit }
      });
      return res.data;
    },
  });

  return { allProducts, refetch, isLoading, isError };
};

export default useAllProducts;