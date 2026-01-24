"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, UserPlus, Home, Phone, FileText } from "lucide-react";

interface Activity {
    id: string;
    user: {
        name: string;
        avatar?: string;
        initials: string;
    };
    action: string;
    target: string;
    time: string;
    type: "property" | "contact" | "deal" | "call";
}

const mockActivities: Activity[] = [
    {
        id: "1",
        user: { name: "Raj Sawant", initials: "RS" },
        action: "added a new property",
        target: "Skyline Apartments, Whitefield",
        time: "Just now",
        type: "property"
    },
    {
        id: "2",
        user: { name: "Admin User", initials: "AD" },
        action: "updated the status of",
        target: "Tech Park Office Suite",
        time: "10 mins ago",
        type: "deal"
    },
    {
        id: "3",
        user: { name: "Raj Sawant", initials: "RS" },
        action: "scheduled a site visit for",
        target: "Mr. Sharma (Investor)",
        time: "1 hour ago",
        type: "contact"
    },
    {
        id: "4",
        user: { name: "System", initials: "SYS" },
        action: "generated a report",
        target: "Weekly Sales Performance",
        time: "2 hours ago",
        type: "file"
    },
    {
        id: "5",
        user: { name: "Team Member", initials: "TM" },
        action: "called",
        target: "+91 98765 43210",
        time: "4 hours ago",
        type: "call"
    }
];

export function ActivityFeed() {
    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden h-full flex flex-col">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-semibold text-slate-900">Recent Activity</h3>
                <p className="text-xs text-slate-500">Real-time updates from your team</p>
            </div>
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-6">
                    {mockActivities.map((activity) => (
                        <div key={activity.id} className="flex gap-4 relative">
                            {/* Connector Line */}
                            <div className="absolute left-[18px] top-8 bottom-[-24px] w-px bg-slate-100 last:hidden" />
                            
                            <Avatar className="h-9 w-9 border-2 border-white shadow-sm z-10">
                                <AvatarImage src={activity.user.avatar} />
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xs">{activity.user.initials}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm text-slate-900 leading-none">
                                    <span className="font-semibold">{activity.user.name}</span>{" "}
                                    <span className="text-slate-500">{activity.action}</span>
                                </p>
                                <p className="text-sm font-medium text-blue-600">{activity.target}</p>
                                <p className="text-xs text-slate-400">{activity.time}</p>
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
        case "property": return <Home className="h-4 w-4 text-emerald-500" />;
        case "contact": return <UserPlus className="h-4 w-4 text-purple-500" />;
        case "call": return <Phone className="h-4 w-4 text-blue-500" />;
        default: return <CheckCircle2 className="h-4 w-4 text-slate-400" />;
    }
}
