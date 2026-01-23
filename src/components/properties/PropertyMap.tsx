"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/lib/types";
import L from "leaflet";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";

// Fix for default marker icon issues in Next.js/Leaflet
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface PropertyMapProps {
    properties: Property[];
}

export default function PropertyMap({ properties }: PropertyMapProps) {
    // Center map on Bangalore
    const position: [number, number] = [12.9716, 77.5946];

    return (
        <div className="h-[calc(100vh-200px)] w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm z-0 relative">
            <MapContainer center={position} zoom={11} scrollWheelZoom={true} className="h-full w-full">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {properties.map((property) => {
                    // Mock coordinates since we don't have them in the DB yet
                    // Random dispersion around Bangalore center
                    const lat = 12.9716 + (Math.random() - 0.5) * 0.1;
                    const lng = 77.5946 + (Math.random() - 0.5) * 0.1;

                    return (
                        <Marker key={property.id} position={[lat, lng]} icon={customIcon}>
                            <Popup className="property-popup">
                                <div className="min-w-[200px]">
                                    <h3 className="font-bold text-sm mb-1">{property.title}</h3>
                                    <p className="text-xs text-slate-500 mb-2">{property.location}</p>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-blue-600">{property.price}</span>
                                        <span className="text-xs bg-slate-100 px-2 py-0.5 rounded">{property.type}</span>
                                    </div>
                                    <Button size="sm" className="w-full h-8 text-xs">
                                        View Details <ArrowRight className="ml-1 h-3 w-3" />
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}
