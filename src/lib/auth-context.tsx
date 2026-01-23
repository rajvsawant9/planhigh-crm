"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type UserRole = "admin" | "agent" | "client";

interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, role: UserRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Mock persistence
    useEffect(() => {
        const storedUser = localStorage.getItem("planext_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (email: string, role: UserRole) => {
        // Mock login logic
        const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name: email.split("@")[0], // Simple name extraction
            email,
            role,
            avatar: "https://github.com/shadcn.png"
        };

        setUser(mockUser);
        localStorage.setItem("planext_user", JSON.stringify(mockUser));
        router.push("/");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("planext_user");
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
