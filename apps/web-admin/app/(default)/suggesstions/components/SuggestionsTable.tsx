"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Suggestion } from "@/types";
import { toPersianDate } from "@/utils/date.utils";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface SuggestionsTableProps {
  data: Suggestion[];
  page: number;
  limit: number;
  total: number;
  onView: (item: Suggestion) => void;
  setPage: (page: number) => void;
  setLimit?: (limit: number) => void;
}

export const SuggestionsTable: React.FC<SuggestionsTableProps> = ({
  data,
  onView,
  page,
  limit,
  total,
  setPage,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="[&_th]:text-right">
          <TableRow>
            <TableHead>نام کاربر</TableHead>
            <TableHead>نیازمندی</TableHead>
            <TableHead>دریافت کننده</TableHead>
            <TableHead>قیمت</TableHead>
            <TableHead>تاریخ</TableHead>
            <TableHead>وضعیت</TableHead>
            <TableHead className="!text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((suggestion) => (
              <TableRow key={suggestion.id}>
                <TableCell>{suggestion?.need?.user}</TableCell>
                <TableCell>{suggestion?.need?.title}</TableCell>
                <TableCell>{suggestion?.createdBy?.name}</TableCell>
                <TableCell>
                  {Number(suggestion?.price).toLocaleString()}
                </TableCell>
                <TableCell>{toPersianDate(suggestion?.createdAt)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${suggestion?.status === "approve"
                      ? "bg-green-100 text-green-700"
                      : suggestion?.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                      }`}
                  >
                    {suggestion?.status === "approve"
                      ? "تایید"
                      : suggestion?.status === "draft"
                        ? "در انتظار تایید"
                        : "رد شده"}
                  </span>
                </TableCell>
                <TableCell className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onView(suggestion)}
                  >
                    <Eye className="!h-5 !w-5 text-blue-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                موردی یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* pagination */}
      {total > 0 && (
        <div className="p-4 flex justify-center">
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={
                    page === 1 ? "opacity-50 pointer-events-none" : ""
                  }
                />
              </PaginationItem>

              <PaginationItem className="px-4 py-2 text-sm text-gray-700">
                صفحه {page} از {totalPages}
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={
                    page === totalPages
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
