"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Shell({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();

    const [showAI, setShowAI] = useState(false);

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
            <AppSidebar onAIRequest={() => setShowAI(true)} />
            <div className="flex-1 bg-slate-50/50 p-4 md:p-8 overflow-auto h-screen">
                <div className="mx-auto max-w-7xl space-y-8">
                    {children}
                </div>
            </div>
            {/* AI Assistant - Globally available */}
            <AIAssistant open={showAI} onOpenChange={setShowAI} />
        </div>
    );
}

import { AIAssistant } from "@/components/layout/AIAssistant";
import { useState } from "react";
