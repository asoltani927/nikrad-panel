"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Notification {
  id: number;
  title: string;
  message: string;
  unread?: boolean;
}

interface NotificationsProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export function Notifications({
  open,
  onClose,
  notifications,
}: NotificationsProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-center">اطلاعیه ها</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-2 max-h-[100%] overflow-y-auto px-2">
          {notifications.length > 0 ? (
            notifications.map((n) => (
              <div
                key={n.id}
                className="relative border rounded-lg p-3 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium">{n.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{n.message}</p>
                  </div>
                  {n.unread && (
                    <Badge
                      variant="default"
                      className="h-2 w-2 rounded-full bg-red-500 p-0"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm mt-6">
              نوتیفیکیشنی وجود ندارد
            </p>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
}
