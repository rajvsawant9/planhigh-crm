"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { name: "Mon", visits: 4, calls: 12 },
    { name: "Tue", visits: 3, calls: 15 },
    { name: "Wed", visits: 7, calls: 18 },
    { name: "Thu", visits: 5, calls: 10 },
    { name: "Fri", visits: 8, calls: 20 },
    { name: "Sat", visits: 12, calls: 8 },
    { name: "Sun", visits: 5, calls: 5 },
];

export function StatsGraph() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Weekly Activity Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                            dataKey="name"
                            stroke="#64748B"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            stroke="#64748B"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="calls"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorCalls)"
                            name="Calls"
                        />
                        <Area
                            type="monotone"
                            dataKey="visits"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorVisits)"
                            name="Visits"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
