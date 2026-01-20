"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Building2,
    FileSearch,
    Users,
    BarChart3,
    Calendar,
    Briefcase,
    Settings,
    Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Properties", href: "/properties", icon: Building2 },
    { name: "Requirements", href: "/requirements", icon: FileSearch },
    { name: "Brand Approached", href: "/brands", icon: Briefcase },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Report", href: "/reports", icon: BarChart3 },
    { name: "Calendar", href: "/calendar", icon: Calendar },
];

import Image from "next/image";

// ...

import { useAuth } from "@/lib/auth-context";
import { LogOut } from "lucide-react";

// ...

export function AppSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { user, logout } = useAuth();

    const BrandingFooter = () => (
        <div className="mt-auto pt-6 pb-2 px-4 border-t border-slate-800/50">
            <div className="flex flex-col items-center justify-center text-center space-y-1">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-1">
                    Design Excellence
                </div>
                <div className="text-sm font-medium text-slate-300">
                    Professionally designed by <span className="text-blue-400 font-bold whitespace-nowrap">Raj Sawant</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-2">
                    © {new Date().getFullYear()} All rights are reserved to
                    <div className="font-semibold text-slate-400">Planext Real Estate</div>
                </div>
            </div>
        </div>
    );

    if (!user) return null; // Should not happen inside Shell, but safe check

    return (
        <>
            <div className="hidden border-r bg-slate-900 text-slate-50 md:block md:w-64 lg:w-72 h-screen flex-col sticky top-0 overflow-y-auto">
                <div className="flex h-20 items-center justify-center border-b border-slate-800/50 shrink-0">
                    <div className="relative h-12 w-40">
                        <Image
                            src="/logo.png"
                            alt="Company Logo"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="grid items-start px-4 text-sm font-medium gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-white hover:bg-slate-800/50",
                                    pathname === item.href
                                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                                        : "text-slate-400"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="shrink-0">
                    <div className="border-t border-slate-800 p-4">
                        <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 mb-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0 ${user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                                {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="text-sm overflow-hidden">
                                <div className="font-medium truncate">{user.name}</div>
                                <div className="text-xs text-slate-400 capitalize">{user.role} Account</div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800/50"
                            onClick={logout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                    <BrandingFooter />
                </div>
            </div>

            {/* Mobile Sidebar */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden fixed top-3 left-3 z-50 text-slate-900 bg-white/80 backdrop-blur-sm border shadow-sm"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 bg-slate-900 border-r-slate-800 p-0 text-slate-50 flex flex-col">
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">Access all pages of the Planext CRM.</SheetDescription>

                    <div className="flex h-20 items-center justify-center border-b border-slate-800/50 shrink-0">
                        <div className="relative h-10 w-32">
                            <Image
                                src="/logo.png"
                                alt="Company Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="grid items-start px-4 text-sm font-medium gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-white hover:bg-slate-800/50",
                                        pathname === item.href
                                            ? "bg-blue-600 text-white"
                                            : "text-slate-400"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="shrink-0 border-t border-slate-800 p-4 bg-slate-900/50 backdrop-blur-sm">
                        <div className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 mb-2">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold shrink-0 ${user.role === 'admin' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                                {user.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div className="text-sm overflow-hidden">
                                <div className="font-medium truncate">{user.name}</div>
                                <div className="text-xs text-slate-400 capitalize">{user.role} Account</div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-slate-800/50"
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                        </Button>
                    </div>
                    <BrandingFooter />
                </SheetContent>
            </Sheet>
        </>
    );
}
