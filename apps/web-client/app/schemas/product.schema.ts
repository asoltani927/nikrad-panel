import { z } from "zod";

const imageSchema = z
  .instanceof(File, { message: "فایل تصویر معتبر نیست" })
  .refine((file) => file.size > 0, "تصویر الزامی است");

export const productSchema = z.object({
  name: z.string().min(3, "نام محصول حداقل ۳ کاراکتر"),
  slug: z.string().min(3, "slug الزامی است"),
  price: z.number().min(1, "قیمت معتبر نیست"),
  inventory: z.string().min(1, "موجودی الزامی است"),

  status: z.enum(["active", "inactive"]),
  description: z.string().min(10, "توضیحات حداقل ۱۰ کاراکتر"),

  brandName: z.string().min(2, "نام برند الزامی است"),
  categoryName: z.string().min(2, "نام دسته‌بندی الزامی است"),

  minOrder: z.number().min(1, "حداقل سفارش معتبر نیست"),
  maxOrder: z.number().max(1000, "حداکثر سفارش معتبر نیست"),

  thumbnail: imageSchema,
  gallery: z.array(imageSchema).min(1, "حداقل یک تصویر برای گالری انتخاب کنید"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
