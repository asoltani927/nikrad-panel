"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
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
import { Save } from "lucide-react"
import { fieldSchema, fieldFormValues } from "./CreateFieldModal"

interface EditCustomFieldModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    loading?: boolean
    onSubmit: (values: fieldFormValues) => void
    fieldData: fieldFormValues | null
}

export function EditCustomFieldModal({
    open,
    onOpenChange,
    loading,
    onSubmit,
    fieldData
}: EditCustomFieldModalProps) {

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

    useEffect(() => {
        if (fieldData) form.reset(fieldData)
    }, [fieldData, form])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:max-w-4xl">
                <DialogHeader>
                    <DialogTitle className="text-center text-lg font-semibold">
                        ویرایش فیلد
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
                                            <Input {...field} disabled={loading} />
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
                                            <Input {...field} disabled={loading} />
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
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={loading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="نوع فیلد" />
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="required"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center gap-2">
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
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
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
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
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
                                                value={field.value?.toString() || ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                disabled={loading}
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
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            disabled={loading}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="MATERIAL_BOOK">MATERIAL_BOOK</SelectItem>
                                                <SelectItem value="OTHER_TARGET">OTHER_TARGET</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading} className="flex gap-2">
                                {loading && <Spinner />}
                                <Save className="w-4 h-4" />
                                ذخیره تغییرات
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}