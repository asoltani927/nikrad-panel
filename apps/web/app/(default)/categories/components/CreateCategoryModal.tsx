"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Save } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

const categorySchema = z.object({
    title: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
    description: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
    parent: z.number()
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function CreateCategoryModal() {
    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: "",
            description: "",
            parent: 0,
        },
    });

    const onSubmit = (values: CategoryFormValues) => {
        console.log("Profile Data:", values);
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger className="w-full lg:w-fit">
                    <Button className="bg-blue-500 w-full">
                        ایجاد دسته بندی
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent className="lg:max-w-4xl">

                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-lg font-semibold justify-center">
                            ایجاد دسته بندی
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
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>نام دسته بندی</FormLabel>
                                            <FormControl>
                                                <Input placeholder="نام دسته بندی " {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>توضیحات</FormLabel>
                                            <FormControl>
                                                <Input placeholder="توضیحات" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="parent"
                                    render={({ field }) => (
                                        <Select dir="rtl">
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="دسته بندی والد" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1">ساختمانی</SelectItem>
                                                <SelectItem value="2">مسکونی</SelectItem>
                                                <SelectItem value="3">تجاری</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />

                            </div>

                            <div className="flex justify-end">
                                <Button type="submit" className="flex items-center gap-2">
                                    <Save className="w-4 h-4" />
                                    ذخیره
                                </Button>
                            </div>
                        </form>
                    </Form>


                </DialogContent>
            </Dialog>
        </div>
    )
}