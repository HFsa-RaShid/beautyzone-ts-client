import { apiRequest } from "./http";
import type { Product, Review } from "../types";

export async function getProducts() {
  return apiRequest<Product[]>("/products", {
    method: "GET",
    next: { revalidate: 60 },
  });
}

export async function getProductById(id: string) {
  return apiRequest<Product>(`/products/${id}`, {
    method: "GET",
    next: { revalidate: 60 },
  });
}

export async function getProductReviews(productId: string) {
  return apiRequest<Review[]>(`/products/${productId}/reviews`, {
    method: "GET",
    next: { revalidate: 30 },
  });
}

export async function createReview(productId: string, payload: Pick<Review, "rating" | "comment">) {
  return apiRequest<Review>(`/products/${productId}/reviews`, {
    method: "POST",
    body: payload,
  });
}

