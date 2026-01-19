"use client"

import { Shell } from "@/components/layout/Shell";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Mock scheduled events
    const events = [
        { date: new Date().getDate(), title: "Site Visit: MG Road", type: "Visit" },
        { date: new Date().getDate(), title: "Call with Deepak (Developer)", type: "Call" },
        { date: new Date().getDate() + 2, title: "Meeting with H&M Team", type: "Meeting" },
        { date: new Date().getDate() + 5, title: "Follow up: Lease Renewal", type: "Call" },
    ];

    const selectedEvents = events.filter(e =>
        date && e.date === date.getDate() // Simplified date matching for demo
    );

    return (
        <Shell>
            <div className="flex flex-col space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-800">Calendar</h2>
                    <p className="text-muted-foreground">Manage your schedule and follow-ups.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-7">
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Schedule</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-md border"
                            />
                        </CardContent>
                    </Card>

                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Events for {date?.toLocaleDateString()}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {selectedEvents.length > 0 ? (
                                    selectedEvents.map((event, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50">
                                            <div>
                                                <h4 className="font-semibold">{event.title}</h4>
                                                <span className="text-sm text-slate-500">10:00 AM (Tentative)</span>
                                            </div>
                                            <Badge variant={event.type === 'Visit' ? 'default' : 'secondary'}>
                                                {event.type}
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-slate-400">
                                        No events scheduled for this day.
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Shell>
    );
}
