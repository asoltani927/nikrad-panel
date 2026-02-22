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
import { Label } from "@/components/ui/label";
import { ProductFormValues, productSchema } from "@/app/schemas/product.schema";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { X } from "lucide-react";

export default function EditProductPage() {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      gallery: [],
      status: "active",
    },
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("thumbnail", file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    // فایل‌های قبلی فرم
    const currentGallery = watch("gallery") ?? [];

    // اضافه کردن فایل‌های جدید
    const updatedGallery = [...currentGallery, ...newFiles];

    setValue("gallery", updatedGallery);

    // preview ها
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

    setGalleryPreview((prev) => [...prev, ...newPreviews]);

    // برای اینکه دوباره همان فایل انتخاب‌پذیر باشد
    e.target.value = "";
  };

  const removeThumbnail = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("thumbnail", undefined as any);
    setThumbnailPreview(null);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));


    // TODO: 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue("gallery", (prev) => prev?.filter((_, i) => i !== index) as any);
  };

  const onSubmit = (data: ProductFormValues) => {
    console.log("FORM DATA 👉", data);

    // اینجا بعداً می‌تونی API بزنی
  };

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-xl mb-6">ایجاد محصول جدید</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 grid lg:grid-cols-3"
      >
        {/* name */}
        <Field label="نام محصول" error={errors.name?.message}>
          <Input {...register("name")} />
        </Field>

        {/* slug */}
        <Field label="Slug" error={errors.slug?.message}>
          <Input {...register("slug")} />
        </Field>

        {/* price */}
        <Field label="قیمت (تومان)" error={errors.price?.message}>
          <Input
            type="number"
            onChange={(e) => setValue("price", Number(e.target.value))}
          />
        </Field>

        {/* inventory */}
        <Field label="موجودی" error={errors.inventory?.message}>
          <Input {...register("inventory")} />
        </Field>

        {/* status */}
        <Field label="وضعیت" error={errors.status?.message}>
          <Select
            defaultValue="active"
            onValueChange={(value) =>
              setValue("status", value as "active" | "inactive")
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
        <Field label="برند" error={errors.brandName?.message}>
          <Input {...register("brandName")} />
        </Field>

        {/* category */}
        <Field label="دسته‌بندی" error={errors.categoryName?.message}>
          <Input {...register("categoryName")} />
        </Field>

        <Field label="حداقل سفارش" error={errors.minOrder?.message}>
          <Input
            type="number"
            onChange={(e) => setValue("minOrder", Number(e.target.value))}
          />
        </Field>

        <Field label="حداکثر سفارش" error={errors.maxOrder?.message}>
          <Input
            type="number"
            onChange={(e) => setValue("maxOrder", Number(e.target.value))}
          />
        </Field>

        <Field label="تصویر شاخص" error={errors.thumbnail?.message}>
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

        <Field label="گالری تصاویر" error={errors.gallery?.message}>
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
        <Field label="توضیحات" error={errors.description?.message}>
          <Textarea rows={4} {...register("description")} />
        </Field>

        <Button type="submit" className="w-full">
          ذخیره محصول
        </Button>
      </form>
    </div>
  );
}

/* ---------- reusable field ---------- */
interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
