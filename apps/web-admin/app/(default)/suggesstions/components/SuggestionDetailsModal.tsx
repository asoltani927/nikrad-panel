"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User, Building2, Calendar, CircleDollarSign, FileText, CheckCircle, Phone, Check } from "lucide-react";
import { Suggestion } from "@/types";
import { toPersianDate } from "@/utils/date.utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

interface SuggestionDetailsModal {
  open: boolean;
  onClose: () => void;
  item: Suggestion | null;
  onActionClick: (id: number, status: 'approve' | 'reject') => void;
  loading?: boolean;
}

export function SuggestionDetailsModal({ open, onClose, item, onActionClick, loading }: SuggestionDetailsModal) {
  const [status, setStatus] = useState<'approve' | 'reject'>('approve')
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg font-semibold justify-center">
            <FileText className="h-5 w-5 text-blue-600 text-center" />
            جزئیات پیشنهاد
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="font-medium">نام کاربر:</span>
            <span>{item?.createdBy?.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="font-medium">تلفن همراه:</span>
            <span>{item?.createdBy?.phone}</span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span className="font-medium">نیاز:</span>
            <span>{item?.need?.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="font-medium">مالک:</span>
            <span>{item?.need?.user}</span>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-blue-600" />
            <span className="font-medium">قیمت:</span>
            <span>{item?.price?.toLocaleString()} تومان</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="font-medium">تاریخ:</span>
            <span>{toPersianDate(item?.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="font-medium">وضعیت:</span>
            <span className={`${item?.status === "approve" ? 'bg-green-100' : item?.status === "draft" ? 'bg-yellow-100' : 'bg-red-100'} px-3 py-1 rounded`}>
              {item?.status === "approve"
                ? "تایید"
                : item?.status === "draft"
                  ? "در انتظار تایید"
                  : "رد شده"}
            </span>
          </div>
        </div>

        <div className="lg:flex grid gap-2">
          <Select
            dir="rtl"
            value={status}
            onValueChange={(value) =>
              setStatus(value as 'approve' | 'reject')
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="تغییر وضعیت پیشنهاد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reject">رد پیشنهاد</SelectItem>
              <SelectItem value="approve">تایید</SelectItem>
            </SelectContent>
          </Select>
          <Button variant={"outline"} onClick={() => onActionClick(item?.id, status)}>
            {loading ? <Spinner /> :
              <>
                <Check />
                <span>تایید</span>
              </>
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
