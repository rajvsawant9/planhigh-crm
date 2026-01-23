"use client"

import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Requirement } from "@/lib/types";
import { useState } from "react";
import { RequirementCard } from "@/components/requirements/RequirementCard";
import { AddRequirementDialog } from "@/components/requirements/AddRequirementDialog";

const initialRequirements: Requirement[] = [
    {
        id: "R1",
        clientName: "Global Tech Solutions",
        type: "Office",
        status: "Lease",
        source: "Direct",
        budgetMin: "1.5L",
        budgetMax: "2.5L",
        sizeMin: "2000",
        sizeMax: "3500",
        locationPreference: "Electronic City or Koramangala",
        createdAt: "2024-01-16T10:00:00Z"
    },
    {
        id: "R2",
        clientName: "Mr. Sharma (Investor)",
        type: "Land",
        status: "Sale",
        source: "Investor",
        budgetMin: "5 Cr",
        budgetMax: "8 Cr",
        sizeMin: "2400",
        sizeMax: "5000",
        locationPreference: "North Bangalore, near Airport",
        createdAt: "2024-01-15T14:30:00Z"
    }
];

import { MatchingPropertiesDialog } from "@/components/requirements/MatchingPropertiesDialog";

export default function RequirementsPage() {
    const [requirements, setRequirements] = useState<Requirement[]>(initialRequirements);
    const [activeTab, setActiveTab] = useState("all");

    // Dialog State
    const [selectedReq, setSelectedReq] = useState<Requirement | null>(null);

    const handleAdd = (req: Requirement) => {
        setRequirements([req, ...requirements]);
    };

    const filteredReqs = activeTab === "all"
        ? requirements
        : requirements.filter(r => {
            if (activeTab === "Shops") return r.type === "Shops";
            if (activeTab === "Office") return r.type === "Office";
            if (activeTab === "Warehouse") return r.type === "Warehouse";
            if (activeTab === "Land") return r.type === "Land";
            return true;
        });

    return (
        <Shell>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Requirements</h2>
                        <p className="text-muted-foreground">Track client needs and find matching properties.</p>
                    </div>
                    <AddRequirementDialog onAdd={handleAdd} />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg border shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search client, location..."
                            className="pl-8 bg-slate-50"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="Shops">Shops</TabsTrigger>
                        <TabsTrigger value="Office">Office</TabsTrigger>
                        <TabsTrigger value="Warehouse">Warehouse</TabsTrigger>
                        <TabsTrigger value="Land">Land</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredReqs.map(req => (
                                <div key={req.id} className="relative">
                                    <RequirementCard req={req} />
                                    {/* Overlay click handler onto the card's button specifically is hard without prop drilling, 
                                        so we will modify RequirementCard to accept an onFindMatches prop */}
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        className="absolute bottom-4 right-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50 z-10"
                                        onClick={() => setSelectedReq(req)}
                                    >
                                        Find Matches
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>

                <MatchingPropertiesDialog
                    isOpen={!!selectedReq}
                    onClose={() => setSelectedReq(null)}
                    requirement={selectedReq}
                />
            </div>
        </Shell>
    );
}
