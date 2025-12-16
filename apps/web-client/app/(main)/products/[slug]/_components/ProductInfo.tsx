"use client";

import { Check, Heart, Share2, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { product } from "./product.data";

export const ProductInfo = () => {
    return (
        <div className="flex flex-col gap-2.5">

            <div className="flex items-center justify-between">
                <h1 className="text-[23px] font-semibold text-[#1F242F]">
                    {product.name}
                </h1>
                <div className="flex items-center gap-4">
                    <button className="cursor-pointer">
                        <Share2 size={23} color="#EAAA08" />
                    </button>
                    <button className="cursor-pointer">
                        <Heart size={23} color="#EAAA08" />
                    </button>
                </div>
            </div>

            <div className="w-full flex items-center justify-start gap-2">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            size={15}
                            className={i < product.rating ? "text-[#FDB022]" : "text-[#CECFD2]"}
                            fill={i < product.rating ? "#FDB022" : "#CECFD2"}
                        />
                    ))}
                </div>

                <span className="text-[11px] text-[#85888E]">({product.reviewsCount} نظر)</span>
            </div>

            <div className="flex justify-between items-center text-sm text-[#85888E] mt-1">
                <span>شناسه محصول</span>
                <span className="text-gray-700">{product.id}</span>
            </div>

            <p className="text-xs text-[#555] leading-6 line-clamp-3">
                {product.description}
            </p>

            <div className="flex justify-between items-center">
                <span className="text-sm text-[#85888E] font-base">قیمت</span>
                <span className="text-[20px] font-medium text-[#1F242F]">
                    {product.price}
                </span>
            </div>

            <div className="flex justify-between items-center text-sm">
                <span className="text-[#85888E] font-base">رنگ محصول</span>
                <div className="flex items-center gap-2">
                    {product.colors.map((color, i) => (
                        <div
                            key={i}
                            className={`rounded-[3px] w-[23px] h-[23px] ${color.selected ? "relative border-[0.3px] border-[#F1AB90] flex items-center justify-center" : ""}`}
                            style={{ backgroundColor: color.hex }}
                        >
                            {color.selected && <Check size={11} color="white" />}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-sm mt-1 mb-1.5">
                <span className="text-[#85888E]">نام فروشنده</span>
                <span className="font-medium text-gray-700">{product.seller}</span>
            </div>

            <span className="text-xs text-yellow-700">
                {product.stock} عدد موجود در انبار
            </span>

            <div className="w-full grid grid-cols-12 gap-[17px] mt-1.5">
                <Button asChild variant={"outline"} className=" col-span-5 h-7 bg-transparent rounded-[3px] border-yellow-500 hover:bg-[#e7bd35] text-[#CA8504] text-[11px] font-medium">
                    <Link
                        href={'/products'}
                        className="flex items-center gap-2"
                    >
                        رفتن به صفحه محصولات
                    </Link>
                </Button>
                <Button className="text-[11px] h-7 rounded-xs col-span-7 bg-brand-primary text-black hover:bg-[#e7bd35] cursor-pointer">
                    افزودن به سبد خرید
                </Button>
            </div>

        </div>
    );
};
