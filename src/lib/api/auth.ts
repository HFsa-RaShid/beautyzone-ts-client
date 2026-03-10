import { apiRequest } from "./http";
import type { User } from "../types";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export async function login(payload: LoginPayload) {
  return apiRequest<{ user: User; token: string }>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export async function register(payload: RegisterPayload) {
  return apiRequest<{ user: User; token: string }>("/auth/register", {
    method: "POST",
    body: payload,
  });
}

export async function getCurrentUser() {
  return apiRequest<User>("/auth/me", {
    method: "GET",
    // add auth header from cookies/localStorage when you wire real auth
  });
}

export async function updateProfile(changes: Partial<User>) {
  return apiRequest<User>("/auth/profile", {
    method: "PATCH",
    body: changes,
  });
}

