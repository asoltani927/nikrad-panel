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
import { useQuery } from "@tanstack/react-query";
import { getPersonalProducts } from "@/actions/products/get-personal-products.action";

import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";

const SkeletonTableRow = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="!text-center">
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="!text-center">
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="!text-center">
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="!text-center">
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="!text-center">
        <Skeleton className="h-8 w-20 rounded" />
      </TableCell>
      <TableCell className="flex items-center lg:justify-center gap-2">
        <Button variant={"outline"} size={"icon"}>
          <Skeleton className="h-8 w-8 rounded" />
        </Button>
        <Button variant={"outline"} size={"icon"}>
          <Skeleton className="h-8 w-8 rounded" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleViewProduct = (product: any) => {
    setSelectedProduct(product);
    setOpen(true);
  };


  const { data: products, isLoading } = useQuery({
    queryKey: ['personal-products'],
    queryFn: () => getPersonalProducts(),
  })

  return (
    <div className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-xl">آگهی و محصولات من</span>
        <Button className="bg-green-600">
          <Plus />
          <Link href={"/profile/products/new"}>ایجاد محصول جدید</Link>
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
            {
              isLoading && <>
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
                <SkeletonTableRow />
              </>
            }
            {(!isLoading && products?.length) ? (
              products?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="!text-center">{item.price}</TableCell>
                  <TableCell className="!text-center">
                    {
                      item.status === "DRAFT" ? (
                        <span className="text-green-500">پیش نویس</span>
                      ) : item.status === "PUBLISHED" ? (
                        <span className="text-red-500">منتشر شده</span>
                      ) : (
                        <span className="text-red-500">حذف شده</span>
                      )
                    }
                  </TableCell>
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
                      <Link href={`/profile/products/${item.id}/edit`}>
                        <Pencil />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-4 text-gray-500"
                >
                  <Link href="/profile/products/new">
                    برای افزودن محصول کلیک کنید
                  </Link>
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
