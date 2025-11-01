"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { User, Building2, Tag, Calendar, CircleDollarSign, FileText, CheckCircle } from "lucide-react";
import { ChangeRequestStatus } from "./ChangeRequestStatus";

interface DataItem {
  id: number;
  name: string;
  category: string;
  needs: string;
  owner: string;
  price: number;
  date: string;
  status: string;
}

interface SuggestionDetailsModal {
  open: boolean;
  onClose: () => void;
  item: DataItem | null;
}

export function SuggestionDetailsModal({ open, onClose, item }: SuggestionDetailsModal) {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
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
            <span>{item.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-blue-600" />
            <span className="font-medium">دسته‌بندی:</span>
            <span>{item.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span className="font-medium">نیاز:</span>
            <span>{item.needs}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="font-medium">مالک:</span>
            <span>{item.owner}</span>
          </div>

          <div className="flex items-center gap-2">
            <CircleDollarSign className="h-4 w-4 text-blue-600" />
            <span className="font-medium">قیمت:</span>
            <span>{item?.price?.toLocaleString()} تومان</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600" />
            <span className="font-medium">تاریخ:</span>
            <span>{item.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="font-medium">وضعیت:</span>
            <span>{item.status}</span>
          </div>
        </div>

        <ChangeRequestStatus />
      </DialogContent>
    </Dialog>
  );
}
