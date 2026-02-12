"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shop } from "@/types";
import {
  Store,
  Tag,
  Layers,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  Boxes,
  Star,
  Eye,
  EyeOff,
  Trash,
  Hourglass,
  ClockFading,
} from "lucide-react";

interface ShopDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  shop: Shop | null;
}

export default function ShopDetailsModal({
  open,
  onOpenChange,
  shop,
}: ShopDetailsModalProps) {
  if (!shop) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 my-7">
            <Image
              src="/img/nikrad-logo.png"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-full border object-cover p-0.5"
            />
            جزئیات فروشگاه
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-y-6">
          <Item
            icon={<Tag size={18} />}
            label="نام فروشگاه"
            value={shop.name}
          />

          {/* <Item
            icon={<Layers size={18} />}
            label="دسته‌بندی"
            value={shop.category.name}
          /> */}

          <Item
            icon={
              shop.status === "active" ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <XCircle size={18} className="text-red-600" />
              )
            }
            label="وضعیت"
            value={shop.status === "active" ? "فعال" : "غیرفعال"}
          />

          <Item
            icon={<Boxes size={18} />}
            label="تعداد محصولات"
            value={shop.productsCount}
          />

          <Item
            icon={<User size={18} />}
            label="مالک فروشگاه"
            value={shop.owner.fullName}
          />

          <Item
            icon={<MapPin size={18} />}
            label="موقعیت"
            value={shop.owner.location ?? "-"}
          />

          <Item
            icon={<Star size={18} />}
            label="معاملات موفق"
            value={shop.successDeals}
          />

          <Item
            icon={<XCircle size={18} />}
            label="معاملات ناموفق"
            value={shop.failedDeals}
          />

          <Item
            icon={<Hourglass size={18} />}
            label="ساعات کاری"
            value={`${shop.workingHours?.from} تا ${shop.workingHours?.to}`}
          />

          <Item
            icon={<ClockFading size={18} />}
            label="ساعات پاسخگویی"
            value={`${shop.responseHours?.from} تا ${shop.responseHours?.to}`}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-2">
            <h4 className="font-medium mb-1">درباره فروشگاه</h4>
            <p className="text-sm text-muted-foreground">{shop.about}</p>
          </div>

          <div className="mt-2">
            <h4 className="font-medium mb-1">درباره فروشنده</h4>
            <p className="text-sm text-muted-foreground">{shop.aboutSeller}</p>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-1">گالری تصاویر</h4>
          <div className="flex gap-2 flex-wrap mt-2">
            <Image
              src="/img/nikrad-logo.png"
              alt="Profile"
              width={50}
              height={50}
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 lg:justify-end">
          <Button variant={"outline"}>
            {shop.status === "active" ? <EyeOff /> : <Eye />}
            {shop.status === "active" ? "غیرفعال" : "فعال"}
          </Button>
          <Button variant={"outline"}>
            <Trash />
            حذف فروشگاه
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

function Item({ icon, label, value }: ItemProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}:</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}
