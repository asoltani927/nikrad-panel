"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Save } from "lucide-react";
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

const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
  slug: z.string().min(2, "اسلاگ باید حداقل ۲ حرف باشد"),
  parentId: z.number().nullable(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface EditCategoryModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category;
  categories: Category[];
  onSubmit: (values: CategoryFormValues) => void;
}

export function EditCategoryModal({
  open,
  setOpen,
  category,
  categories,
  onSubmit,
}: EditCategoryModalProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: 0,
      name: "",
      slug: "",
      parentId: null,
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        id: category.id,
        name: category.name,
        slug: category.slug,
        parentId: category.parentId || null,
      });
    }
  }, [category, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold justify-center">
            ویرایش دسته بندی
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              onSubmit(values);
              setOpen(false);
            })}
            className="space-y-6"
          >
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
                  <Select
                    dir="rtl"
                    value={field.value !== null ? String(field.value) : "0"}
                    onValueChange={(v) =>
                      field.onChange(v === "0" ? null : Number(v))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="دسته بندی والد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">بدون والد</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id!)}>
                          {cat.names.fa || cat.name}
                        </SelectItem>
                      ))}
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
  );
}
