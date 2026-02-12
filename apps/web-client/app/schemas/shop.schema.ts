import { z } from "zod";

const imageSchema = z.string().min(1, "تصویر الزامی است");

const socialMediaSchema = z.object({
  instagram: z.string().optional(),
  telegram: z.string().optional(),
  website: z.string().optional(),
  whatsapp: z.string().optional(),
});

const timeRangeSchema = z.object({
  from: z.string().min(2, "زمان از باید معتبر باشد"),
  to: z.string().min(2, "زمان تا باید معتبر باشد"),
});

export const shopSchema = z.object({
  name: z.string().min(3, "نام فروشگاه حداقل ۳ کاراکتر باشد"),

  about: z.string().min(10, "توضیحات فروشگاه باید حداقل ۱۰ کاراکتر باشد"),

  aboutSeller: z.string().min(10, "توضیحات فروشنده باید حداقل ۱۰ کاراکتر باشد"),

  // category: z.object({
  //   id: z.number().min(1, "دسته‌بندی معتبر نیست"),
  //   name: z.string(),
  // }),

  daysOfActivity: z
    .array(
      z.enum([
        "شنبه",
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
      ]),
    )
    .min(1, "حداقل یک روز فعالیت باید مشخص شود"),

  workingHours: timeRangeSchema,
  responseHours: timeRangeSchema,

  socialMedia: socialMediaSchema,

  thumbnailImage: imageSchema,

  galleryImages: z
    .array(
      z.object({
        imageUrl: z.string(),
      }),
    )
    .optional(),
});

export type ShopFormValues = z.infer<typeof shopSchema>;
