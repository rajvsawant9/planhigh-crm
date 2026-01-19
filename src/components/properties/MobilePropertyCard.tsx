import { Property } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, MessageCircle } from "lucide-react";

interface MobilePropertyCardProps {
    property: Property;
}

export function MobilePropertyCard({ property }: MobilePropertyCardProps) {
    return (
        <Card className="mb-4 border-l-4 border-l-blue-600 shadow-sm overflow-hidden">
            <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">{property.title}</h3>
                        <div className="flex items-center text-slate-500 text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {property.location}
                        </div>
                    </div>
                    <Badge variant={property.status === 'Sale' ? 'default' : 'secondary'}>
                        {property.status}
                    </Badge>
                </div>

                <div className="flex gap-3 text-sm mb-4">
                    <div className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                        {property.type}
                    </div>
                    <div className="bg-slate-100 px-2 py-1 rounded text-slate-700 font-medium">
                        {property.size}
                    </div>
                    <div className="ml-auto font-bold text-blue-600 text-lg">
                        {property.price}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                    </Button>
                    <Button variant="outline" className="w-full border-blue-600 text-blue-600" size="lg">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
