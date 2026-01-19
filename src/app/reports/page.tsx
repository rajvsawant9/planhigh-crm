"use client"

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const monthlyData = [
    { name: 'Week 1', calls: 40, visits: 24, leads: 15 },
    { name: 'Week 2', calls: 30, visits: 18, leads: 10 },
    { name: 'Week 3', calls: 55, visits: 35, leads: 25 },
    { name: 'Week 4', calls: 45, visits: 28, leads: 20 },
];

export default function ReportsPage() {
    return (
        <Shell>
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Reports</h2>
                        <p className="text-muted-foreground">Detailed insights on performance and inventory.</p>
                    </div>
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" /> Export Report
                    </Button>
                </div>

                <Tabs defaultValue="monthly" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="daily">Daily</TabsTrigger>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    </TabsList>

                    <TabsContent value="monthly" className="space-y-4">
                        {/* Summary Metrics */}
                        <div className="grid gap-4 md:grid-cols-4">
                            <SummaryCard title="Inventory Received" value="24" sub="Properties Added" icon={FileText} />
                            <SummaryCard title="Requirements" value="15" sub="New Leads" icon={FileText} />
                            <SummaryCard title="Brand Approaches" value="8" sub="Pitches Made" icon={FileText} />
                            <SummaryCard title="New Connects" value="12" sub="Developers/CPs" icon={FileText} />
                        </div>

                        {/* Charts */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Performance Overview (Calls vs Visits vs Leads)</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={monthlyData}>
                                        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Legend />
                                        <Bar dataKey="calls" name="Calls Made" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="visits" name="Site Visits" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="leads" name="Closed Deals" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </Shell>
    );
}

function SummaryCard({ title, value, sub, icon: Icon }: any) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{sub}</p>
            </CardContent>
        </Card>
    )
}
