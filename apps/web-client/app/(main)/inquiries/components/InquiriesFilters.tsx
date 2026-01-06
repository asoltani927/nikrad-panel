"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function InquiriesFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "دسته بندی 1",
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 6000]);
  const [openSections, setOpenSections] = useState({
    cat: false,
    price: false,
    payment: false,
  });

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [score, setScore] = useState("");
  const [experience, setExperience] = useState("");
  const [offers, setOffers] = useState("");
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  const togglePayment = (method: string) => {
    setPaymentMethods((prev) =>
      prev.includes(method)
        ? prev.filter((m) => m !== method)
        : [...prev, method]
    );
  };
  type SectionKeys = keyof typeof openSections;
  const handleToggle = (section: SectionKeys) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasFilters = selectedCategories.length > 0 || paymentMethods.length > 0;

  const removeFilter = (type: "category" | "payment", value: string) => {
    if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    } else {
      setPaymentMethods((prev) => prev.filter((m) => m !== value));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPaymentMethods([]);
    setPriceRange([100, 10000]);
    setProvince("");
    setCity("");
    setScore("");
    setExperience("");
    setOffers("");
  };

  return (
    <>
      <span className="font-semibold text-lg text-gray-800">فیلترها</span>

      <div className="flex flex-col bg-[#FAFAFA] px-2 pt-7 pb-5 rounded-lg mt-9">
        {hasFilters && (
          <>
            <div className="px-2 w-full flex items-center justify-between text-xs text-gray-700 font-medium cursor-pointer">
              فیلتر اعمال شده
              <div className="flex items-center gap-1">
                <span
                  className="text-[#CA8504] text-xs cursor-pointer"
                  onClick={clearAllFilters}
                >
                  حذف
                </span>
                <X
                  color="#CA8504"
                  className="size-3"
                  onClick={clearAllFilters}
                />
              </div>
            </div>

            <Separator className="h-[0.5px]! mt-2" />

            <div className="flex flex-wrap gap-1.5 mt-3 mb-8">
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  className="relative px-3 py-1 flex items-center justify-between gap-2 bg-[#FEFDF0] border-[#FDE272] text-[#A15C07] text-xs"
                >
                  {cat}
                  <span className="relative z-20 cursor-pointer">
                    <X
                      color="#A15C07"
                      className="size-2.5"
                      onClick={() => removeFilter("category", cat)}
                    />
                  </span>
                </Badge>
              ))}
              {paymentMethods.map((method) => (
                <Badge
                  key={method}
                  className="px-3 py-1 flex items-center justify-between gap-2 bg-[#FEFDF0] border-[#FDE272] text-[#A15C07] text-xs"
                >
                  {method}
                  <span className="relative z-20 cursor-pointer">
                    <X
                      color="#A15C07"
                      className="size-2.5"
                      onClick={() => removeFilter("payment", method)}
                    />
                  </span>
                </Badge>
              ))}
            </div>
          </>
        )}

        <Collapsible
          open={openSections.cat}
          onOpenChange={() => handleToggle("cat")}
        >
          <CollapsibleTrigger className="px-2 w-full flex items-center justify-between text-xs text-gray-700 font-medium cursor-pointer">
            دسته‌بندی فعالیت
            <ChevronDown
              color="#CA8504"
              className={`size-4 transition-transform ${openSections.cat ? "rotate-180" : "rotate-0"}`}
            />
          </CollapsibleTrigger>
          <Separator className="h-[0.5px]! mt-2" />
          <CollapsibleContent className="flex flex-col mt-3 gap-4 mb-2">
            {["دسته ۱", "دسته ۲", "دسته ۳", "دسته ۴"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-2 text-xs font-thin text-[#1C1D1F] cursor-pointer"
              >
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onCheckedChange={() => toggleCategory(cat)}
                />{" "}
                {cat}
              </label>
            ))}
            <div className="flex flex-col gap-5 mt-2">
              <div className="custom-style-select ">
                <Select value={province} onValueChange={setProvince}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="استان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تهران">تهران</SelectItem>
                    <SelectItem value="اصفهان">اصفهان</SelectItem>
                    <SelectItem value="مشهد">مشهد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="custom-style-select ">
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="شهر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="تهران">تهران</SelectItem>
                    <SelectItem value="اصفهان">اصفهان</SelectItem>
                    <SelectItem value="مشهد">مشهد</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="custom-style-select  grid items-center gap-1 ">
                <Label htmlFor="amount" className="text-gray-900 text-[10px]">
                  مقدار مورد نیاز
                </Label>
                <Input
                  placeholder="5 تن"
                  className="h-9  rounded-sm  text-[#5B5C5F] text-[11px]! 
                               border border-[#D0D5DD]  
                               focus-visible:ring-0 focus-visible:ring-offset-0  
                               focus-visible:outline-none"
                  type="text"
                  id="amount"
                />
              </div>

              <div className="custom-style-select  grid items-center gap-1 ">
                <Label htmlFor="amount" className="text-gray-900 text-[10px]">
                  مهلت تحویل
                </Label>
                <Input
                  placeholder="5 روز"
                  className="h-9  rounded-sm  text-[#5B5C5F] text-[11px]! 
                               border border-[#D0D5DD]  
                               focus-visible:ring-0 focus-visible:ring-offset-0  
                               focus-visible:outline-none"
                  type="text"
                  id="amount"
                />
              </div>

              <div className="custom-style-select ">
                <Select value={offers} onValueChange={setOffers}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="تعداد پیشنهاد های ثبت شده" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="کمتر از 10">کمتر از 10</SelectItem>
                    <SelectItem value="10-50">10-50</SelectItem>
                    <SelectItem value="50-100">50-100</SelectItem>
                    <SelectItem value="بیشتر از 100">بیشتر از 100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={openSections.payment}
          onOpenChange={() => handleToggle("payment")}
        >
          <CollapsibleTrigger className="mt-6 px-2 w-full flex items-center justify-between text-xs text-gray-700 font-medium cursor-pointer">
            اولویت
            <ChevronDown
              color="#CA8504"
              className={`size-4 transition-transform ${openSections.payment ? "rotate-180" : "rotate-0"}`}
            />
          </CollapsibleTrigger>
          <Separator className="h-[0.5px]! mt-2" />
          <CollapsibleContent className="flex flex-col mt-3 gap-4 mb-2">
            {["فوری", "غیرفوری", "بدون ددلاین"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 text-xs font-thin text-[#1C1D1F] cursor-pointer"
              >
                <Checkbox
                  checked={paymentMethods.includes(method)}
                  onCheckedChange={() => togglePayment(method)}
                />{" "}
                {method}
              </label>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          open={openSections.price}
          onOpenChange={() => handleToggle("price")}
        >
          <CollapsibleTrigger className="mt-6 px-2 w-full flex items-center justify-between text-xs text-gray-700 font-medium cursor-pointer">
            قیمت
            <ChevronDown
              color="#CA8504"
              className={`size-4 transition-transform ${openSections.price ? "rotate-180" : "rotate-0"}`}
            />
          </CollapsibleTrigger>
          <Separator className="h-[0.5px]! mt-2" />
          <CollapsibleContent className="mt-4 flex flex-col items-center">
            <Slider
              dir="rtl"
              value={priceRange}
              min={100}
              max={10000}
              step={1}
              onValueChange={setPriceRange}
              className="w-[90%]"
            />
            <div className="flex justify-between items-center gap-1 mt-4 text-[#97989B] text-xs w-[90%]">
              <div className="w-1/2 h-7 border rounded-sm border-[#DADCDE] flex items-center justify-center">
                {priceRange[0]} تومان
              </div>
              <span className="w-fit text-gray-800 text-xs">تا</span>
              <div className="w-1/2 h-7 border rounded-sm border-[#DADCDE] flex items-center justify-center">
                {priceRange[1]} تومان
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </>
  );
}
