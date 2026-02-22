"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShopFormValues, shopSchema } from "@/app/schemas/shop.schema";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, useEffect, useState } from "react";
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
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useShop } from "./hooks/useShop.hook";

const daysOfWeek = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه شنبه",
  "چهارشنبه",
  "پنج شنبه",
  "جمعه",
] as const;

export default function CreateShopPage() {
  const anchor = useComboboxAnchor();
  const params = useParams();
  const slug = params?.id as string | number;
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryPreview, setGalleryPreview] = useState<string[]>([]);
  const [fromHour, setFromHour] = useState("");
  const [fromMinute, setFromMinute] = useState("");
  const [toHour, setToHour] = useState("");
  const [toMinute, setToMinute] = useState("");
  const [fromResponseHour, setFromResponseHour] = useState("");
  const [fromResponseMinute, setFromResponseMinute] = useState("");
  const [toResponseHour, setToResponseHour] = useState("");
  const [toResponseMinute, setToResponseMinute] = useState("");
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ShopFormValues>({
    resolver: zodResolver(shopSchema),
    defaultValues: {
      thumbnailImage: "",
      socialMedia: {},
      daysOfActivity: [],
      workingHours: { from: "", to: "" },
      responseHours: { from: "", to: "" },
      galleryImages: [],
    },
  });
  const { shop, loading, error, shopRefetch } = useShop(slug);

  useEffect(() => {
    if (!shop) return;

    type Day = (typeof daysOfWeek)[number];

    reset({
      name: shop.name ?? "",
      about: shop.about ?? "",
      aboutSeller: shop.aboutSeller ?? "",
      daysOfActivity: (shop.daysOfActivity ?? []) as Day[],
      workingHours: {
        from: shop.workingHours?.from ?? "",
        to: shop.workingHours?.to ?? "",
      },
      responseHours: {
        from: shop.responseHours?.from ?? "",
        to: shop.responseHours?.to ?? "",
      },
      socialMedia: {
        instagram: shop.socialMedia?.instagram ?? "",
        telegram: shop.socialMedia?.telegram ?? "",
        website: shop.socialMedia?.website ?? "",
        whatsapp: shop.socialMedia?.whatsapp ?? "",
      },
      thumbnailImage: shop.thumbnailImage ?? "",
      galleryImages: (shop.galleryImages ?? []).map((url) => ({
        imageUrl: url,
      })),
    });

    setThumbnailPreview(shop.thumbnailImage ?? null);
    setGalleryPreview(shop.galleryImages ?? []);

    if (shop.workingHours?.from) {
      const [h, m] = shop.workingHours.from.split(":");
      setFromHour(h);
      setFromMinute(m);
    }

    if (shop.workingHours?.to) {
      const [h, m] = shop.workingHours.to.split(":");
      setToHour(h);
      setToMinute(m);
    }

    if (shop.responseHours?.from) {
      const [h, m] = shop.responseHours.from.split(":");
      setFromResponseHour(h);
      setFromResponseMinute(m);
    }

    if (shop.responseHours?.to) {
      const [h, m] = shop.responseHours.to.split(":");
      setToResponseHour(h);
      setToResponseMinute(m);
    }
  }, [shop, reset]);

  useEffect(() => {
    if (fromHour && fromMinute) {
      setValue(
        "workingHours.from",
        `${fromHour.padStart(2, "0")}:${fromMinute.padStart(2, "0")}`,
      );
    }

    if (toHour && toMinute) {
      setValue(
        "workingHours.to",
        `${toHour.padStart(2, "0")}:${toMinute.padStart(2, "0")}`,
      );
    }

    if (fromResponseHour && fromResponseMinute) {
      setValue(
        "responseHours.from",
        `${fromResponseHour.padStart(2, "0")}:${fromResponseMinute.padStart(2, "0")}`,
      );
    }

    if (toResponseHour && toResponseMinute) {
      setValue(
        "responseHours.to",
        `${toResponseHour.padStart(2, "0")}:${toResponseMinute.padStart(2, "0")}`,
      );
    }
  }, [
    fromHour,
    fromMinute,
    toHour,
    toMinute,
    fromResponseHour,
    fromResponseMinute,
    toResponseHour,
    toResponseMinute,
    setValue,
  ]);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setValue("thumbnailImage", imageUrl, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setThumbnailPreview(imageUrl);
  };

  const handleGalleryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files);

    const currentGallery = watch("galleryImages") ?? [];

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    const newGalleryObjects = newUrls.map((url) => ({ imageUrl: url }));

    const updatedGallery = [...currentGallery, ...newGalleryObjects];

    setValue("galleryImages", updatedGallery, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setGalleryPreview((prev) => [...prev, ...newUrls]);

    e.target.value = "";
  };

  const removeThumbnail = () => {
    setValue("thumbnailImage", "", {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setThumbnailPreview(null);
  };

  const removeGalleryImage = (index: number) => {
    setGalleryPreview((prev) => prev.filter((_, i) => i !== index));

    const updatedGallery =
      watch("galleryImages")?.filter((_, i) => i !== index) ?? [];
    setValue("galleryImages", updatedGallery);
  };
  console.log(errors);

  const onSubmit = async (data: ShopFormValues) => {
    try {
      console.log(data);

      // await submit(data);
      toast.success("فروشگاه با موفقیت ویرایش شد شد");
      // router.push("/profile/seller/shops");
    } catch (error) {
      toast.error("خطا در ویرایش فروشگاه");
    }
  };

  return (
    <div className="p-5 lg:p-10">
      <h1 className="text-xl mb-6">ویرایش فروشگاه</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="gap-6 grid lg:grid-cols-3"
      >
        <Field label="نام فروشگاه" error={errors.name?.message}>
          <Input {...register("name")} />
        </Field>

        <Field label="روزهای فعالیت" error={errors.daysOfActivity?.message}>
          <Controller
            name="daysOfActivity"
            control={control}
            defaultValue={[daysOfWeek[0]]}
            render={({ field }) => (
              <Combobox
                multiple
                autoHighlight
                items={daysOfWeek}
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values);
                }}
              >
                <ComboboxChips ref={anchor} className="w-full py-2">
                  <ComboboxValue>
                    {(values) => (
                      <>
                        {values.map((value: string) => (
                          <ComboboxChip key={value}>{value}</ComboboxChip>
                        ))}
                        <ComboboxChipsInput />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>موردی یافت نشد</ComboboxEmpty>
                  <ComboboxList>
                    {(item) => (
                      <ComboboxItem key={item} value={item}>
                        {item}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            )}
          />
        </Field>

        <Field
          label="ساعات کاری"
          error={
            errors.workingHours?.from?.message ||
            errors.workingHours?.to?.message
          }
        >
          <div className="flex items-center gap-2">
            {/* from */}
            <Input type="hidden" {...register("workingHours.from")} />
            <div className="flex gap-2 items-center">
              <Input
                className="text-center!"
                maxLength={2}
                max={59}
                placeholder="دقیقه"
                value={fromMinute}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, "");
                  if (value.length > 2) value = value.slice(0, 2);
                  if (Number(value) > 59) value = "59";
                  setFromMinute(value);
                }}
              />
              <span>:</span>
              <Input
                className="text-center!"
                placeholder="ساعت"
                value={fromHour}
                maxLength={2}
                max={23}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, "");
                  if (value.length > 2) value = value.slice(0, 2);
                  if (Number(value) > 23) value = "23";
                  setFromHour(value);
                }}
              />
            </div>

            <span className="mx-2">تا</span>

            {/* until */}
            <div className="flex gap-2 items-center">
              <Input
                type="hidden"
                {...register("workingHours.to")}
                placeholder="تا"
              />
              <div className="flex gap-2 items-center">
                <Input
                  className="text-center!"
                  maxLength={2}
                  max={59}
                  placeholder="دقیقه"
                  value={toMinute}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    if (value.length > 2) value = value.slice(0, 2);
                    if (Number(value) > 59) value = "59";
                    setToMinute(value);
                  }}
                />
                <span>:</span>
                <Input
                  className="text-center!"
                  placeholder="ساعت"
                  value={toHour}
                  maxLength={2}
                  max={23}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    if (value.length > 2) value = value.slice(0, 2);
                    if (Number(value) > 23) value = "23";
                    setToHour(value);
                  }}
                />
              </div>
            </div>
          </div>
        </Field>

        <Field
          label="ساعات پاسخگویی"
          error={
            errors.responseHours?.from?.message ||
            errors.responseHours?.to?.message
          }
        >
          <div className="flex items-center gap-2">
            {/* from */}
            <Input type="hidden" {...register("responseHours.from")} />
            <div className="flex gap-2 items-center">
              <Input
                className="text-center!"
                maxLength={2}
                max={59}
                placeholder="دقیقه"
                value={fromResponseMinute}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, "");
                  if (value.length > 2) value = value.slice(0, 2);
                  if (Number(value) > 59) value = "59";
                  setFromResponseMinute(value);
                }}
              />
              <span>:</span>
              <Input
                className="text-center!"
                placeholder="ساعت"
                value={fromResponseHour}
                maxLength={2}
                max={23}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, "");
                  if (value.length > 2) value = value.slice(0, 2);
                  if (Number(value) > 23) value = "23";
                  setFromResponseHour(value);
                }}
              />
            </div>

            <span className="mx-2">تا</span>

            {/* until */}
            <div className="flex gap-2 items-center">
              <Input
                type="hidden"
                {...register("responseHours.to")}
                placeholder="تا"
              />
              <div className="flex gap-2 items-center">
                <Input
                  className="text-center!"
                  maxLength={2}
                  max={59}
                  placeholder="دقیقه"
                  value={toResponseMinute}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    if (value.length > 2) value = value.slice(0, 2);
                    if (Number(value) > 59) value = "59";
                    setToResponseMinute(value);
                  }}
                />
                <span>:</span>
                <Input
                  className="text-center!"
                  placeholder="ساعت"
                  value={toResponseHour}
                  maxLength={2}
                  max={23}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.replace(/\D/g, "");
                    if (value.length > 2) value = value.slice(0, 2);
                    if (Number(value) > 23) value = "23";
                    setToResponseHour(value);
                  }}
                />
              </div>
            </div>
          </div>
        </Field>

        {/* <Field label="دسته‌بندی" error={errors.category?.message}>
          <Input type="number" {...register("category")} />
        </Field> */}

        <Field label="توضیحات فروشگاه" error={errors.about?.message}>
          <Textarea rows={4} {...register("about")} />
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

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "در حال ویرایش فروشگاه ..." : "ذخیره فروشگاه"}
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
