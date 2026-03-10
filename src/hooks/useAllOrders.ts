"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { Order } from "@/lib/types";



interface OrderResponse {
  data: {
    orders: Order[];
    pagination: {
      totalPages: number;
      currentPage: number;
      totalItems: number;
    };
  };
}

const useAllOrders = (page: number = 1, limit: number = 10) => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: orderResponse,
    isLoading,
    isError,
  } = useQuery<OrderResponse>({
    queryKey: ["AllOrders", page],
    queryFn: async () => {
      const res = await axiosPublic.get<OrderResponse>(
        `/api/payment?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    staleTime: 5000,
  });

  return {
    orders: orderResponse?.data?.orders || [],
    pagination: orderResponse?.data?.pagination || {
      totalPages: 1,
      currentPage: 1,
      totalItems: 0,
    },
    refetch,
    isLoading,
    isError,
  };
};

export default useAllOrders;