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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { showToast } from "nextjs-toast-notify";
import NeedsTable from "./components/NeedsTable";
import { useNeeds } from "./hooks/useNeeds";

export default function Needs() {
  // states
  const [openDialog, setOpenDialog] = useState(false);
  const { needs, loading, error, needsRefetch } = useNeeds();

  // finish states

  // hooks
  // finish hooks

  // actions
  const onConfirmClick = () => {
    setOpenDialog(false);
    showToast.success("تغییر وضعیت با موفقیت اعمال شد", {
      duration: 4000,
      progress: true,
      position: "top-left",
      transition: "bounceIn",
      icon: "",
      sound: true,
    });
  };

  // finish actions

  // filters
  // const filteredData = needs.filter((item) => {
  //   return (
  //     item.phone?.includes(filters.phone) &&
  //     (filters.status ? item.status === filters.status : true) &&
  //     (filters.province ? item.province === filters.province : true) &&
  //     (filters.city ? item.city === filters.city : true)
  //   );
  // });

  // finish filters

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Card className="py-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center justify-between">
            لیست نیازمندی ها
            <Search className="h-5 w-5 text-gray-500" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <Input
              placeholder="شماره موبایل"
              value={filters.phone}
              onChange={(e) =>
                setFilters({ ...filters, title: e.target.value })
              }
            />
            <Select
              value={filters.province}
              onValueChange={(v) => setFilters({ ...filters, province: v })}
              dir="rtl"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="استان" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="اصفهان">اصفهان</SelectItem>
                <SelectItem value="تهران">تهران</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.city}
              onValueChange={(v) => setFilters({ ...filters, city: v })}
              dir="rtl"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="شهر" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="اصفهان">اصفهان</SelectItem>
                <SelectItem value="نجف آباد">نجف آباد</SelectItem>
                <SelectItem value="تیران">تیران</SelectItem>
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
                <SelectItem value="تایید شده">تایید شده</SelectItem>
                <SelectItem value="در انتظار تایید">در انتظار تایید</SelectItem>
                <SelectItem value="رد شده">رد شده</SelectItem>
              </SelectContent>
            </Select>
          </div> */}

          {/* table */}
          <NeedsTable
            data={needs}
            onActionClick={(id, action) => {
              // setOpenDialog(true);
            }}
          />
        </CardContent>
      </Card>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="lg:text-start">
              آیا مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="lg:text-start">
              پس از تأیید، وضعیت نیازمندی تغییر خواهد کرد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmClick}>
              تأیید
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
