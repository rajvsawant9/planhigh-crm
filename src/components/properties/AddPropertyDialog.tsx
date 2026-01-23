"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus } from "lucide-react"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    type: z.enum(["Retail", "Office", "Warehouse", "Land"]),
    status: z.enum(["Sale", "Lease", "Pre-Lease"]),
    source: z.string().min(2, "Source is required"),
    location: z.string().min(2, "Location is required"),
    size: z.string().min(1, "Size is required"),
    price: z.string().min(1, "Price is required"),
})

interface AddPropertyDialogProps {
    onAdd: (property: any) => void;
}

export function AddPropertyDialog({ onAdd }: AddPropertyDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            type: "Retail",
            status: "Sale",
            source: "",
            location: "",
            size: "",
            price: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newProperty = {
            ...values,
            id: Math.random().toString(36).substr(2, 9),
            images: [],
            documents: [],
            createdAt: new Date().toISOString()
        }
        onAdd(newProperty)
        form.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Property
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new property inventory.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Prime Retail Shop" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select type" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Retail">Retail</SelectItem>
                                                <SelectItem value="Office">Office</SelectItem>
                                                <SelectItem value="Warehouse">Warehouse</SelectItem>
                                                <SelectItem value="Land">Land</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select status" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Sale">Sale</SelectItem>
                                                <SelectItem value="Lease">Lease</SelectItem>
                                                <SelectItem value="Pre-Lease">Pre-Lease</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="source"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Direct / CP Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Area / City" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="size"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Size</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 1200 sqft" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. 1.5 Cr" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="space-y-4 border rounded-md p-4 bg-slate-50">
                            <FormLabel>Documents (DWG, SKP, PDF, Excel, etc.)</FormLabel>
                            <Input
                                type="file"
                                multiple
                                className="cursor-pointer"
                                onChange={(e) => {
                                    // In a real app, we would upload to storage here.
                                    // For now, we mock the file object.
                                    // We are not using RHF for this specific non-controlled input in this simplified version
                                    // or we could use specific handler. 
                                    // We'll trust the user just clicks 'Save' and we attach a dummy file for demo if they picked something.
                                }}
                            />
                            <p className="text-xs text-muted-foreground">
                                Supported: .dwg, .rvt, .skp, .psd, .ls12, .xlsx, .docx, .pdf
                            </p>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save Property</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
