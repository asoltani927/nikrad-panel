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
import ProductDetailsModal from "./components/ProductDetailsModal";
import { Product } from "@/types";
import Link from "next/link";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // TODO: fix typos
  // eslint-disable-next-line @typescript-eslint/no-explicit-any 
  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const products = [
    {
      id: "p1",
      name: "سیمان پرتلند تیپ 2",
      slug: "cement-portland-type-2",
      price: 320000,
      active: true,
      inventory: "20",
      featured: true,
      todayDeal: false,
      soldCount: 45,
      views: 230,
      status: "active",
      type: "physical",
      createdAt: "2026-02-01T14:15:37.054Z",
      updatedAt: "2026-02-01T14:15:37.054Z",
      publishedAt: "2026-02-01T14:15:37.054Z",
      description: "سیمان مناسب برای ساخت‌وسازهای عمومی",
      content: "کیفیت بالا، مقاومت مناسب و قیمت اقتصادی",
      warrantyDescription: "گارانتی اصالت کالا",
      warrantyTime: "12 ماه",
      warrantyType: "شرکتی",
      maxOrderQty: true,
      minOrderQty: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      brand: {
        id: "b1",
        name: "سیمان سپاهان",
        slug: "sepahan-cement",
      },
      category: {
        id: "c1",
        name: "مصالح ساختمانی",
        slug: "building-materials",
      },
      thumbnail: {
        id: "t1",
        url: "/images/cement-1.jpg",
      },
      files: [
        {
          id: "f1",
          url: "/files/cement-spec.pdf",
        },
      ],
      variants: [
        {
          id: "v1",
          price: 320000,
          stock: 120,
        },
      ],
    },
    {
      id: "p2",
      name: "آجر سفالی درجه یک",
      slug: "premium-clay-brick",
      price: 8500,
      active: true,
      featured: false,
      todayDeal: true,
      inventory: "20",
      soldCount: 120,
      views: 540,
      status: "active",
      type: "physical",
      createdAt: "2026-02-01T14:15:37.054Z",
      updatedAt: "2026-02-01T14:15:37.054Z",
      publishedAt: "2026-02-01T14:15:37.054Z",
      description: "آجر سفالی مناسب دیوارچینی",
      content: "عایق مناسب و وزن سبک",
      warrantyDescription: "بدون گارانتی",
      warrantyTime: "-",
      warrantyType: "ندارد",
      maxOrderQty: true,
      minOrderQty: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      brand: {
        id: "b2",
        name: "آجر اصفهان",
        slug: "isfahan-brick",
      },
      category: {
        id: "c1",
        name: "مصالح ساختمانی",
        slug: "building-materials",
      },
      thumbnail: {
        id: "t2",
        url: "/images/brick-1.jpg",
      },
      files: [],
      variants: [
        {
          id: "v2",
          price: 8500,
          stock: 2000,
        },
      ],
    },
    {
      id: "p3",
      name: "گچ سفید کاری",
      slug: "white-plaster",
      price: 180000,
      active: false,
      featured: false,
      todayDeal: false,
      inventory: "20",
      soldCount: 10,
      views: 90,
      status: "inactive",
      type: "physical",
      createdAt: "2026-02-01T14:15:37.054Z",
      updatedAt: "2026-02-01T14:15:37.054Z",
      publishedAt: "2026-02-01T14:15:37.054Z",
      description: "گچ مناسب سفیدکاری داخلی",
      content: "زمان گیرش مناسب و رنگ سفید",
      warrantyDescription: "گارانتی کیفیت",
      warrantyTime: "6 ماه",
      warrantyType: "شرکتی",
      maxOrderQty: true,
      minOrderQty: true,
      metaTitle: true,
      metaDescription: true,
      metaKeywords: true,
      brand: {
        id: "b3",
        name: "گچ ساوه",
        slug: "saveh-plaster",
      },
      category: {
        id: "c1",
        name: "مصالح ساختمانی",
        slug: "building-materials",
      },
      thumbnail: {
        id: "t3",
        url: "/images/plaster-1.jpg",
      },
      files: [],
      variants: [
        {
          id: "v3",
          price: 180000,
          stock: 60,
        },
      ],
    },
  ];

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xl">لیست محصولات</span>
        <Button className="bg-green-600">
          <Plus />
          <Link href={"/profile/seller/products/create"}>ایجاد محصول جدید</Link>
        </Button>
      </div>

      {/* table  */}
      <div className="my-5 lg:p-5">
        <Table>
          <TableHeader className="[&_th]:text-right">
            <TableRow>
              <TableHead className="text-gray-500">نام</TableHead>
              <TableHead className="text-gray-500 !text-center">قیمت</TableHead>
              <TableHead className="text-gray-500 !text-center">
                وضعیت
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                موجودی
              </TableHead>
              <TableHead className="text-gray-500 !text-center">
                دسته بندی
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
            {products.length > 0 ? (
              products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="!text-center">{item.price}</TableCell>
                  <TableCell className="!text-center">{item.status}</TableCell>
                  <TableCell className="!text-center">
                    {item.inventory}
                  </TableCell>
                  <TableCell className="!text-center">
                    {item.inventory}
                  </TableCell>
                  <TableCell className="!text-center">
                    {item.soldCount}
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
                      <Link href={`/profile/seller/products/edit/${item.id}`}>
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
        <ProductDetailsModal
          open={open}
          onOpenChange={setOpen}
          product={selectedProduct}
        />
      </div>
    </div>
  );
}
