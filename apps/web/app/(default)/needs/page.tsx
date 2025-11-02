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
import { Search, Check, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { showToast } from "nextjs-toast-notify";

export default function Needs() {
  const [openDialog, setOpenDialog] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    phone: "",
    title: "",
    category: "",
    product: "",
    province: "",
    city: "",
    priority: "",
    deadline: "",
    registration: "",
    publication: "",
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
      name: "تست کاربری",
      phone: "09133333333",
      title: "نام نیازمندی",
      category: "صنعتی - تجاری",
      product: "پکیج طلایی دمو",
      province: "اصفهان",
      city: "تیران",
      priority: "اول",
      deadline: "1405/01/01",
      registration: "1404/01/01",
      publication: "1404/02/01",
      status: "تایید شده",
    },
    {
      id: 2,
      name: "تست کاربری",
      phone: "09133333333",
      title: "2نام نیازمندی",
      category: "صنعتی - تجاری",
      product: "پکیج نقره ای دمو",
      province: "اصفهان",
      city: "نجف آباد",
      priority: "2",
      deadline: "1405/01/01",
      registration: "1404/01/01",
      publication: "1404/02/01",
      status: "در انتظار تایید",
    },
    {
      id: 3,
      name: "تست کاربری",
      phone: "09133333333",
      title: "3نام نیازمندی",
      category: "صنعتی - تجاری",
      product: "پکیج نقره ای دمو",
      province: "اصفهان",
      city: "اصفهان",
      priority: "3",
      deadline: "1405/01/01",
      registration: "1404/01/01",
      publication: "1404/02/01",
      status: "رد شده",
    },
  ];

  const filteredData = data.filter((item) => {
    return (
      item.phone.includes(filters.phone) &&
      (filters.status ? item.status === filters.status : true) &&
      (filters.province ? item.province === filters.province : true) &&
      (filters.city ? item.city === filters.city : true)
    );
  });

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
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
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="[&_th]:text-right">
                <TableRow>
                  <TableHead>نام کاربر</TableHead>
                  <TableHead>عنوان درخواست</TableHead>
                  <TableHead>دسته بندی</TableHead>
                  <TableHead>محصول</TableHead>
                  <TableHead>موقعیت</TableHead>
                  <TableHead>مهلت تحویل</TableHead>
                  <TableHead>تاریخ ثبت</TableHead>
                  <TableHead>تاریخ انتشار</TableHead>
                  <TableHead>وضعیت</TableHead>
                  <TableHead className="!text-center">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="grid text-center justify-start">
                        <span>{user.name}</span>
                        <span className="text-xs text-gray-600">
                          {user.phone}
                        </span>
                      </TableCell>
                      <TableCell>{user.title}</TableCell>
                      <TableCell>{user.category}</TableCell>
                      <TableCell>{user.product}</TableCell>
                      <TableCell className="grid text-center justify-start">
                        <span>{user.province}</span>
                        <span className="text-xs text-gray-600">
                          {user.city}
                        </span>
                      </TableCell>
                      <TableCell>{user.deadline}</TableCell>
                      <TableCell>{user.registration}</TableCell>
                      <TableCell>{user.publication}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-lg text-xs ${
                            user.status === "تایید شده"
                              ? "bg-green-100 text-green-700"
                              : user.status === "رد شده"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="flex items-center justify-center gap-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => setOpenDialog(true)}
                        >
                          <Check className="!h-5 !w-5 text-green-700" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() => setOpenDialog(true)}
                        >
                          <X className="!h-5 !w-5 text-red-700" />
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
