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
import { SuggestionDetailsModal } from "./components/SuggestionDetailsModal";

export default function Suggestions() {
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    needs: "",
    owner: "",
    price: "",
    date: "",
    status: "",
  });
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const data = [
    {
      id: 1,
      name: "محمود سلطانی",
      category: "صنعتی - تجاری",
      needs: "ساختمان",
      owner: "شرکت ساختمانی نیکراد",
      price: 150000000,
      date: "1404/01/01",
      status: "فعال",
    },
    {
      id: 2,
      name: "رضا سلطانی",
      category: "صنعتی - تجاری",
      needs: "مغازه",
      owner: "شرکت ساختمانی نیکراد",
      price: 150000000,
      date: "1404/01/01",
      status: "غیرفعال",
    },
    {
      id: 3,
      name: "علی ابراهیمی",
      category: "صنعتی - تجاری",
      needs: "زمین",
      owner: "شرکت ساختمانی نیکراد",
      price: 150000000,
      date: "1404/01/01",
      status: "در انتظار بررسی",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      item.name.includes(filters.name) &&
      item.owner.includes(filters.owner) &&
      (filters.category ? item.category === filters.category : true) &&
      (filters.status ? item.status === filters.status : true)
    );
  });

  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          لیست پیشنهادات
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
            placeholder="دریافت کننده"
            value={filters.owner}
            onChange={(e) => setFilters({ ...filters, owner: e.target.value })}
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
                <TableHead>دسته‌بندی</TableHead>
                <TableHead>نیازمندی</TableHead>
                <TableHead>دریافت کننده</TableHead>
                <TableHead>قیمت</TableHead>
                <TableHead>تاریخ</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="!text-center">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.category}</TableCell>
                    <TableCell>{user.needs}</TableCell>
                    <TableCell>{user.owner}</TableCell>
                    <TableCell>{user.price.toLocaleString()}</TableCell>
                    <TableCell>{user.date}</TableCell>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleView(user)}
                      >
                        <Eye className="!h-5 !w-5 text-blue-600" />
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

      <SuggestionDetailsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        item={selectedItem}
      />
    </Card>
  );
}
