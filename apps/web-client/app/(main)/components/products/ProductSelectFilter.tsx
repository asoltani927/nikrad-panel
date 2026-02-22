"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const filters = ["popular", "newest", "expensive", "cheap"];

const filterLabels: Record<string, string> = {
    popular: "پربازدیدترین",
    newest: "جدیدترین",
    expensive: "گران‌ترین",
    cheap: "ارزان‌ترین",
};

interface ProductSelectFilterProps {
    value?: string;
    onChange?: (val: string) => void;
}

export function ProductSelectFilter({ value = "popular", onChange }: ProductSelectFilterProps) {
    const [selected, setSelected] = useState(value);
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (val: string) => {
        setSelected(val);
        setOpen(false);
        onChange?.(val);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger */}
            <div
                onClick={() => setOpen(!open)}
                className="px-20 lg:px-8 h-12 lg:h-9 text-lg lg:text-xs text-white border border-white bg-transparent rounded-xs flex items-center justify-between cursor-pointer select-none"
            >
                <span>{filterLabels[selected]}</span>
                <ChevronDown
                    className={`text-white transition-transform size-6 lg:size-4 duration-200 ${open ? "rotate-180" : "rotate-0"
                        }`}
                />
            </div>

            {/* Options */}
            {open && (
                <div className="absolute top-full mt-1 w-full bg-white border shadow-sm border-white text-gray-800 rounded-xs z-10 text-xs p-1">
                    {filters.map((f) => (
                        <div
                            key={f}
                            onClick={() => handleSelect(f)}
                            className="px-2 py-1.5 cursor-pointer hover:bg-white/20"
                        >
                            {filterLabels[f]}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
