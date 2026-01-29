"use client";

import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, AlertCircle, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { useState } from "react";
import { ContactCard } from "@/components/contacts/ContactCard";
import { AddContactDialog } from "@/components/contacts/AddContactDialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "@/services/contactService";
import { toast } from "sonner";

export default function ContactsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  const {
    data: contacts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      try {
        const data = await contactService.getContacts();
        return data || [];
      } catch (error) {
        toast.error("Failed to load contacts");
        throw error;
      }
    },
  });

  const createContactMutation = useMutation({
    mutationFn: contactService.createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add contact");
    },
  });

  const handleAdd = (newContact: any) => {
    createContactMutation.mutate(newContact);
  };

  const filteredContacts = contacts.filter((c) => {
    const matchesType = activeTab === "all" || c.type === activeTab;
    const matchesSearch =
      searchTerm === "" ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  if (isError) {
    return (
      <Shell>
        <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-[50vh]">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900">
            Failed to load contacts
          </h2>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
              Contacts
            </h2>
            <p className="text-muted-foreground">
              Manage Developers, Brands, Partners, and Investors.
            </p>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[200px] bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <div className="bg-white p-4 rounded-full shadow-sm mb-4">
              <UserPlus className="h-6 w-6 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              No contacts found
            </h3>
            <p className="text-slate-500 text-sm mt-1 mb-4 max-w-sm text-center">
              {searchTerm
                ? `No results for "${searchTerm}"`
                : "Get started by adding your first contact."}
            </p>
            {searchTerm ? (
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear Search
              </Button>
            ) : (
              <div className="pointer-events-none opacity-50">
                <Button>Add Contact</Button>
              </div>
            )}
          </div>
        ) : (
          <Tabs
            defaultValue="all"
            className="space-y-4"
            onValueChange={setActiveTab}
          >
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
                {filteredContacts.map((c) => (
                  <ContactCard key={c.id} contact={c} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Shell>
  );
}
