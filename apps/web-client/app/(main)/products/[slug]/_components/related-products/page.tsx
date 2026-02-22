"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { products } from "@/app/(main)/components/products/products.data";

// TODO: Verify that this page is fully SEO-safe (ensure data is fetched server-side). @reza
export const RelatedProducts = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [filter] = useState("popular");

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
        <div className="w-full mt-8">
            {/* Title + Filter */}
            <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between  mb-4 px-4 lg:px-0">
                <h2 className="text-[28px] lg:text-[30px] font-black text-[#333741] ">محصولات مشابه</h2>

                <div className="flex items-center gap-2.5">
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
                    className="flex flex-row-reverse gap-[19px] overflow-x-auto hiddenScrollStyle scroll-smooth px-6 lg:pe-0  pt-2 pb-10"
                >
                    {sortedProducts.map((product) => (
                        <div key={product.id}>
                            NEED TO BE FIXED
                            {/* <ProductCard product={product} /> */}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};
