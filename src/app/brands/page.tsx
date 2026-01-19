"use client"

import { Shell } from "@/components/layout/Shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, CheckCircle2, Clock, XCircle } from "lucide-react";

// This would ideally be linked to the Contacts DB where type='Brand'
const brandPipeline = [
    { id: 1, name: "Starbucks", status: "Negotiation", date: "2024-01-10", notes: "Discussing MG Road rates" },
    { id: 2, name: "Zara", status: "Initial Pitch", date: "2024-01-12", notes: "Sent brochure for Indiranagar" },
    { id: 3, name: "H&M", status: "Interested", date: "2024-01-05", notes: "Site visit scheduled next week" },
    { id: 4, name: "McDonalds", status: "Closed (Won)", date: "2023-12-20", notes: "Lease signed for Whitefield" },
    { id: 5, name: "Subway", status: "Dropped", date: "2023-12-25", notes: "Budget mismatch" },
];

export default function BrandApproachedPage() {
    return (
        <Shell>
            <div className="flex flex-col space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Brand Approached</h2>
                        <p className="text-muted-foreground">Track the status of brands you are pitching properties to.</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        <Plus className="mr-2 h-4 w-4" /> Log New Approach
                    </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Status Columns */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                            <Clock className="h-4 w-4 text-amber-500" /> In Progress
                        </div>
                        {brandPipeline.filter(b => ['Initial Pitch', 'Interested', 'Negotiation'].includes(b.status)).map(brand => (
                            <PipelineCard key={brand.id} brand={brand} />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                            <CheckCircle2 className="h-4 w-4 text-green-500" /> Closed / Won
                        </div>
                        {brandPipeline.filter(b => b.status === 'Closed (Won)').map(brand => (
                            <PipelineCard key={brand.id} brand={brand} />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-semibold text-slate-700">
                            <XCircle className="h-4 w-4 text-red-500" /> Dropped
                        </div>
                        {brandPipeline.filter(b => b.status === 'Dropped').map(brand => (
                            <PipelineCard key={brand.id} brand={brand} />
                        ))}
                    </div>
                </div>
            </div>
        </Shell>
    );
}

function PipelineCard({ brand }: { brand: any }) {
    return (
        <Card className="hover:shadow-md transition-all">
            <CardHeader className="p-4 py-3">
                <div className="flex justify-between">
                    <CardTitle className="text-base">{brand.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">{brand.status}</Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-slate-500">
                <p className="mb-2">{brand.notes}</p>
                <div className="text-xs text-slate-400">Last update: {brand.date}</div>
            </CardContent>
        </Card>
    )
}
