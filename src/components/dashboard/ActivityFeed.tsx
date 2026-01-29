"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, UserPlus, Home, Phone } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { dashboardService, Activity } from "@/services/dashboardService";

export function ActivityFeed() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["dashboardActivity"],
    queryFn: dashboardService.getActivity,
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full p-4 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-900">Recent Activity</h3>
        <p className="text-xs text-slate-500">
          Real-time updates from your team
        </p>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {activities?.map((activity) => (
            <div key={activity.id} className="flex gap-4 relative">
              {/* Connector Line */}
              <div className="absolute left-[18px] top-8 bottom-[-24px] w-px bg-slate-100 last:hidden" />

              <Avatar className="h-9 w-9 border-2 border-white shadow-sm z-10">
                <AvatarImage src={undefined} />{" "}
                {/* Assuming backend doesn't send avatar URL yet */}
                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xs">
                  {typeof activity.user === "string"
                    ? activity.user.substring(0, 2).toUpperCase()
                    : (activity.user as any).name
                        ?.substring(0, 2)
                        .toUpperCase() || "UN"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm text-slate-900 leading-none">
                  <span className="font-semibold">
                    {typeof activity.user === "string"
                      ? activity.user
                      : (activity.user as any).name || "Unknown User"}
                  </span>{" "}
                  <span className="text-slate-500">{activity.description}</span>{" "}
                  {/* Mapping description to action */}
                </p>
                <p className="text-sm font-medium text-blue-600">
                  {/* Backend 'description' might ideally be split into action/target, 
                                        but for now using description as the main text. */}
                </p>
                <p className="text-xs text-slate-400">
                  {new Date(activity.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="shrink-0">
                <ActivityIcon type={activity.type} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case "property":
      return <Home className="h-4 w-4 text-emerald-500" />;
    case "contact":
      return <UserPlus className="h-4 w-4 text-purple-500" />;
    case "call":
      return <Phone className="h-4 w-4 text-blue-500" />;
    default:
      return <CheckCircle2 className="h-4 w-4 text-slate-400" />;
  }
}
