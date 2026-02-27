"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateProductFormValues, CreateProductSchema, } from "@/app/schemas/product.schema";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import { useProductCategories } from "@/app/hooks/useCategories";
import { Field } from "@/components/base/Field";
import { useBrands } from "@/app/hooks/useBrands";
import { Form, FormField } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct } from "@/actions/products/create-product.action";
import { useRouter } from "next/navigation";


export default function CreateProductPage() {


  const [step, setStep] = useState(1);

  const form = useForm<CreateProductFormValues>({
    mode: "onChange",
    resolver: zodResolver(CreateProductSchema),
    defaultValues: {
      brandId: "",
      categoryId: "",
      subCategoryId: "",
      condition: "NEW",
      content: "",
      name: "",
    },
  });

  const router = useRouter();

  const { mutateAsync: createProductMutation } = useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (data: CreateProductFormValues) => {
      return await createProduct({
        ...data,
        categoryId: data.subCategoryId ? data.subCategoryId : data.categoryId,
        brandId: data.brandId,
        condition: data.condition ?? "NEW",
        content: data.content,
        name: data.name,
      })
    },
    onSuccess: (data: { id: string }) => {
      toast.success("محصول با موفقیت ایجاد شد")
      router.push(`/profile/products/${data.id}/edit`)
    }
  })

  const { data: productCategories } = useProductCategories();
  const { data: brands } = useBrands();

  const mainCategories = useMemo(() => {
    return productCategories?.filter(category => !category.parent);
  }, [productCategories]);

  const selectedSubCategories = useMemo(() => {
    const categoryId = form.watch('categoryId');
    if (!categoryId)
      return [];

    return productCategories?.filter(category =>
      category.parent && category.parent.id === categoryId
    ) || [];
  }, [productCategories, form.watch('categoryId')]);

  const onSubmit = form.handleSubmit(async (data: CreateProductFormValues) => {
    await createProductMutation(data)
    form.reset();
    setStep(1);
  });

  return (
    <div className="p-5 lg:p-10">

      <div className="mb-8 flex gap-4  flex-col">
        <h1 className="text-xl">ایجاد محصول جدید - مرحله {step}</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="block"
        >

          <div
            className="gap-3 grid lg:grid-cols-1">

            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Field label="نام محصول" error={form.formState.errors.name?.message}>
                  <Input
                    {...field} />
                </Field>)}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <Field label="دسته‌بندی" error={form.formState.errors.categoryId?.message}>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      {mainCategories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>)}
            />

            {(selectedSubCategories && selectedSubCategories.length) > 0 && (
              <FormField
                control={form.control}
                name="subCategoryId"
                render={({ field }) => (
                  <Field label="زیر دسته" error={form.formState.errors.subCategoryId?.message}>
                    <Select  {...field} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="انتخاب کنید" />
                      </SelectTrigger>
                      <SelectContent align="start">
                        {selectedSubCategories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>)}
              />
            )}

            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <Field label="برند" error={form.formState.errors.brandId?.message}>
                  <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      {brands?.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>)}
            />

            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <Field label="شرایط کالا" error={form.formState.errors.condition?.message}>
                  <Select {...field}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="انتخاب کنید" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="NEW">جدید</SelectItem>
                      <SelectItem value="REFURBISHED">تعمیر شده</SelectItem>
                      <SelectItem value="USED">استفاده شده</SelectItem>
                      <SelectItem value="OLDSTOCK">قدیمی</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>)}
            />


            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <Field label="توضیحات" error={form.formState.errors.content?.message}>
                  <Textarea {...form.register("content")} rows={20} style={{ minHeight: '100px' }} />
                </Field>)}
            />


            <div className="flex gap-3 mt-4 justify-between items-center">
              <div></div>
              <Button type="submit" variant={"outline"}>
                مرحله بعد
              </Button>
            </div>
          </div>


        </form>
      </Form>
    </div>
  );
}
