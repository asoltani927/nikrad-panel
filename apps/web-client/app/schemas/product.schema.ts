import { z } from "zod";

const imageSchema = z
  .instanceof(File, { message: "فایل تصویر معتبر نیست" })
  .refine((file) => file.size > 0, "تصویر الزامی است");

export const ProductSchema = z.object({
  name: z.string().min(3, "نام محصول حداقل ۳ کاراکتر"),
  content: z.string().min(10, "محتوا حداقل ۱۰ کاراکتر"),


  
  inventory: z.string().min(1, "موجودی الزامی است"),
  brandName: z.string().min(2, "نام برند الزامی است"),
  categoryName: z.string().min(2, "نام دسته‌بندی الزامی است"),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),

  minOrder: z.number().min(1, "حداقل سفارش معتبر نیست"),
  maxOrder: z.number().max(1000, "حداکثر سفارش معتبر نیست"),

  thumbnail: imageSchema,
  gallery: z.array(imageSchema).min(1, "حداقل یک تصویر برای گالری انتخاب کنید"),
  status: z.enum(["active", "inactive"]),
  description: z.string().optional(),
  price: z.number().min(1, "قیمت معتبر نیست"),
});


export const CreateProductSchema = z.object({
  name: z.string().min(3, "نام محصول حداقل ۳ کاراکتر"),
  categoryId: z.string(),
  subCategoryId: z.string().optional(),
  brandId: z.string(),
  content: z.string(),
  condition: z.string().optional(),
});


export type CreateProductFormValues = z.infer<typeof CreateProductSchema>;

export type ProductFormValues = z.infer<typeof ProductSchema>;

