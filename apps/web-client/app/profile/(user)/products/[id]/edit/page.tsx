"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProductFormValues, EditProductSchema } from "@/app/schemas/product.schema";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { EditProductFirstStep } from "./components/EditProductFirstStep";
import { EditProductSecondStep } from "./components/EditProductSecondStep";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { updateProduct } from "@/actions/products/update-product.action";
import { getProductBySlug } from "@/actions/products/get-product-by-slug.action";
import { Button } from "@/components/ui/button";

export default function EditProductPage() {
  const [step, setStep] = useState<number>(1);


  const params = useParams()
  const id = params.id


  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductBySlug(id as string),
  });


  if (!id || isLoading)
    return (
      <div className="space-y-5">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    )

  const form = useForm<EditProductFormValues>({
    mode: "onChange",
    resolver: zodResolver(EditProductSchema),
    defaultValues: {
      brandId: product?.brand?.id,
      categoryId: product?.category?.parent ? product?.category?.parent.id : product?.category?.id,
      subCategoryId: product?.category?.parent ? product?.category?.id : "",
      condition: product?.condition,
      content: product?.content,
      name: product?.name,
      description: product?.description,
      price: product?.price,
      status: product?.status,
    },
  });

  const { mutateAsync: updateProductMutation } = useMutation({
    mutationKey: ['create-product'],
    mutationFn: async (data: EditProductFormValues) => {
      return await updateProduct({
        ...data,
        categoryId: (data.subCategoryId ? data.subCategoryId : data.categoryId) ?? product!.category!.id,
        brandId: data.brandId,
        condition: data.condition ?? "NEW",
        content: data.content,
        name: data.name,
        id: product!.id,
      })
    },
    onSuccess: (data: { id: string }) => {
      toast.success("محصول با موفقیت ایجاد شد")
    }
  })
  const onSubmit = form.handleSubmit(async (data: EditProductFormValues) => {
    await updateProductMutation(data)
    form.reset();
  });

  return (
    <div className="p-5 lg:p-10">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="block"
        >

          <div
            className="gap-3 grid lg:grid-cols-1">

            {step === 1 && <EditProductFirstStep />}
            {step === 2 && <EditProductSecondStep />}



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