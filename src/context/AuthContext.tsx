

"use client";

import { createContext, useEffect, useState, useContext, ReactNode, useCallback } from "react";
import { AuthResponse, User } from "@/lib/types";
import useAxiosPublic from "@/hooks/useAxiosPublic";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  registerUser: (name: string, email: string, password: string) => Promise<AuthResponse>;
  loginUser: (email: string, password: string) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const axiosPublic = useAxiosPublic();


  const fetchCurrentUser = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/api/auth/current-user");
      if (res.data?.data?.user) {
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
  }, [axiosPublic]); 

 
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);


  const authInfo: AuthContextType = {
    user,
    setUser,
    loading,
    registerUser: async (name, email, password) => {
      const res = await axiosPublic.post("/api/auth/register", { name, email, password });
      await fetchCurrentUser(); // লগইন হওয়ার পর স্টেট রিফ্রেশ করুন
      return res.data;
    },
    loginUser: async (email, password) => {
      const res = await axiosPublic.post("/api/auth/login", { email, password });
      await fetchCurrentUser(); // লগইন হওয়ার পর স্টেট রিফ্রেশ করুন
      return res.data;
    },
    logout: async () => {
      await axiosPublic.post("/api/auth/logout");
      setUser(null); // স্টেট ক্লিয়ার করা
    },
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("useAuth must be used within an AuthProvider");
  return auth;
};