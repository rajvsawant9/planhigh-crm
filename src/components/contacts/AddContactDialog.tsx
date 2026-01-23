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
import { Plus, UserPlus } from "lucide-react"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    companyName: z.string().min(2, "Company Name is required"),
    phone: z.string().min(10, "Valid phone required"),
    type: z.enum(["Developer", "Channel Partner", "Brand", "Investor"]),
    location: z.string().min(2, "Location is required"),
    remark: z.string().optional(),
})

interface AddContactDialogProps {
    onAdd: (contact: any) => void;
}

export function AddContactDialog({ onAdd }: AddContactDialogProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            companyName: "",
            phone: "",
            type: "Developer",
            location: "",
            remark: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newContact = {
            ...values,
            id: Math.random().toString(36).substr(2, 9),
        }
        onAdd(newContact)
        form.reset();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>
                        Add details for Developer, CP, Brand, or Investor.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Developer">Developer</SelectItem>
                                            <SelectItem value="Channel Partner">Channel Partner</SelectItem>
                                            <SelectItem value="Brand">Brand</SelectItem>
                                            <SelectItem value="Investor">Investor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Person Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Company Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Company / Agency" {...field} />
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
                                        <Input placeholder="City / Area" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="remark"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Remarks (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Any additional notes..." className="resize-none" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button type="submit">Save Contact</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
