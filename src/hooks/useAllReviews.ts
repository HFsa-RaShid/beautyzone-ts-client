"use client";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { Review } from "@/lib/types";

const useAllReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch, data: reviews = [], isLoading, isError } = useQuery<Review[]>({
    queryKey: ["AllReviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/reviews`);
      return res.data;
    },
  });

  return { reviews, refetch, isLoading, isError };
};

export default useAllReviews;