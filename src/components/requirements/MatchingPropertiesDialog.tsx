"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Requirement, Property } from "@/lib/types";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { ScrollArea } from "@/components/ui/scroll-area";

// We need access to properties here. In a real app this would query the DB.
// For now we will accept properties as a prop or mock them again.
// To keep it simple and self-contained, I'll mock a few matching/non-matching ones or better yet,
// reusing the Mock Data isn't ideal but acceptable for this demo.

const mockProperties: Property[] = [
    {
        id: "1",
        title: "Prime Retail Space MG Road",
        type: "Retail",
        status: "Lease",
        inventoryStatus: "Active",
        source: "Direct",
        location: "MG Road, Bangalore",
        size: "1200 sqft",
        price: "₹1.5L / mo",
        images: [],
        documents: [],
        createdAt: "2024-01-15",
    },
    {
        id: "2",
        title: "Tech Park Office Suite",
        type: "Office",
        status: "Sale",
        inventoryStatus: "Active",
        source: "Channel Partner",
        location: "Whitefield, Bangalore",
        size: "5000 sqft",
        price: "₹4.5 Cr",
        images: [],
        documents: [],
        createdAt: "2024-01-14",
    },
    {
        id: "3",
        title: "Industrial Warehouse",
        type: "Warehouse",
        status: "Lease",
        inventoryStatus: "Passive",
        source: "Investor",
        location: "Peenya, Bangalore",
        size: "10000 sqft",
        price: "₹3.0L / mo",
        images: [],
        documents: [],
        createdAt: "2024-01-10",
    },
    {
        id: "4",
        title: "Corner Plot for Commercial",
        type: "Land",
        status: "Sale",
        inventoryStatus: "Active",
        source: "Direct",
        location: "Indiranagar, Bangalore",
        size: "2400 sqft",
        price: "₹8.0 Cr",
        images: [],
        documents: [],
        createdAt: "2024-01-12",
    },
];

interface MatchingPropertiesDialogProps {
    isOpen: boolean;
    onClose: () => void;
    requirement: Requirement | null;
}

export function MatchingPropertiesDialog({ isOpen, onClose, requirement }: MatchingPropertiesDialogProps) {
    if (!requirement) return null;

    // Basic Matching Logic
    const matches = mockProperties.filter(p => {
        // Map Requirement Type to Property Type (Handle 'Shops' -> 'Retail')
        const reqType = requirement.type === 'Shops' ? 'Retail' : requirement.type;

        const typeMatch = p.type === reqType;
        const statusMatch = p.status === requirement.status;

        return typeMatch && statusMatch;
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Matching Properties</DialogTitle>
                    <DialogDescription>
                        Found {matches.length} properties for {requirement.clientName} ({propsToText(requirement)})
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-1 pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {matches.length > 0 ? (
                            matches.map(p => <PropertyCard key={p.id} property={p} />)
                        ) : (
                            <div className="col-span-2 text-center py-12 text-slate-500">
                                No exact matches found for criteria.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

function propsToText(req: Requirement) {
    return `${req.type}, ${req.status}, ${req.budgetMin}-${req.budgetMax}`;
}
