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
import { useShops } from "./hooks/useShops";

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Shop | null>(null);
  const { shops, loading, error, sellersRefetch } = useShops();
  const handleViewProduct = (shop: Shop) => {
    setSelectedProduct(shop);
    setOpen(true);
  };

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
                    {item.workingHours?.from} تا {item.workingHours?.to}
                  </TableCell>
                  <TableCell className="!text-center">
                    {item.responseHours?.from} تا {item.responseHours?.to}
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
                  {loading ? "در حال دریافت اطلاعات ..." : "موردی یافت نشد"}
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
