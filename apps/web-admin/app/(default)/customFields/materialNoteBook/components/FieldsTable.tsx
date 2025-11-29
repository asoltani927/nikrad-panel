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
import { Pencil, Trash2 } from "lucide-react";
import { Field } from "@/types/fields.type";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface FieldsTableProps {
  data: Field["data"];
  page: number;
  limit: number;
  total: number;
  setPage: (page: number) => void;
  onEdit?: (field: Field["data"][number]) => void;
  onDelete?: (field: Field["data"][number]) => void;
}

export const FieldsTable: React.FC<FieldsTableProps> = ({
  data,
  page,
  limit,
  total,
  setPage,
  onEdit,
  onDelete,
}) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="[&_th]:text-right">
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>عنوان</TableHead>
            <TableHead>نوع</TableHead>
            <TableHead>اجباری</TableHead>
            <TableHead>ترتیب مرحله</TableHead>
            <TableHead>دسته‌بندی</TableHead>
            <TableHead className="!text-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.required ? "بله" : "خیر"}</TableCell>
                <TableCell>{item.step}</TableCell>
                <TableCell>{item.categoryId ?? "-"}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit?.(item)}
                  >
                    <Pencil className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => onDelete?.(item)}
                  >
                    <Trash2 className="w-4 h-4" />
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

      {/* Pagination */}
      {total > 0 && (
        <div className="p-4 flex justify-center">
          <Pagination>
            <PaginationContent>

              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && setPage(page - 1)}
                  className={page === 1 ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

              <PaginationItem className="px-4 py-2 text-sm text-gray-700">
                صفحه {page} از {totalPages}
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && setPage(page + 1)}
                  className={page === totalPages ? "opacity-50 pointer-events-none" : ""}
                />
              </PaginationItem>

            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
