"use client";

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, Check, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function ProductsFilters() {
  const [selectedColors, setSelectedColors] = useState<string[]>([
    "F1AB90",
    "69101C",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "دسته بندی 1",
  ]);
  const [priceRange, setPriceRange] = useState<number[]>([1000, 6000]);
  const [openSections, setOpenSections] = useState({
    cat: false,
    color: false,
    price: false,
  });

  const colors = [
    { id: "E6E6E6", value: "#E6E6E6" },
    { id: "94999F", value: "#94999F" },
    { id: "C2B1A5", value: "#C2B1A5" },
    { id: "F1AB90", value: "#F1AB90" },
    { id: "997979", value: "#997979" },
    { id: "050505", value: "#050505" },
    { id: "F1AB930", value: "#F1AB90" },
    { id: "69101C", value: "#69101C" },
    { id: "DAA37F", value: "#DAA37F" },
    { id: "C0916F", value: "#C0916F" },
    { id: "988FAB", value: "#988FAB" },
    { id: "E4DB87", value: "#E4DB87" },
    { id: "B3B3B3", value: "#B3B3B3" },
    { id: "997929", value: "#997929" },
  ];

  const toggleColor = (id: string) => {
    setSelectedColors((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };
  type SectionKeys = keyof typeof openSections;

  const handleToggle = (section: SectionKeys) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasFilters = selectedColors.length > 0 || selectedCategories.length > 0;

  const removeFilter = (type: "color" | "category", value: string) => {
    if (type === "color") {
      setSelectedColors((prev) => prev.filter((c) => c !== value));
    } else if (type === "category") {
      setSelectedCategories((prev) => prev.filter((c) => c !== value));
    }
  };

  const clearAllFilters = () => {
    setSelectedColors([]);
    setSelectedCategories([]);
    setPriceRange([100, 10000]);
  };

  return (
    <>
      <span className="font-semibold text-lg text-gray-800">فیلترها</span>

      <div className="flex flex-col bg-[#FAFAFA] px-2 pt-7 pb-5 rounded-lg mt-9">
        {hasFilters && (
          <>
            <div className="px-2 w-full flex items-center justify-between text-sm text-gray-700 font-medium cursor-pointer">
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
                      className=" size-2.5 "
                      onClick={() => removeFilter("category", cat)}
                    />
                  </span>
                </Badge>
              ))}

              {selectedColors.map((color) => (
                <Badge
                  key={color}
                  className="px-3 py-1 flex items-center justify-between gap-2"
                  style={{
                    backgroundColor: "#FEFDF0",
                    border: "1px solid #FDE272",
                    color: "#A15C07",
                    fontSize: "12px",
                  }}
                >
                  {color}
                  <span className="relative z-20 cursor-pointer">
                    <X
                      color="#A15C07"
                      className="size-2.5 "
                      onClick={() => removeFilter("color", color)}
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
          <CollapsibleTrigger className="px-2 w-full flex items-center justify-between text-sm text-gray-700 font-medium cursor-pointer">
            دسته‌بندی
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
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          className="pt-3"
          open={openSections.color}
          onOpenChange={() => handleToggle("color")}
        >
          <CollapsibleTrigger className="px-2 w-full flex items-center justify-between text-sm text-gray-700 font-medium cursor-pointer">
            رنگ‌بندی
            <ChevronDown
              color="#CA8504"
              className={`size-4 transition-transform ${openSections.color ? "rotate-180" : "rotate-0"}`}
            />
          </CollapsibleTrigger>
          <Separator className="h-[0.5px]! mt-2" />
          <CollapsibleContent className="mt-3 flex flex-col gap-2 mb-4">
            <div className="flex flex-wrap items-center gap-1 gap-y-1 cursor-pointer">
              {colors.map((color) => {
                const isActive = selectedColors.includes(color.id);
                return (
                  <div key={color.id} onClick={() => toggleColor(color.id)}>
                    {isActive ? (
                      <div
                        className="relative w-7 h-7 flex items-center justify-center border-[0.3px] rounded-sm"
                        style={{ borderColor: color.value }}
                      >
                        <div
                          className="flex items-center justify-center absolute"
                          style={{
                            backgroundColor: color.value,
                            borderRadius: "4px",
                            width: "23px",
                            height: "23.5px",
                          }}
                        >
                          <Check color="white" size={10} />
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-7 h-7 flex items-center justify-center border-[0.3px] rounded-sm border-[#FAFAFA] ">
                        <div
                          className="flex items-center justify-center absolute"
                          style={{
                            backgroundColor: color.value,
                            width: "23px",
                            height: "23.5px",
                            borderRadius: "4px",
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible
          className="pt-3"
          open={openSections.price}
          onOpenChange={() => handleToggle("price")}
        >
          <CollapsibleTrigger className="px-2 w-full flex items-center justify-between text-sm text-gray-700 font-medium cursor-pointer">
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
              onValueChange={(val: number[]) => setPriceRange(val)}
              className="w-[90%]"
            />
            <div className="flex justify-between items-center gap-1 mt-4 text-[#97989B] text-xs w-[90%]">
              <div className="w-1/2 h-7 border rounded-sm border-[#DADCDE] flex items-center justify-center">
                {priceRange[0]} تومان
              </div>
              <span className="w-fit text-gray-800 text-sm">تا</span>
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
