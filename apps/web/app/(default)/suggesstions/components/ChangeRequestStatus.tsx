"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
import { Check } from "lucide-react";
import { showToast } from "nextjs-toast-notify";

export function ChangeRequestStatus() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleConfirm = () => {
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
    <div className="flex items-center justify-end gap-2 w-full my-3">
      <Select dir="rtl">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="تغییر وضعیت پیشنهاد" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cancel">رد پیشنهاد</SelectItem>
          <SelectItem value="pending">در حال بررسی</SelectItem>
          <SelectItem value="accept">پذیرفته شده</SelectItem>
        </SelectContent>
      </Select>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">
            <span>تایید</span>
            <Check className="ml-1" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="lg:text-start">آیا مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription className="lg:text-start">
              پس از تأیید، وضعیت پیشنهاد تغییر خواهد کرد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>انصراف</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>تأیید</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
