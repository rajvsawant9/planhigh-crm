import { Contact } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Building, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ContactCardProps {
    contact: Contact;
}

export function ContactCard({ contact }: ContactCardProps) {
    const getInitials = (name: string) => name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'Developer': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
            case 'Brand': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
            case 'Investor': return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'Channel Partner': return 'bg-amber-100 text-amber-700 hover:bg-amber-200';
            default: return 'bg-slate-100 text-slate-700';
        }
    }

    return (
        <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                    <AvatarFallback className="bg-slate-800 text-white font-medium">
                        {getInitials(contact.name)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <h3 className="font-semibold text-base leading-none">{contact.name}</h3>
                    <span className="text-sm text-slate-500 mt-1">{contact.companyName}</span>
                </div>
                <div className="ml-auto">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4 text-slate-400" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 space-y-3">
                <Badge variant="outline" className={`border-0 ${getBadgeColor(contact.type)}`}>
                    {contact.type}
                </Badge>

                <div className="space-y-2 text-sm text-slate-600 mt-2">
                    <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-slate-400" />
                        <span>{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{contact.location}</span>
                    </div>
                </div>
                {contact.remark && (
                    <div className="mt-3 p-2 bg-slate-50 rounded text-xs text-slate-500 italic">
                        "{contact.remark}"
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
