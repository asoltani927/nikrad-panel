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

interface SuggestionsTableProps {
  data: Suggestion[];
  onView: (item: Suggestion) => void;
}

export const SuggestionsTable: React.FC<SuggestionsTableProps> = ({
  data,
  onView,
}) => {
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
                <TableCell>{suggestion.need.user}</TableCell>
                <TableCell>{suggestion.need.title}</TableCell>
                <TableCell>{suggestion.createdBy.name}</TableCell>
                <TableCell>
                  {Number(suggestion.price).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(suggestion.createdAt).toLocaleDateString("fa-IR")}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-lg text-sm ${
                      suggestion.status === "approve"
                        ? "bg-green-100 text-green-700"
                        : suggestion.status === "draft"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {suggestion.status}
                  </span>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-2">
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
    </div>
  );
};
