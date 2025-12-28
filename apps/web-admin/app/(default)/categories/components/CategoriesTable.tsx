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
import { Category } from "@/types";
import { toPersianDate } from "@/utils/date.utils";
import { Pencil, Trash } from "lucide-react";
import { boolean } from "zod";

interface CategoriesTableProps {
  data: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (id: number) => Promise<void>;
  loading?: boolean;
}

export function CategoriesTable({
  data,
  onEdit,
  onDelete,
  loading,
}: CategoriesTableProps & { loading: boolean }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="[&_th]:text-right">
          <TableRow>
            <TableHead>نام فارسی</TableHead>
            <TableHead>نام انگلیسی</TableHead>
            <TableHead>تاریخ ایجاد</TableHead>
            <TableHead>آخرین ویرایش</TableHead>
            <TableHead className="grid place-items-center">عملیات</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((cat, idx) => (
              <TableRow key={idx}>
                <TableCell>{cat.names?.fa || cat.name}</TableCell>
                <TableCell>{cat.names?.en}</TableCell>
                <TableCell>{toPersianDate(cat.createdAt)}</TableCell>
                <TableCell>{toPersianDate(cat.updatedAt)}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => onEdit(cat)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="bg-red-100"
                    onClick={() => onDelete(cat.id)}
                    disabled={loading}
                  >
                    {loading ? <Spinner color="red" /> : <Trash color="red" />}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-gray-500 py-3">
                هیچ دسته‌بندی‌ای یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
