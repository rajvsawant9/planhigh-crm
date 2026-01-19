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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Plus } from "lucide-react"

const formSchema = z.object({
    clientName: z.string().min(2, "Client Name is required"),
    type: z.enum(["Shops", "Office", "Warehouse", "Land"]),
    status: z.enum(["Sale", "Lease", "Pre-Lease"]),
    source: z.enum(["CP", "Direct", "Investor"]),
    budgetMin: z.string().min(1, "Min Budget required"),
    budgetMax: z.string().min(1, "Max Budget required"),
    sizeMin: z.string().min(1, "Min Size required"),
    sizeMax: z.string().min(1, "Max Size required"),
    locationPreference: z.string().min(2, "Location is required"),
})

interface AddRequirementDialogProps {
    onAdd: (req: any) => void;
}

export function AddRequirementDialog({ onAdd }: AddRequirementDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientName: "",
            type: "Shops",
            status: "Lease",
            source: "Direct",
            budgetMin: "",
            budgetMax: "",
            sizeMin: "",
            sizeMax: "",
            locationPreference: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newReq = {
            ...values,
            id: Math.random().toString(36).substr(2, 9),
            createdAt: new Date().toISOString()
        }
        onAdd(newReq)
        form.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" /> Add Requirement
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Add New Requirement</DialogTitle>
                    <DialogDescription>
                        Enter detailed client requirements to find matching properties.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="clientName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Client Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. John Smith" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-3 gap-4">
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
                                                <SelectItem value="Shops">Shops (Retail)</SelectItem>
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
                            <FormField
                                control={form.control}
                                name="source"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Source</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select source" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="CP">Channel Partner</SelectItem>
                                                <SelectItem value="Direct">Direct</SelectItem>
                                                <SelectItem value="Investor">Investor</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="locationPreference"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location Preference</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Near Metro Station, Whitefield" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <FormLabel>Budget Range</FormLabel>
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="budgetMin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Min (e.g. 50k)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="budgetMax"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Max (e.g. 1L)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <FormLabel>Size Range (sqft)</FormLabel>
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="sizeMin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Min (e.g. 1000)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="sizeMax"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="Max (e.g. 2000)" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit">Save Requirement</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
