import { Shell } from "@/components/layout/Shell";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { StatsGraph } from "@/components/dashboard/StatsGraph";
import { FollowUpList } from "@/components/dashboard/FollowUpList";

export default function DashboardPage() {
  return (
    <Shell>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Welcome back, <span className="font-semibold text-blue-600">John</span>. Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border shadow-sm text-sm text-slate-600">
            <span className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>

        <StatsCards />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <StatsGraph />
          </div>
          <div className="col-span-3">
            <FollowUpList />
          </div>
        </div>
      </div>
    </Shell>
  );
}
