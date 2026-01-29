"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, Calendar, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboardService";

export function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: dashboardService.getStats,
  });

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-slate-100 rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="hover:shadow-lg transition-all duration-300 border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Total Properties
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-blue-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">
            {stats.totalProperties || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600 font-medium">
            <TrendingUp className="h-3 w-3 mr-1" /> +4 added this week
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-all duration-300 border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Closed Deals
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
            <Calendar className="h-4 w-4 text-amber-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">
            {stats.closedDeals || 0}
          </div>
          <p className="text-xs text-muted-foreground mt-1 text-amber-600 font-medium">
            3 urgent for today
          </p>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-all duration-300 border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600">
            Revenue
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <Users className="h-4 w-4 text-purple-600" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-800">
            ${stats.revenue?.toLocaleString() || "0"}
          </div>
          <p className="text-xs text-muted-foreground mt-1 flex items-center text-green-600 font-medium">
            <TrendingUp className="h-3 w-3 mr-1" /> +12% from last month
          </p>
        </CardContent>
      </Card>
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-200">
            Active Leads
          </CardTitle>
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeLeads || 0}</div>
          <p className="text-xs text-slate-300 mt-1 flex items-center">
            +2 new today
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
