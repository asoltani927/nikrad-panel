"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye } from "lucide-react";
import Link from "next/link";
import { ChangeRequestStatus } from "./components/ChangeRequestStatus";

export default function MaterialNoteBook() {
  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    category: "",
    status: "",
  });

  const data = [
    {
      id: 1,
      name: "محمود سلطانی",
      phone: "09121234567",
      category: "ساختمان",
      materialBookType: "دمو",
      status: "فعال",
    },
    {
      id: 2,
      name: "رضا سلطانی",
      phone: "09351234567",
      category: "مغازه",
      materialBookType: "سازمانی",
      status: "غیرفعال",
    },
    {
      id: 3,
      name: "علی ابراهیمی",
      phone: "09351234567",
      category: "زمین",
      materialBookType: "کامل",
      status: "در انتظار بررسی",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      item.name.includes(filters.name) &&
      item.phone.includes(filters.phone) &&
      (filters.category ? item.category === filters.category : true) &&
      (filters.status ? item.status === filters.status : true)
    );
  });

  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          لیست کاربران
          <Search className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
          <Input
            placeholder="نام کاربر"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <Input
            placeholder="شماره تلفن"
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
          />
          <Select
            value={filters.category}
            onValueChange={(v) => setFilters({ ...filters, category: v })}
            dir="rtl"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="دسته‌بندی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ادمین">ادمین</SelectItem>
              <SelectItem value="کاربر">کاربر</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(v) => setFilters({ ...filters, status: v })}
            dir="rtl"
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="فعال">فعال</SelectItem>
              <SelectItem value="غیرفعال">غیرفعال</SelectItem>
              <SelectItem value="در انتظار بررسی">در انتظار بررسی</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="[&_th]:text-right">
              <TableRow>
                <TableHead>نام کاربر</TableHead>
                <TableHead>شماره تلفن</TableHead>
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>نوع دفترچه انتخابی</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="!text-center">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.materialBookType}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-lg text-sm ${
                          user.status === "فعال"
                            ? "bg-green-100 text-green-700"
                            : user.status === "غیرفعال"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Link href={`/materialNoteBook/${user.id}`}>
                          <Eye className="!h-5 !w-5 text-blue-600" />
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
      </CardContent>
    </Card>
  );
}
