import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const followUps = [
    {
        name: "Rajesh Kumar",
        email: "rajesh.k@example.com",
        type: "Site Visit",
        time: "10:00 AM",
        status: "Pending",
        initials: "RK",
    },
    {
        name: "Amit Shinoy",
        email: "amit.shinoy@brands.com",
        type: "Call",
        time: "11:30 AM",
        status: "Confirmed",
        initials: "AS",
    },
    {
        name: "Sneha Reddy",
        email: "sneha.r@investors.com",
        type: "Meeting",
        time: "2:00 PM",
        status: "Pending",
        initials: "SR",
    },
    {
        name: "Vikram Malhotra",
        email: "vikram.m@developer.com",
        type: "Call",
        time: "4:30 PM",
        status: "Completed",
        initials: "VM",
    },
];

export function FollowUpList() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Today's Follow Ups</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {followUps.map((item, index) => (
                        <div key={index} className="flex items-center">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">{item.initials}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                    {item.email}
                                </p>
                            </div>
                            <div className="ml-auto font-medium text-sm flex flex-col items-end gap-1">
                                <span>{item.time}</span>
                                <Badge variant={item.status === 'Pending' ? 'destructive' : item.status === 'Completed' ? 'secondary' : 'outline'} className="text-[10px] px-2 py-0 h-5">
                                    {item.type}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
