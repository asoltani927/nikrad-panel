"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { z } from "zod";

type AddressFormMode = "create" | "edit";

interface AddressFormModalProps {
  open: boolean;
  mode: AddressFormMode;
  onClose: () => void;
}

const schema = z.object({
  address: z.string().min(1, "آدرس الزامی است"),
  province: z.string().min(1, "استان را انتخاب کنید"),
  city: z.string().min(1, "شهر را انتخاب کنید"),
  zipCode: z.string().min(1, "کد پستی الزامی است"),
  details: z.string().min(1, "جزئیات آدرس الزامی است"),
  name: z.string().min(1, "نام تحویل گیرنده الزامی است"),
  phone: z.string().min(1, "شماره موبایل الزامی است"),
});

export function AddressFormModal({
  open,
  mode,
  onClose,
}: AddressFormModalProps) {
  const [showMap, setShowMap] = useState(false);

  const [form, setForm] = useState({
    address: "",
    province: "",
    city: "",
    zipCode: "",
    details: "",
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = () => {
    if (showMap) {
      setShowMap(false);
      return;
    }

    const result = schema.safeParse(form);

    if (!result.success) {
      const formatted: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const key = issue.path[0];
        if (typeof key === "string") {
          formatted[key] = issue.message;
        }
      });

      setErrors(formatted);
      return;
    }

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl h-[85vh] max-h-[90vh] overflow-auto [&>button]:hidden py-4 px-0">
        <DialogHeader className="flex flex-row items-center justify-between px-4">
          <DialogTitle className="text-right text-sm ">
            {mode === "create" ? "افزودن آدرس جدید" : "ویرایش آدرس"}
          </DialogTitle>

          <button
            onClick={onClose}
            className="rounded-sm p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="close"
          >
            <X className="h-4 w-4" />
          </button>
        </DialogHeader>

        <div className="min-h-[150px]">
          <p className="text-[#5B5C5F] px-4 border-gray-200 mb-6 border-b pb-4 text-xs -mt-3 font-thin ">
            آدرس را یادداشت کنید و یا موقعیت مکانی را روی نقشه مشخص کنید.
          </p>

          <div className="px-4">
            <div className="flex flex-col justify-end gap-1">
              <Label className="text-[#5B5C5F] text-xs">آدرس</Label>
              <Input
                className="placeholder:text-[11px] h-12 lg:h-9"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                type="text"
                placeholder="آدرس را وارد کنید"
              />
              <p className="h-3 text-gray-600 text-xs -mt-0.5">
                آدرس را یادداشت کنید
              </p>
              <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                {errors.address}
              </p>
            </div>

            {!showMap && (
              <>
                <button
                  onClick={() => setShowMap(true)}
                  className="cursor-pointer flex items-center gap-1.5 text-yellow-600 mt-6 text-xs"
                >
                  اصلاح آدرس روی نقشه
                  <ChevronLeft className="size-3.5" />
                </button>
              </>
            )}
            <div className="border-t border-gray-200 pt-4 mt-6">
              {showMap && (
                <Image
                  alt="map"
                  src="/img/map.png"
                  width="500"
                  height={350}
                  className="object-contain mb-2"
                />
              )}

              {!showMap && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3.5">
                  <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                    <Select onValueChange={(v) => handleChange("province", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="استان" />
                      </SelectTrigger>
                      <SelectContent>
                        {["تهران", "اصفهان", "شیراز"].map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.province}
                    </p>
                  </div>

                  <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                    <Select onValueChange={(v) => handleChange("city", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="شهر" />
                      </SelectTrigger>
                      <SelectContent>
                        {["تهران", "اصفهان", "شیراز"].map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.city}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end gap-1">
                    <Label className="text-[#5B5C5F] text-xs">
                      کد پستی
                    </Label>
                    <Input
                      className="placeholder:text-[11px] h-12 lg:h-9"
                      value={form.zipCode}
                      onChange={(e) => handleChange("zipCode", e.target.value)}
                      type="number"
                      placeholder="کد پستی را وارد کنید"
                    />
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.zipCode}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end gap-1">
                    <Label className="text-[#5B5C5F] text-xs">
                      جزئیات آدرس
                    </Label>
                    <Input
                      className="placeholder:text-[11px] h-12 lg:h-9"
                      value={form.details}
                      onChange={(e) => handleChange("details", e.target.value)}
                      type="text"
                      placeholder="جزئیات آدرس را وارد کنید"
                    />
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.details}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end gap-1">
                    <Label className="text-[#5B5C5F] text-xs">
                      نام و نام خانوادگی تحویل گیرنده
                    </Label>
                    <Input
                      className="placeholder:text-[11px] h-12 lg:h-9"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      type="text"
                      placeholder="نام تحویل گیرنده را وارد کنید"
                    />
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.name}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end gap-1">
                    <Label className="text-[#5B5C5F] text-xs">
                      شماره موبایل تحویل گیرنده
                    </Label>
                    <Input
                      className="placeholder:text-[11px] h-12 lg:h-9"
                      value={form.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      type="number"
                      placeholder="شماره موبایل تحویل گیرنده را وارد کنید"
                    />
                    <p className="h-3 text-red-500 text-[9px] -mt-0.5">
                      {errors.phone}
                    </p>
                  </div>
                </div>
              )}

              <div className="w-full grid grid-cols-2 items-center justify-between gap-2 lg:gap-1.5 mt-4 pb-4">
                <Button
                  onClick={handleSubmit}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black text-base lg:text-xs h-11 lg:h-8 rounded-sm"
                >
                  {showMap
                    ? "تایید و ادامه"
                    : mode === "create"
                      ? "ثبت آدرس"
                      : "ویرایش آدرس"}
                </Button>

                <Button
                  onClick={onClose}
                  className="cursor-pointer w-full bg-transparent hover:bg-gray-50 border text-black border-[#DADCDE] h-11 lg:h-8 text-base lg:text-xs rounded-sm"
                >
                  انصراف
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
