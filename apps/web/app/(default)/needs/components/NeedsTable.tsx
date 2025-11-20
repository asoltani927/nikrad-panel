"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Need } from "@/types";
import { toPersianDate } from "@/utils/date.utils";
import { Check, X } from "lucide-react";

interface NeedsTableProps {
  data: Need[];
  onActionClick: (id: number, status: "approve" | "reject") => void;
  loading?: boolean;
}

export default function NeedsTable({
  data,
  onActionClick,
  loading,
}: NeedsTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="[&_th]:text-right">
          <TableRow>
            <TableHead>نام کاربر</TableHead>
            <TableHead>عنوان درخواست</TableHead>
            <TableHead>دسته بندی</TableHead>
            <TableHead>محصول</TableHead>
            <TableHead className="!text-center">موقعیت</TableHead>
            <TableHead>مهلت تحویل</TableHead>
            <TableHead>تاریخ ثبت</TableHead>
            <TableHead>تاریخ انتشار</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="!text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item?.id}>
                <TableCell className="grid text-center justify-start">
                  <span>{item?.createdBy?.name}</span>
                  <span className="text-xs text-gray-600">
                    {item?.createdBy?.phone}
                  </span>
                </TableCell>
                <TableCell>{item?.title}</TableCell>
                <TableCell>{item?.category?.name}</TableCell>
                <TableCell>{item?.product}</TableCell>
                <TableCell className="grid text-center">
                  <span>{item?.region?.name}</span>
                  <span className="text-xs text-gray-600">{item?.city}</span>
                </TableCell>
                <TableCell>{toPersianDate(item?.deliveryDate)}</TableCell>
                <TableCell>{toPersianDate(item?.createdAt)}</TableCell>
                <TableCell>{toPersianDate(item?.updatedAt)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-lg text-xs ${
                      item?.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.status === "reject"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item?.status === "approve"
                      ? "تایید"
                      : item?.status === "draft"
                        ? "در انتظار تایید"
                        : "رد شده"}
                  </span>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onActionClick(item.id, "approve")}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <Check className="!h-5 !w-5 text-green-700" />
                    )}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => onActionClick(item.id, "reject")}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner />
                    ) : (
                      <X className="!h-5 !w-5 text-red-700" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center py-4 text-gray-500"
              >
                موردی یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
