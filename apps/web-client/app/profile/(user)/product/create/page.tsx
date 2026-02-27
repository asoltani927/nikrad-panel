"use client";

import { Form, useForm, useFormContext, UseFormReturn } from "react-hook-form";
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
import { ProductFormValues, productSchema } from "@/app/schemas/product.schema";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useMemo, useState } from "react";
import { useProductCategories } from "@/app/hooks/useCategories";
import { Field } from "@/components/base/Field";
import { useBrands } from "@/app/hooks/useBrands";
import { X } from "lucide-react";


export default function CreateProductPage() {


  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [step, setStep] = useState(1);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      gallery: [],
      status: "active",
    },
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    form.setValue("thumbnail", file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const currentGallery = form.watch("gallery") ?? [];

    const updatedGallery = [...currentGallery, ...newFiles];

    form.setValue("gallery", updatedGallery);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setGalleryPreview((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeThumbnail = () => {
    form.setValue("thumbnail", undefined as any);
    setThumbnailPreview(null);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));

    // TODO: 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.setValue("gallery", (prev) => prev?.filter((_, i) => i !== index) as any);
  };

  const goToPreviousStep = () => {
    setStep((prev) => prev - 1);
  };

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log("FORM DATA", data);
    form.reset();
    setStep(1);
  };

  return (
    <div className="p-5 lg:p-10">

      <div className="mb-8 flex gap-4  flex-col">
        <h1 className="text-xl">ایجاد محصول جدید - مرحله {step}</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="block"
        >

          {step === 1 && (
            <div
              className="gap-3 grid lg:grid-cols-1">


              <FirstStep form={form} />


              <div className="flex gap-3 mt-4 justify-between items-center">
                <div></div>
                <Button type="button" variant={"outline"} onClick={goToNextStep}>
                  مرحله بعد
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              {/* price */}
              <Field label="قیمت واحد (تومان)" error={form.formState.errors.price?.message}>
                <Input
                  type="number"
                  onChange={(e) => `setValue("price", Number(e.target.value))}`}
                />
              </Field>

              {/* inventory */}
              <Field label="موجودی" error={form.formState.errors.inventory?.message}>
                <Input {...form.register("inventory")} />
              </Field>

              {/* status */}
              <Field label="وضعیت" error={form.formState.errors.status?.message}>
                <Select
                  defaultValue="active"
                  onValueChange={(value) =>
                    form.setValue("status", value as "active" | "inactive")
                  }
                >
                  <SelectTrigger className="!w-full">
                    <SelectValue placeholder="انتخاب وضعیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">فعال</SelectItem>
                    <SelectItem value="inactive">غیرفعال</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              {/* brand */}
              <Field label="برند" error={form.formState.errors.brandName?.message}>
                <Input {...form.register("brandName")} />
              </Field>



              <Field label="حداقل سفارش" error={form.formState.errors.minOrder?.message}>
                <Input
                  type="number"
                  onChange={(e) => form.setValue("minOrder", Number(e.target.value))}
                />
              </Field>

              <Field label="حداکثر سفارش" error={form.formState.errors.maxOrder?.message}>
                <Input
                  type="number"
                  onChange={(e) => form.setValue("maxOrder", Number(e.target.value))}
                />
              </Field>

              <Field label="تصویر شاخص" error={form.formState.errors.thumbnail?.message}>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />

                {thumbnailPreview && (
                  <div className="relative mt-3 w-25">
                    <img
                      src={thumbnailPreview}
                      alt="thumbnail"
                      className="rounded-md border"
                    />
                    <button
                      type="button"
                      onClick={removeThumbnail}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}
              </Field>

              <Field label="گالری تصاویر" error={form.formState.errors.gallery?.message}>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                />

                {galleryPreview.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {galleryPreview.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`gallery-${index}`}
                          className="rounded-md border h-24 w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </Field>

              {/* description */}
              <Field label="توضیحات" error={form.formState.errors.description?.message}>
                <Textarea rows={4} {...form.register("description")} />
              </Field>

              <div className="flex gap-3 mt-4 justify-between items-center">
                <Button type="button" variant={"outline"} onClick={goToPreviousStep}>
                  مرحله قبل
                </Button>
                <Button type="button" variant={"outline"} onClick={goToNextStep}>
                  مرحله بعد
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {/* Other fields... */}


              <div className="flex gap-3 mt-4 justify-between items-center">
                <Button type="button" variant={"outline"} onClick={goToPreviousStep}>
                  مرحله قبل
                </Button>
                <Button type="submit">
                  ذخیره محصول
                </Button>
              </div>
            </>
          )}

        </form>
      </Form>
    </div>
  );
}


const FirstStep = ({ form: { watch, register, formState: { errors } } }: { form: UseFormReturn<ProductFormValues> }) => {

  const { data: productCategories } = useProductCategories();
  const { data: brands } = useBrands();

  const mainCategories = useMemo(() => {
    return productCategories?.filter(category => !category.parent);
  }, [productCategories]);

  const selectedSubCategories = useMemo(() => {
    const categoryId = watch('categoryId');
    if (!categoryId)
      return [];

    return productCategories?.filter(category =>
      category.parent && category.parent.id === categoryId
    ) || [];
  }, [productCategories, watch('categoryId')]);

  return (
    <>

      {/* name */}
      <Field label="نام محصول" error={errors.name?.message}>
        <Input {...register("name")} />
      </Field>

      <Field label="دسته‌بندی" error={errors.categoryName?.message}>
        <Select {...register("categoryId")}>
          <SelectTrigger className="w-full">
            <Input placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="default">انتخاب کنید</SelectItem>
            {mainCategories?.map((category) => (
              <SelectItem key={category.id} value={category.name}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {
          (selectedSubCategories && selectedSubCategories.length) > 0 && (
            <Select  {...register("subCategoryId")}>
              <SelectTrigger className="w-full">
                <Input placeholder="انتخاب کنید" />
              </SelectTrigger>
              <SelectContent align="start">
                <SelectItem value="default">انتخاب کنید</SelectItem>
                {selectedSubCategories?.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }
      </Field>

      <Field label="برند" error={errors.categoryName?.message}>
        <Select>
          <SelectTrigger className="w-full">
            <Input placeholder="انتخاب کنید" />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectItem value="default">انتخاب کنید</SelectItem>
            {brands?.map((brand) => (
              <SelectItem key={brand.id} value={brand.name}>
                {brand.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>


      <Field label="توضیحات" error={errors.content?.message}>
        <Textarea {...register("content")} rows={20} style={{ minHeight: '100px' }} />
      </Field>

    </>
  );
}
