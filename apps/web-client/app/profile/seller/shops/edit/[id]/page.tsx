"use client";

import * as React from "react";
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
import { ShopFormValues, shopSchema } from "@/app/schemas/shop.schema";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useState } from "react";
import { X } from "lucide-react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنج شنبه",
  "جمعه",
] as const;

export default function EditShopPage() {
  const anchor = useComboboxAnchor();
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShopFormValues>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      socialMedia: {},
      daysOfActivity: [],
      workingHours: { from: "", to: "" },
      responseHours: { from: "", to: "" },
      galleryImages: [],
    },
  });

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setValue("thumbnailImage", imageUrl);

    setThumbnailPreview(imageUrl);
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const currentGallery = watch("galleryImages") ?? [];

    const updatedGallery = [
      ...currentGallery,
      ...newFiles.map((file) => ({
        imageUrl: URL.createObjectURL(file),
      })),
    ];

    setValue("galleryImages", updatedGallery);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setGalleryPreview((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const removeThumbnail = () => {
    setValue("thumbnailImage", undefined as any);
    setThumbnailPreview(null);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));

    const updatedGallery =
      watch("galleryImages")?.filter((_, i) => i !== index) ?? [];
    setValue("galleryImages", updatedGallery);
  };

  const onSubmit = (data: ShopFormValues) => {
    console.log("FORM DATA 👉", data);
  };

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-xl mb-6">ایجاد فروشگاه جدید</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 grid lg:grid-cols-3"
      >
        <Field label="نام فروشگاه" error={errors.name?.message}>
          <Input {...register("name")} />
        </Field>

        <Field label="روزهای فعالیت" error={errors.daysOfActivity?.message}>
          <Combobox
            multiple
            autoHighlight
            items={daysOfWeek}
            defaultValue={[daysOfWeek[0]]}
          >
            <ComboboxChips ref={anchor} className="w-full py-2">
              <ComboboxValue>
                {(values) => (
                  <React.Fragment>
                    {values.map((value: string) => (
                      <ComboboxChip key={value}>{value}</ComboboxChip>
                    ))}
                    <ComboboxChipsInput />
                  </React.Fragment>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No items found.</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>

        <Field label="ساعات کاری" error={errors.workingHours?.from?.message}>
          <Input {...register("workingHours.from")} placeholder="از" />
          <Input {...register("workingHours.to")} placeholder="تا" />
        </Field>

        <Field
          label="ساعات پاسخگویی"
          error={errors.responseHours?.from?.message}
        >
          <Input {...register("responseHours.from")} placeholder="از" />
          <Input {...register("responseHours.to")} placeholder="تا" />
        </Field>

        {/* <Field label="دسته‌بندی" error={errors.categoryId?.message}>
          <Input type="number" {...register("categoryId")} />
        </Field> */}

        <Field label="توضیحات فروشگاه" error={errors.aboutShop?.message}>
          <Textarea rows={4} {...register("aboutShop")} />
        </Field>

        <Field label="توضیحات فروشنده" error={errors.aboutSeller?.message}>
          <Textarea rows={4} {...register("aboutSeller")} />
        </Field>

        <Field
          label="اینستاگرام"
          error={errors.socialMedia?.instagram?.message}
        >
          <Input {...register("socialMedia.instagram")} />
        </Field>
        <Field label="تلگرام" error={errors.socialMedia?.telegram?.message}>
          <Input {...register("socialMedia.telegram")} />
        </Field>
        <Field label="وبسایت" error={errors.socialMedia?.website?.message}>
          <Input {...register("socialMedia.website")} />
        </Field>
        <Field label="واتساپ" error={errors.socialMedia?.whatsapp?.message}>
          <Input {...register("socialMedia.whatsapp")} />
        </Field>

        <Field label="تصویر شاخص" error={errors.thumbnailImage?.message}>
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

        <Field label="گالری تصاویر" error={errors.galleryImages?.message}>
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

        <Button type="submit" className="w-full">
          ذخیره فروشگاه
        </Button>
      </form>
    </div>
  );
}

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
