import { apiRequest } from "./http";
import type { CartItem } from "../types";

export async function getCart() {
  return apiRequest<CartItem[]>("/cart", {
    method: "GET",
    cache: "no-store",
  });
}

export type AddToCartPayload = {
  productId: string;
  quantity?: number;
};

export async function addToCart(payload: AddToCartPayload) {
  return apiRequest<CartItem>("/cart/items", {
    method: "POST",
    body: payload,
  });
}

export type UpdateCartItemPayload = {
  quantity: number;
};

export async function updateCartItem(id: string, payload: UpdateCartItemPayload) {
  return apiRequest<CartItem>(`/cart/items/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function removeCartItem(id: string) {
  return apiRequest<void>(`/cart/items/${id}`, {
    method: "DELETE",
  });
}

