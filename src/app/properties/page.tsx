"use client";

import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, AlertCircle } from "lucide-react";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { MobilePropertyCard } from "@/components/properties/MobilePropertyCard";
import { AddPropertyDialog } from "@/components/properties/AddPropertyDialog";
import { Property } from "@/lib/types";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LayoutList, Map as MapIcon } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { propertyService } from "@/services/propertyService";
import { toast } from "sonner";

// Dynamically import map to avoid SSR issues
const PropertyMap = dynamic(
  () => import("@/components/properties/PropertyMap"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400">
        Loading Map...
      </div>
    ),
  },
);

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [inventoryFilter, setInventoryFilter] = useState<
    "All" | "Active" | "Passive" | "Closed"
  >("All");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchTerm, setSearchTerm] = useState("");

  const queryClient = useQueryClient();

  // fetch properties
  const {
    data: properties = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      try {
        const data = await propertyService.getProperties();
        return data || [];
      } catch (error) {
        toast.error("Failed to load properties");
        throw error;
      }
    },
  });

  // mutation for adding property
  const createPropertyMutation = useMutation({
    mutationFn: propertyService.createProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property added successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to add property");
    },
  });

  const handleAddProperty = (newProperty: any) => {
    // The dialog returns values, we might need to adapt them or just pass them if they match.
    // Assuming backend handles ID generation or we pass partial.
    // The service expects Omit<Property, "id" | "createdAt" | "updatedAt"> ideally, or just Property.
    // For now, passing as is.
    createPropertyMutation.mutate(newProperty);
  };

  const filteredProperties = properties.filter((p) => {
    const matchesType = activeTab === "all" || p.type === activeTab;
    const matchesInventory =
      inventoryFilter === "All" || p.inventoryStatus === inventoryFilter;
    const matchesSearch =
      searchTerm === "" ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesInventory && matchesSearch;
  });

  const inventoryStats = {
    total: properties.length,
    active: properties.filter((p) => p.inventoryStatus === "Active").length,
    passive: properties.filter((p) => p.inventoryStatus === "Passive").length,
    closed: properties.filter((p) => p.inventoryStatus === "Closed").length,
  };

  if (isError) {
    return (
      <Shell>
        <div className="h-full flex flex-col items-center justify-center space-y-4 min-h-[50vh]">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold text-slate-900">
            Failed to load properties
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
              Properties
            </h2>
            <p className="text-muted-foreground">
              Manage your real estate inventory.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 px-3"
              >
                <LayoutList className="h-4 w-4 mr-2" /> List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="h-8 px-3"
              >
                <MapIcon className="h-4 w-4 mr-2" /> Map
              </Button>
            </div>
            <AddPropertyDialog onAdd={handleAddProperty} />
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-[300px] bg-slate-100 rounded-xl"></div>
            ))}
          </div>
        ) : viewMode === "list" ? (
          <>
            <div className="flex flex-col gap-4">
              {/* Analytics Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Total Inventory
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {inventoryStats.total}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-green-100 shadow-sm bg-green-50/30">
                  <div className="text-xs font-medium text-green-600 uppercase tracking-wider">
                    Active
                  </div>
                  <div className="text-2xl font-bold text-green-700 mt-1">
                    {inventoryStats.active}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm bg-amber-50/30">
                  <div className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                    Passive
                  </div>
                  <div className="text-2xl font-bold text-amber-700 mt-1">
                    {inventoryStats.passive}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm bg-slate-50">
                  <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Closed
                  </div>
                  <div className="text-2xl font-bold text-slate-600 mt-1">
                    {inventoryStats.closed}
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-lg border shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search properties..."
                    className="pl-8 bg-slate-50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm font-medium text-slate-700">
                    Status:
                  </span>
                  <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                    {(["All", "Active", "Passive", "Closed"] as const).map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setInventoryFilter(status)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                            inventoryFilter === status
                              ? "bg-white text-slate-900 shadow-sm"
                              : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          {status}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filteredProperties.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <Plus className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  No properties found
                </h3>
                <p className="text-slate-500 text-sm mt-1 mb-4 max-w-sm text-center">
                  {searchTerm
                    ? `No results for "${searchTerm}"`
                    : "Get started by adding your first property to the inventory."}
                </p>
                {searchTerm ? (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                ) : (
                  <div className="pointer-events-none opacity-50">
                    <Button>Add Property</Button>
                  </div>
                )}
              </div>
            ) : (
              <Tabs
                defaultValue="all"
                className="space-y-4"
                onValueChange={setActiveTab}
              >
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="Retail">Retail</TabsTrigger>
                  <TabsTrigger value="Office">Office</TabsTrigger>
                  <TabsTrigger value="Warehouse">Warehouse</TabsTrigger>
                  <TabsTrigger value="Land">Land</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                  {/* Mobile View */}
                  <div className="md:hidden space-y-4">
                    {filteredProperties.map((p) => (
                      <MobilePropertyCard key={p.id} property={p} />
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredProperties.map((p) => (
                      <PropertyCard key={p.id} property={p} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </>
        ) : (
          <PropertyMap properties={filteredProperties} />
        )}
      </div>
    </Shell>
  );
}
