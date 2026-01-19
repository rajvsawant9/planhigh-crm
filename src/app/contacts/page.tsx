"use client"

import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { useState } from "react";
import { ContactCard } from "@/components/contacts/ContactCard";
import { AddContactDialog } from "@/components/contacts/AddContactDialog";

const initialContacts: Contact[] = [
    {
        id: "C1",
        name: "Vikram Oberoi",
        companyName: "Oberoi Builders",
        phone: "9876543210",
        type: "Developer",
        location: "Mumbai",
        remark: "Looking for land parcels in North Bangalore"
    },
    {
        id: "C2",
        name: "Anjali Gupta",
        companyName: "Starbucks India",
        phone: "9988776655",
        type: "Brand",
        location: "Bangalore",
        remark: "Expanding in Tier 1 cities, high street preferred"
    },
    {
        id: "C3",
        name: "Rahul Desai",
        companyName: "Wealth Estates",
        phone: "9123456789",
        type: "Channel Partner",
        location: "Pune",
        remark: "Reliable partner for residential deals"
    },
    {
        id: "C4",
        name: "Suresh Menon",
        companyName: "HNI Individual",
        phone: "8899776655",
        type: "Investor",
        location: "Chennai",
        remark: "Interested in pre-leased commercial assets"
    }
];

export default function ContactsPage() {
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [activeTab, setActiveTab] = useState("all");

    const handleAdd = (contact: Contact) => {
        setContacts([contact, ...contacts]);
    };

    const filteredContacts = activeTab === "all"
        ? contacts
        : contacts.filter(c => c.type === activeTab);

    return (
        <Shell>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800">Contacts</h2>
                        <p className="text-muted-foreground">Manage Developers, Brands, Partners, and Investors.</p>
                    </div>
                    <AddContactDialog onAdd={handleAdd} />
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg border shadow-sm">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search by name, company..."
                            className="pl-8 bg-slate-50"
                        />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
                    <div className="flex overflow-auto pb-2">
                        <TabsList className="w-full justify-start">
                            <TabsTrigger value="all">All</TabsTrigger>
                            <TabsTrigger value="Developer">Developers</TabsTrigger>
                            <TabsTrigger value="Brand">Brands</TabsTrigger>
                            <TabsTrigger value="Channel Partner">CPs</TabsTrigger>
                            <TabsTrigger value="Investor">Investors</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value={activeTab} className="space-y-4">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {filteredContacts.map(c => (
                                <ContactCard key={c.id} contact={c} />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </Shell>
    );
}
