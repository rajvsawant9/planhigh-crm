import { Requirement } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, User, Wallet, Ruler, Link, Mail, Phone, Share2 } from "lucide-react";

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
                <div className="flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Mail className="h-3 w-3" /> {req.clientEmail}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Phone className="h-3 w-3" /> {req.clientPhone}
                    </div>
                </div>
                <CardDescription className="flex items-center gap-1 text-xs mt-2">
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
            <CardFooter className="p-4 border-t bg-slate-50/50 flex justify-between items-center">
                <div className="flex flex-col text-[10px] text-slate-500">
                    <span>Added: {new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                    onClick={(e) => {
                        e.stopPropagation();
                        const text = `*New Requirement on Planext CRM* 📋\n\n*Client:* ${req.clientName}\n*Type:* ${req.type} (${req.status})\n*Budget:* ${req.budgetMin} - ${req.budgetMax}\n*Size:* ${req.sizeMin} - ${req.sizeMax} sqft\n*Location:* ${req.locationPreference}`;
                        window.open(`https://wa.me/${req.clientPhone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                >
                    <Share2 className="h-3.5 w-3.5 mr-1" /> WhatsApp
                </Button>
            </CardFooter>
        </Card>
    );
}
