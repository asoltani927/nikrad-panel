"use client";

import { useRef, useState } from "react";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/app/(main)/components/products/products.data";
import { ProductCard } from "@/app/(main)/products/components/ProductCard";

export function SellerBestSellingProducts() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [filter, setFilter] = useState("popular");

    const goRightToLeft = () => {
        sliderRef.current!.scrollLeft -= 300;
    };

    const goLeftToRight = () => {
        sliderRef.current!.scrollLeft += 300;
    };

    const sortedProducts = [...products].sort((a, b) => {
        switch (filter) {
            case "popular":
                return b.views - a.views;
            case "newest":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case "expensive":
                return b.price - a.price;
            case "cheap":
                return a.price - b.price;
            default:
                return 0;
        }
    });

    return (
        <>
            {/* Title + Filter */}
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between  mb-2 ps-6 lg:ps-0 mt-10 lg:mt-12 pe-4 lg:pe-14">
                <h2 className="text-[23px] lg:text-[18px] font-medium text-gray-800 ">پرفروش‌ترین‌ها</h2>

                <div className="hidden lg:flex items-center gap-2.5 ">
                    <button
                        onClick={goLeftToRight}
                        className="cursor-pointer ms-3 w-9 h-9 hidden lg:flex items-center justify-center border border-yellow-500 rounded-xs bg-transparent"
                    >
                        <ArrowRight color="#CA8504" size={17} />
                    </button>

                    <button
                        onClick={goRightToLeft}
                        className="cursor-pointer w-9 h-9 hidden lg:flex items-center justify-center border border-yellow-500 rounded-xs bg-transparent"
                    >
                        <ArrowLeft color="#CA8504" size={17} />
                    </button>
                </div>
            </div>

            {/* RTL Slider */}
            <div dir="ltr" className="relative w-full">
                <div
                    ref={sliderRef}
                    className="flex flex-row-reverse gap-5 overflow-x-auto hiddenScrollStyle scroll-smooth px-6 lg:pe-0 lg:ps-44 py-2"
                >
                    {sortedProducts.map((product) => (
                        <div key={product.id}>
                            NEED TO BE FIXED
                            {/* <ProductCard product={product} /> */}
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}
