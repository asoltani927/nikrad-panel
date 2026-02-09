"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Plus } from "lucide-react";
import { useState } from "react";
// import ProductDetailsModal from "./components/ProductDetailsModal";
import { Shop } from "@/types";
import Link from "next/link";
import ShopDetailsModal from "./components/ShopDetailsModal";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Shop | null>(null);

  const handleViewProduct = (shop: Shop) => {
    setSelectedProduct(shop);
    setOpen(true);
  };

  const shops = [
    {
      cuid: "s1",
      name: "فروشگاه مصالح سپاهان",
      slug: "sepahan",
      productsCount: 10,
      about: "تأمین‌کننده انواع مصالح ساختمانی با قیمت مناسب",
      aboutSeller: "بیش از ۱۰ سال سابقه در فروش مصالح ساختمانی",
      status: "active",
      successDeals: 320,
      daysOfActivity: ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY"],
      workingHours: {
        from: "08:00",
        to: "17:00",
      },
      responseHours: {
        from: "09:00",
        to: "16:00",
      },

      socialMedia: {
        instagram: "https://instagram.com/sepahan_cement",
        telegram: "https://t.me/sepahan_cement",
        website: "https://sepahancement.ir",
        whatsapp: "+989121234567",
      },
      failedDeals: 5,
      thumbnailImage: "/images/shops/shop-1.jpg",
      owner: {
        id: 1,
        name: "ali",
        fullName: "علی رضایی",
      },
      category: {
        id: 1,
        name: "مصالح ساختمانی",
      },
      galleryImages: [
        "/images/shops/shop-1-1.jpg",
        "/images/shops/shop-1-2.jpg",
      ],
      shopReviews: [
        {
          rating: 5,
          comment: "کیفیت عالی و ارسال سریع",
          user: {
            fullName: "محمد احمدی",
          },
        },
        {
          rating: 4,
          comment: "قیمت‌ها منصفانه بود",
          user: {
            fullName: "حسین کریمی",
          },
        },
      ],
    },
    {
      cuid: "s2",
      name: "بازرگانی عمران‌ساز",
      slug: "sepahan",
      productsCount: 10,
      about: "فروش عمده و خرده انواع سیمان و گچ",
      aboutSeller: "همکاری با برندهای معتبر داخلی",
      status: "inactive",
      daysOfActivity: ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY"],
      workingHours: {
        from: "08:00",
        to: "17:00",
      },
      responseHours: {
        from: "09:00",
        to: "16:00",
      },

      socialMedia: {
        instagram: "https://instagram.com/sepahan_cement",
        telegram: "https://t.me/sepahan_cement",
        website: "https://sepahancement.ir",
        whatsapp: "+989121234567",
      },
      successDeals: 210,
      failedDeals: 12,
      thumbnailImage: "/images/shops/shop-2.jpg",
      owner: {
        id: 2,
        name: "reza",
        fullName: "رضا محمدی",
      },
      category: {
        id: 1,
        name: "مصالح ساختمانی",
      },
      galleryImages: [
        "/images/shops/shop-2-1.jpg",
        "/images/shops/shop-2-2.jpg",
        "/images/shops/shop-2-3.jpg",
      ],
      shopReviews: [
        {
          rating: 4,
          comment: "پشتیبانی خوب و پاسخ‌گو",
          user: {
            fullName: "سارا نادری",
          },
        },
      ],
    },
    {
      cuid: "s3",
      name: "مرکز پخش ابزار و مصالح تهران",
      slug: "sepahan",
      productsCount: 10,
      about: "مرجع تخصصی ابزارآلات و مصالح ساختمانی",
      status: "active",
      daysOfActivity: ["SATURDAY", "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY"],
      workingHours: {
        from: "08:00",
        to: "17:00",
      },
      responseHours: {
        from: "09:00",
        to: "16:00",
      },

      socialMedia: {
        instagram: "https://instagram.com/sepahan_cement",
        telegram: "https://t.me/sepahan_cement",
        website: "https://sepahancement.ir",
        whatsapp: "+989121234567",
      },
      aboutSeller: "ارسال به سراسر کشور",
      successDeals: 540,
      failedDeals: 8,
      thumbnailImage: "/images/shops/shop-3.jpg",
      owner: {
        id: 3,
        name: "mehdi",
        fullName: "مهدی حسینی",
      },
      category: {
        id: 2,
        name: "ابزار و تجهیزات",
      },
      galleryImages: ["/images/shops/shop-3-1.jpg"],
      shopReviews: [
        {
          rating: 5,
          comment: "بسیار حرفه‌ای و خوش‌قول",
          user: {
            fullName: "علی صادقی",
          },
        },
        {
          rating: 5,
          comment: "تنوع کالا عالیه",
          user: {
            fullName: "نگار موسوی",
          },
        },
      ],
    },
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xl">لیست فروشگاه ها</span>
        <Button className="bg-green-600">
          <Plus />
          <Link href={"/profile/seller/shops/create"}>ایجاد فروشگاه</Link>
        </Button>
      </div>

      {/* table  */}
      <div className="my-5 lg:p-5">
        <Table>
          <TableHeader className="[&_th]:text-right">
            <TableRow>
              <TableHead className="text-gray-500">نام فروشگاه</TableHead>
              <TableHead className="text-gray-500 !text-center">
                وضعیت
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                ساعات کاری
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                ساعات پاسخ گویی
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                تعداد فروش
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shops.length > 0 ? (
              shops.map((item) => (
                <TableRow key={item.cuid}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="!text-center">{item.status}</TableCell>
                  <TableCell className="!text-center">
                    {item.workingHours.from} تا {item.workingHours.to}
                  </TableCell>
                  <TableCell className="!text-center">
                    {item.responseHours.from} تا {item.responseHours.to}
                  </TableCell>
                  <TableCell className="!text-center">
                    {item.successDeals}
                  </TableCell>
                  <TableCell className="flex items-center lg:justify-center gap-2">
                    <Button
                      variant={"outline"}
                      size={"icon"}
                      onClick={() => handleViewProduct(item)}
                    >
                      <Eye />
                    </Button>
                    <Button variant={"outline"} size={"icon"}>
                      <Link href={`/profile/seller/shops/edit/${item.cuid}`}>
                        <Pencil />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-4 text-gray-500"
                >
                  موردی یافت نشد
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <ShopDetailsModal
          open={open}
          onOpenChange={setOpen}
          shop={selectedProduct}
        />
      </div>
    </div>
  );
}
