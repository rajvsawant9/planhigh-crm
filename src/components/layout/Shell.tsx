"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Shell({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Small delay to allow hydration/check
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null; // Or a loading spinner
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <AppSidebar />
            <div className="flex-1 bg-slate-50/50 p-4 md:p-8 overflow-auto h-screen">
                <div className="mx-auto max-w-7xl space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
