"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Save } from "lucide-react"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Spinner } from "@/components/ui/spinner"

export const fieldSchema = z.object({
    name: z.string().min(1, "نام الزامی است"),
    title: z.string().min(1, "عنوان الزامی است"),
    type: z.enum(["TEXT", "NUMBER", "DATE", "CHECKBOX", "RADIO", "SELECT", "TEXTAREA", "FILE"]),
    required: z.boolean(),
    order: z.number(),
    step: z.number(),
    categoryId: z.number(),
    target: z.enum(["MATERIAL_BOOK", "OTHER_TARGET"]),
})

export type fieldFormValues = z.infer<typeof fieldSchema>

interface FieldDialogProps {
    onSubmit: (values: fieldFormValues) => void
    open: boolean
    onOpenChange: (open: boolean) => void
    loading?: boolean
}

export function FieldDialog({ onSubmit, open, onOpenChange, loading }: FieldDialogProps) {
    const form = useForm<fieldFormValues>({
        resolver: zodResolver(fieldSchema),
        defaultValues: {
            name: "",
            title: "",
            type: "TEXT",
            required: false,
            order: 0,
            step: 0,
            categoryId: 0,
            target: "MATERIAL_BOOK",
        },
    })

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>

            <DialogContent className="lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold justify-center">
                        افزودن فیلد
                    </DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نام</FormLabel>
                                        <FormControl>
                                            <Input placeholder="نام" {...field} disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>عنوان</FormLabel>
                                        <FormControl>
                                            <Input placeholder="عنوان" {...field} disabled={loading} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="type"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>نوع</FormLabel>
                                        <FormControl>
                                            <Select
                                                dir="rtl"
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                disabled={loading}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="انتخاب نوع" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TEXT">TEXT</SelectItem>
                                                    <SelectItem value="NUMBER">NUMBER</SelectItem>
                                                    <SelectItem value="CHECKBOX">CHECKBOX</SelectItem>
                                                    <SelectItem value="RADIO">RADIO</SelectItem>
                                                    <SelectItem value="SELECT">SELECT</SelectItem>
                                                    <SelectItem value="DATE">DATE</SelectItem>
                                                    <SelectItem value="TEXTAREA">TEXTAREA</SelectItem>
                                                    <SelectItem value="FILE">FILE</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="required"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center space-x-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormLabel>اجباری</FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="order"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ترتیب</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
                                                placeholder="ترتیب"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="step"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>مرحله</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
                                                placeholder="مرحله"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="categoryId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>دسته‌بندی</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
                                                placeholder="دسته‌بندی"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="target"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Target</FormLabel>
                                        <FormControl>
                                            <Select
                                                dir="rtl"
                                                value={field.value}
                                                onValueChange={field.onChange}
                                                disabled={loading}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="انتخاب Target" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="MATERIAL_BOOK">MATERIAL_BOOK</SelectItem>
                                                    <SelectItem value="OTHER_TARGET">OTHER_TARGET</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                className="flex items-center gap-2"
                                disabled={loading}
                            >
                                {loading && <Spinner />}
                                <Save className="w-4 h-4" />
                                ذخیره
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
