"use client";

import { Property } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize2, FileText, Share2 } from "lucide-react";
import Image from "next/image";
import { generatePropertyPDF } from "@/lib/pdfGenerator";

interface PropertyCardProps {
    property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
    return (
        <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-slate-200">
            <div className="relative h-48 w-full bg-slate-100">
                {property.images[0] ? (
                    // Using a placeholder for now since we don't have real images
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                        <span className="text-sm">Image Preview</span>
                    </div>
                    // <Image 
                    //   src={property.images[0]} 
                    //   alt={property.title} 
                    //   fill 
                    //   className="object-cover group-hover:scale-105 transition-transform duration-500"
                    // />
                ) : (
                    <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
                        <span className="text-sm">No Image</span>
                    </div>
                )}
                <div className="absolute top-2 right-2 flex gap-2 flex-wrap justify-end">
                    <Badge variant="secondary" className={`border-0 text-white shadow-sm ${
                        property.inventoryStatus === 'Active' ? 'bg-emerald-500 hover:bg-emerald-600' :
                        property.inventoryStatus === 'Passive' ? 'bg-amber-500 hover:bg-amber-600' :
                        'bg-slate-500 hover:bg-slate-600'
                    }`}>
                        {property.inventoryStatus}
                    </Badge>
                    <Badge variant={property.status === 'Sale' ? 'default' : 'secondary'} className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-sm text-white border-0">
                        {property.status}
                    </Badge>
                    <Badge variant="outline" className="bg-white/80 backdrop-blur-sm border-0 font-medium text-slate-900">
                        {property.type}
                    </Badge>
                </div>
            </div>
            <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg line-clamp-1">{property.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1 text-xs">
                            <MapPin className="h-3 w-3" /> {property.location}
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">{property.price}</div>
                        <div className="text-xs text-muted-foreground">{property.size}</div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mt-2">
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="block font-semibold text-slate-700">Source</span>
                        {property.source}
                    </div>
                    <div className="bg-slate-50 p-2 rounded border border-slate-100">
                        <span className="block font-semibold text-slate-700">Created</span>
                        {new Date(property.createdAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Documents Section */}
                {property.documents && property.documents.length > 0 && (
                    <div className="mt-3 space-y-1">
                        <span className="text-xs font-semibold text-slate-700">Documents</span>
                        <div className="flex flex-wrap gap-2">
                            {property.documents.map((doc, i) => (
                                <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0.5 h-6 flex items-center gap-1 bg-slate-100 text-slate-600 border-slate-200">
                                    <FileIcon type={doc.extension} />
                                    {doc.extension.toUpperCase()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="p-4 border-t bg-slate-50/50 grid grid-cols-2 gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => generatePropertyPDF(property)}
                >
                    <FileText className="h-3 w-3 mr-2" />
                    PDF
                </Button>
                <Button
                    variant="default"
                    size="sm"
                    className="w-full text-xs bg-[#25D366] hover:bg-[#128C7E] text-white border-0 shadow-sm font-semibold"
                    onClick={() => {
                        const text = `*Check out this property on Planext CRM* 🏠\n\n*${property.title}*\n📍 Location: ${property.location}\n💰 Price: ${property.price}\n📏 Size: ${property.size}\n\nType: ${property.type} for ${property.status}`;
                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                    }}
                >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share on WhatsApp
                </Button>
            </CardFooter>
        </Card>
    );
}

function FileIcon({ type }: { type: string }) {
    const t = type.toLowerCase().replace('.', '');
    if (['dwg', 'dxf'].includes(t)) return <Maximize2 className="h-3 w-3 text-blue-600" />;
    if (['skp'].includes(t)) return <Maximize2 className="h-3 w-3 text-amber-600" />; // Sketchup
    if (['rvt'].includes(t)) return <Maximize2 className="h-3 w-3 text-cyan-600" />; // Revit
    if (['psd'].includes(t)) return <FileText className="h-3 w-3 text-indigo-600" />;
    if (['xls', 'xlsx'].includes(t)) return <FileText className="h-3 w-3 text-green-600" />;
    if (['doc', 'docx'].includes(t)) return <FileText className="h-3 w-3 text-blue-500" />;
    return <FileText className="h-3 w-3 text-slate-400" />;
}
