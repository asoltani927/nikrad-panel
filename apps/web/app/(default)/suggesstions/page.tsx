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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { SuggestionDetailsModal } from "./components/SuggestionDetailsModal";
import { SuggestionsTable } from "./components/SuggestionsTable";
import { useSuggestions } from "./hooks/useSuggestions";
import { useSuggestionStatus } from "./hooks/useSuggestionStatus";
import { showToast } from "nextjs-toast-notify";

export default function Suggestions() {
  // states
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
  const {
    suggestions,
    loading,
    error,
    page,
    limit,
    total,
    setPage,
    setLimit,
    suggestionsRefetch
  } = useSuggestions();
  const { updateStatus, loading: changeStatusLoading, error: changeStatusError } = useSuggestionStatus()

  // finish states

  // actions
  const handleView = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const handleChangeStatus = async (id: number, value: string) => {
    try {
      await updateStatus(id, value, () => {
        showToast.success("تغییر وضعیت با موفقیت حذف شد!", {
          duration: 3000,
          position: "top-left",
        });
        setIsOpen(false)
        suggestionsRefetch()
      })
    } catch (err) {
      showToast.error("تغییر وضعیت با خطا مواجه شد", {
        duration: 3000,
        position: "top-left",
      });
    }
  }

  // finish actions

  // filters
  const filteredData = suggestions.filter((item) => {
    return (
      item.need.title.includes(filters.name)
      // item?.need?.user.includes(filters?.owner) &&
      // (filters.category ? item.category === filters.category : true) &&
      // (filters.status ? item.status === filters.status : true)
    );
  });

  // finish filters

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

        <SuggestionsTable
          data={suggestions}
          onView={handleView}
          page={page}
          limit={limit}
          total={total}
          setPage={setPage}
          setLimit={setLimit}
        />
      </CardContent>

      <SuggestionDetailsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        item={selectedItem}
        onActionClick={handleChangeStatus}
        loading={changeStatusLoading}
      />
    </Card>
  );
}
