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
import { SuggestionsTable } from "./components/SuggestionsTable";

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
      id: 38,
      price: "1257826",
      need: {
        id: 15,
        title: "Refined Concrete Cheese",
        status: "draft",
        user: "Heloise Hermiston",
      },
      createdBy: {
        id: 12,
        name: "Heloise Hermiston",
        phone: "+989140618916",
      },
      createdAt: "2025-11-18T12:13:30.366Z",
      updatedAt: "2025-11-20T12:28:14.710Z",
      status: "approve",
    },
    {
      id: 36,
      price: "966088",
      need: {
        id: 15,
        title: "Refined Concrete Cheese",
        status: "draft",
        user: "Heloise Hermiston",
      },
      createdBy: {
        id: 16,
        name: "Owen Torp",
        phone: "+989152341136",
      },
      createdAt: "2025-11-18T12:13:30.365Z",
      updatedAt: "2025-11-18T12:13:30.365Z",
      status: "draft",
    },
  ];

  // const filteredData = data.filter((item) => {
  //   return (
  //     item.name.includes(filters.name) &&
  //     item.owner.includes(filters.owner) &&
  //     (filters.category ? item.category === filters.category : true) &&
  //     (filters.status ? item.status === filters.status : true)
  //   );
  // });

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

        <SuggestionsTable data={data} />
      </CardContent>

      <SuggestionDetailsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        item={selectedItem}
      />
    </Card>
  );
}
