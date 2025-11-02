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
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { showToast } from "nextjs-toast-notify";
import { CreateCategoryModal } from "./components/CreateCategoryModal";

export default function Categories() {
    const [openDialog, setOpenDialog] = useState(false);

    const [filters, setFilters] = useState({
        name: "",
        createdAt: "",
        publishedAt: "",
        status: "",
    });

    const data = [
        {
            id: 1,
            name: "صنعتی",
            createdAt: "1404/01/02",
            publishedAt: "1404/01/05",
            status: "فعال",
        },
        {
            id: 2,
            name: "ساختمانی",
            createdAt: "1404/01/02",
            publishedAt: "1404/01/05",
            status: "در حال بررسی",
        },
        {
            id: 3,
            name: "مسکونی",
            createdAt: "1404/01/02",
            publishedAt: "1404/01/05",
            status: "غیرفعال",
        },
    ];

    const filteredData = data.filter((item) => {
        return (
            item.name.includes(filters.name) &&
            (filters.status ? item.status === filters.status : true)
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
                        لیست دسته بندی ها
                        <Search className="h-5 w-5 text-gray-500" />
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                        <Input
                            placeholder="عنوان"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                        />

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

                        <CreateCategoryModal />
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader className="[&_th]:text-right">
                                <TableRow>
                                    <TableHead>عنوان</TableHead>
                                    <TableHead>تاریخ ایجاد</TableHead>
                                    <TableHead>تاریخ انتشار</TableHead>
                                    <TableHead>وضعیت</TableHead>
                                    <TableHead className="!text-center">عملیات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>{user.createdAt}</TableCell>
                                            <TableCell>{user.publishedAt}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-lg text-sm ${user.status === "فعال"
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
