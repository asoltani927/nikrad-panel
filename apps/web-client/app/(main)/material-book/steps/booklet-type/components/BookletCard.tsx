"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Booklet } from "./typing/booklet.types";

interface Props {
    booklet: Booklet;
    selected: boolean;
    onSelect: (titleFa: string) => void;
}

export default function BookletCard({ booklet, selected, onSelect }: Props) {
    return (
        <div
            onClick={() => onSelect(booklet.titleFa)}
            className={`relative w-full lg:w-[235px] bg-[#FAFAFA] rounded-md px-6 pb-6 pt-7  flex flex-col justify-between hover:shadow-sm transition ${selected ? "border border-[#EAAA08]" : ""
                }`}
        >
            <Image
                src="/svg/material-book/Vector345.svg"
                alt="material-book"
                width={120}
                height={10}
                className="absolute top-0 start-0 object-contain"
            />
            <div className="relative z-10">
                <h2 className="lg:text-[11px] font-semibold text-gray-800 mb-2 lg:mb-1">{booklet.titleFa}</h2>
                <span className="text-black lg:text-xs">({booklet.titleEn})</span>
                <p className="lg:text-[10px] text-gray-600 mt-4 mb-2.5 leading-7 lg:leading-5">{booklet.subtitle}</p>
                <ul className="flex flex-col gap-1 list-disc list-inside text-xs text-gray-700 marker:text-[#61646c] marker:text-[6px] mb-2 ms-1.5">
                    {booklet.list.map((item, i) => (
                        <li className="text-gray-500 text-xs lg:text-[9px] font-light leading-6 lg:leading-4" key={i}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col gap-2 mt-0.5">
                <div className="flex justify-between text-xl lg:text-[13px] font-medium">
                    <span className="text-[#85888E]">قیمت</span>
                    <span className="text-xl lg:text-[15px]">{booklet.price}</span>
                </div>
                <Button className="w-full text-black h-9 lg:h-6 text-sm lg:text-[11px] cursor-pointer rounded-sm bg-brand-primary hover:bg-[#d8a708]">
                    انتخاب
                </Button>
            </div>
        </div>
    );
}
