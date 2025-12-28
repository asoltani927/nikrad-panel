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
import { Category } from "@/types";
import { Spinner } from "@/components/ui/spinner";

const categorySchema = z.object({
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  slug: z.string().min(2, "اسلاگ باید حداقل ۲ حرف باشد"),
  parentId: z.number().nullable(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CreateCategoryModalProps {
  categories: Category[];
  onSubmit: (values: CategoryFormValues) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  loading?: boolean;
}

export function CreateCategoryModal({
  categories,
  onSubmit,
  loading,
  open,
  onOpenChange,
}: CreateCategoryModalProps & { loading: boolean }) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      parentId: null,
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 w-full lg:w-fit flex items-center gap-2">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نام دسته بندی</FormLabel>
                    <FormControl>
                      <Input placeholder="نام دسته بندی" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="Slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>دسته‌بندی والد</FormLabel>
                    <FormControl>
                      <Select
                        dir="rtl"
                        value={field.value !== null ? String(field.value) : "0"}
                        onValueChange={(v) =>
                          field.onChange(v === "0" ? null : Number(v))
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="انتخاب کنید" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem value="0">بدون والد</SelectItem>

                          {categories.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id!)}>
                              {cat.names?.fa || cat.name}
                            </SelectItem>
                          ))}
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
                className="flex items-center gap-2 cursor-pointer"
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
  );
}
