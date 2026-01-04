"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { X, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SellersFiltersMobileSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([
    "دسته بندی 1",
  ]);
  const [priceRange, setPriceRange] = React.useState<number[]>([1000, 6000]);
  const [openSections, setOpenSections] = React.useState({
    cat: false,
    price: false,
    payment: false,
  });
  const [province, setProvince] = React.useState("");
  const [city, setCity] = React.useState("");
  const [score, setScore] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [offers, setOffers] = React.useState("");
  const [paymentMethods, setPaymentMethods] = React.useState<string[]>([]);

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
    if (type === "category")
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    else setPaymentMethods((prev) => prev.filter((m) => m !== value));
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger />
      <SheetContent
        side="bottom"
        className="lg:hidden h-[90vh] max-h-[90vh] flex flex-col p-0 rounded-t-2xl"
      >
        <div className="p-4 overflow-y-auto flex-1">
          <div className="flex items-center justify-between p-4">
            <span className="font-semibold text-[23px] text-gray-800">
              فیلترها
            </span>
            <button onClick={() => onOpenChange(false)}>
              <X className="size-7 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col bg-[#FAFAFA] mx-4 pt-6 pb-5 rounded-lg">
            {hasFilters && (
              <>
                <div className="px-2 w-full flex items-center justify-between text-base text-gray-700 font-medium cursor-pointer">
                  فیلتر اعمال شده
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[#CA8504] text-[9px] cursor-pointer"
                      onClick={clearAllFilters}
                    >
                      حذف{" "}
                    </span>
                    <X
                      color="#CA8504"
                      className="size-2.5 cursor-pointer"
                      onClick={clearAllFilters}
                    />
                  </div>
                </div>
                <Separator className="h-[0.5px]! mt-2" />
                <div className="flex flex-wrap gap-1.5 mt-5 mb-10">
                  {selectedCategories.map((cat) => (
                    <Badge
                      key={cat}
                      className="relative px-3 py-1 flex items-center justify-between gap-2 bg-[#FEFDF0] border-[#FDE272] text-[#A15C07] text-[9px]"
                    >
                      {cat}
                      <span className="relative z-20 cursor-pointer">
                        <X
                          color="#A15C07"
                          className="size-2.5 cursor-pointer"
                          onClick={() => removeFilter("category", cat)}
                        />
                      </span>
                    </Badge>
                  ))}
                  {paymentMethods.map((method) => (
                    <Badge
                      key={method}
                      className="px-3 py-1 flex items-center justify-between gap-2 bg-[#FEFDF0] border-[#FDE272] text-[#A15C07] text-[9px]"
                    >
                      {method}
                      <span className="relative z-20 cursor-pointer">
                        <X
                          color="#A15C07"
                          className="size-2.5 cursor-pointer"
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
              <CollapsibleTrigger className="px-2 w-full flex items-center justify-between text-[13px] text-gray-700 font-medium cursor-pointer">
                دسته‌بندی فعالیت
                <ChevronDown
                  color="#CA8504"
                  className={`size-4 transition-transform ${openSections.cat ? "rotate-180" : "rotate-0"}`}
                />
              </CollapsibleTrigger>
              <Separator className="h-[0.5px]! mt-2" />
              <CollapsibleContent className="flex flex-col mt-3 gap-4 mb-4">
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
                  <div className="custom-style-select ">
                    <Select value={score} onValueChange={setScore}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="امتیاز فروشگاه" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="custom-style-select ">
                    <Select value={experience} onValueChange={setExperience}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="سابقه فعالیت" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="کمتر از 1 سال">
                          کمتر از 1 سال
                        </SelectItem>
                        <SelectItem value="1-3 سال">1-3 سال</SelectItem>
                        <SelectItem value="3-5 سال">3-5 سال</SelectItem>
                        <SelectItem value="بیشتر از 5 سال">
                          بیشتر از 5 سال
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                        <SelectItem value="بیشتر از 100">
                          بیشتر از 100
                        </SelectItem>
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
              <CollapsibleTrigger className="mt-6 px-2 w-full flex items-center justify-between text-[13px] text-gray-700 font-medium cursor-pointer">
                شرایط پرداخت
                <ChevronDown
                  color="#CA8504"
                  className={`size-4 transition-transform ${openSections.payment ? "rotate-180" : "rotate-0"}`}
                />
              </CollapsibleTrigger>
              <Separator className="h-[0.5px]! mt-2" />
              <CollapsibleContent className="flex flex-col mt-3 gap-4 mb-4">
                {["نقد", "چک", "اعتباری"].map((method) => (
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
              <CollapsibleTrigger className="mt-6 px-2 w-full flex items-center justify-between text-[13px] text-gray-700 font-medium cursor-pointer">
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
                  className="w-full"
                />
                <div className="flex justify-between items-center gap-1 mt-4 text-[#97989B] text-[8px] w-full">
                  <div className="w-1/2 h-7 border rounded-sm border-[#DADCDE] flex items-center justify-center">
                    {priceRange[0]} تومان
                  </div>
                  <span className="w-fit text-gray-800 text-[13px]">تا</span>
                  <div className="w-1/2 h-7 border rounded-sm border-[#DADCDE] flex items-center justify-center">
                    {priceRange[1]} تومان
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>

            <div className="w-full grid grid-cols-2 items-center gap-4 border-t pt-6 mt-6">
              <Button className="flex items-center h-12 rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-sm font-medium">
                اعمال فیلتر
              </Button>
              <Button
                variant={"outline"}
                className="flex items-center h-12 bg-transparent rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#A15C07] text-sm font-medium"
                onClick={clearAllFilters}
              >
                حذف فیلترها
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
