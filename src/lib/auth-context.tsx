"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService, User } from "@/services/authService";

interface AuthContextType {
  user: User | null;
  login: (email: string, role: string, password?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(
        "CheckAuth: Token present:",
        !!token,
        "Refresh Token present:",
        !!refreshToken,
      );

      if (token) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
        } catch (error) {
          console.error("Auth check failed:", error);
          // If axios redirected, we might not reach here, or we might.
          // But removing token here is safe if getMe failed strictly.
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, role: string, password?: string) => {
    try {
      // Note: If the backend actually uses password, it should be passed here.
      // Adjusting logic to use the password version if provided, or default.
      let response;
      if (password) {
        response = await authService.loginWithPassword(email, password, role);
      } else {
        // Fallback for current UI if password not plumbed through yet, although I will update UI next.
        response = await authService.login(email, role);
      }

      const { token, refreshToken, user } = response;
      console.log("Login Success: Received Tokens", {
        token: !!token,
        refreshToken: !!refreshToken,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      setUser(user);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
