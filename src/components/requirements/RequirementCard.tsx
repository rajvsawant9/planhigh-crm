import { Requirement } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Wallet, Ruler, Link } from "lucide-react";

interface RequirementCardProps {
    req: Requirement;
}

export function RequirementCard({ req }: RequirementCardProps) {
    return (
        <Card className="hover:shadow-md transition-all duration-300 border-slate-200">
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200">
                            {req.type}
                        </Badge>
                        <Badge className={req.status === 'Sale' ? 'bg-blue-600' : 'bg-purple-600'}>
                            {req.status}
                        </Badge>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">#{req.id}</span>
                </div>
                <CardTitle className="mt-2 text-lg flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-500" />
                    {req.clientName}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                    Via: {req.source}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
                <div className="flex items-start gap-2 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5" />
                    <span className="line-clamp-2">{req.locationPreference}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 p-2 rounded border border-green-100 text-green-700 flex flex-col">
                        <span className="text-xs text-green-600 flex items-center gap-1 mb-1">
                            <Wallet className="h-3 w-3" /> Budget
                        </span>
                        <span className="font-semibold">{req.budgetMin} - {req.budgetMax}</span>
                    </div>
                    <div className="bg-amber-50 p-2 rounded border border-amber-100 text-amber-700 flex flex-col">
                        <span className="text-xs text-amber-600 flex items-center gap-1 mb-1">
                            <Ruler className="h-3 w-3" /> Size
                        </span>
                        <span className="font-semibold">{req.sizeMin} - {req.sizeMax}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 border-t bg-slate-50/50 flex justify-between items-center text-xs text-slate-500">
                <span>Added: {new Date(req.createdAt).toLocaleDateString()}</span>
                {/* Button is handled by parent for now */}
                <div />
            </CardFooter>
        </Card>
    );
}
