"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Lock, User } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (role: "admin" | "agent" | "client") => {
        if (!email) return; // Simple validation
        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            login(email, role);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="w-full max-w-md p-4 relative z-10">
                <div className="flex justify-center mb-8">
                    <div className="relative h-16 w-48">
                        <Image
                            src="/logo.png"
                            alt="Planext CRM"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>

                <Tabs defaultValue="agent" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                        <TabsTrigger value="agent">Agent</TabsTrigger>
                        <TabsTrigger value="admin">Admin</TabsTrigger>
                        <TabsTrigger value="client">Client</TabsTrigger>
                    </TabsList>

                    <TabsContent value="agent">
                        <Card className="border-slate-200 shadow-lg">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">Wait! Who are you?</CardTitle>
                                <CardDescription className="text-center">
                                    Select your role to continue to the CRM.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Phone / Email</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="email"
                                            placeholder="agent@planext.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    onClick={() => handleLogin("agent")}
                                    disabled={loading}
                                >
                                    {loading ? "Signing in..." : "Sign In as Agent"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="admin">
                        <Card className="border-slate-200 shadow-lg border-t-4 border-t-purple-600">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">Admin Access</CardTitle>
                                <CardDescription className="text-center">
                                    Restricted area for company owners.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="admin-email">Phone / Admin Email</Label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="admin-email"
                                            placeholder="admin@planext.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="admin-password">Secure Key</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="admin-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-purple-600 hover:bg-purple-700"
                                    onClick={() => handleLogin("admin")}
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Access Admin Panel"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    <TabsContent value="client">
                        <Card className="border-slate-200 shadow-lg border-t-4 border-t-green-600">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl font-bold text-center">Client Portal</CardTitle>
                                <CardDescription className="text-center">
                                    View your property shortlist and docs.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="client-email">Phone / Email</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="client-email"
                                            placeholder="client@gmail.com"
                                            className="pl-9"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="client-password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                        <Input
                                            id="client-password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-9"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    className="w-full bg-green-600 hover:bg-green-700"
                                    onClick={() => handleLogin("client")}
                                    disabled={loading}
                                >
                                    {loading ? "Accessing..." : "Enter Client View"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                <p className="px-8 text-center text-sm text-muted-foreground mt-8">
                    By clicking continue, you agree to our{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="underline underline-offset-4 hover:text-primary">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
