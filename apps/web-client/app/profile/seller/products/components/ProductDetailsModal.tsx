"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/products.type";
import {
  Package,
  Tag,
  Layers,
  CheckCircle,
  XCircle,
  Factory,
  Boxes,
  FileText,
  Trash,
  Eye,
  EyeOff,
} from "lucide-react";

interface ProductDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export default function ProductDetailsModal({
  open,
  onOpenChange,
  product,
}: ProductDetailsModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 my-7">
            <Package size={20} />
            جزئیات محصول
          </DialogTitle>
        </DialogHeader>

        <div className="grid lg:grid-cols-2 gap-y-6">
          <Item icon={<Tag size={18} />} label="نام" value={product.name} />

          <Item
            icon={<Layers size={18} />}
            label="قیمت"
            value={`${product.price.toLocaleString()} تومان`}
          />

          <Item
            icon={
              !product.active ? (
                <CheckCircle size={18} className="text-green-600" />
              ) : (
                <XCircle size={18} className="text-red-600" />
              )
            }
            label="وضعیت"
            value={!!product.active ? "فعال" : "غیرفعال"}
          />

          <Item
            icon={<Boxes size={18} />}
            label="موجودی"
            value={product.inventory}
          />


          {
            product.category && <Item
              icon={<Layers size={18} />}
              label="دسته‌بندی"
              value={product.category.name}
            />
          }

          {

            product.brand && <Item
              icon={<Factory size={18} />}
              label="برند"
              value={product.brand.name}
            />
          }
        </div>
        <div className="flex gap-2 items-start mt-2">
          <FileText size={18} className="mt-1 text-gray-600" />
          <div>
            <div>توضیحات</div>
            <p className="text-sm mt-1">{product.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:justify-end">
          <Button variant={"outline"}>
            {!!product.active ? <EyeOff /> : <Eye />}
            {!!product.active ? "غیرفعال" : "فعال"}
          </Button>
          <Button variant={"outline"}>
            <Trash />
            حذف محصول
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
      <span>{icon}</span>
      <span>{label}:</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
