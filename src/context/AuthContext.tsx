"use client";

import { createContext, useEffect, useState, useContext, ReactNode } from "react";

import { AuthResponse, User } from "@/lib/types";
import useAxiosPublic from "@/hooks/useAxiosPublic";
// আপনার আগে থেকে তৈরি করা types ফাইল থেকে

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  // Promise<any> এর পরিবর্তে Promise<AuthResponse> ব্যবহার করুন
  registerUser: (name: string, email: string, password: string) => Promise<AuthResponse>;
  loginUser: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

// createContext এর জন্য প্রারম্ভিক মান (Initial Value)
export const AuthContext = createContext<AuthContextType | null>(null);

// AuthProvider এর Props টাইপ
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosPublic.get("/api/auth/current-user");
        // console.log(res.data.data?.user)
        if (res.data.data?.user) {
          setUser(res.data.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error)
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, [axiosPublic]);

  const authInfo: AuthContextType = {
    user,
    setUser,
    loading,
    registerUser: async (name, email, password) => {
      const res = await axiosPublic.post("/api/auth/register", { name, email, password });
      setUser(res.data.user);
      return res.data;
    },
    loginUser: async (email, password) => {
      const res = await axiosPublic.post("/api/auth/login", { email, password });
      setUser(res.data.user);
      return res.data;
    },
    logout: async () => {
      await axiosPublic.post("/api/auth/logout");
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return auth;
};