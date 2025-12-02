"use client";

import { useRef, useState } from "react";
import BaseContainer from "@/components/base/BaseContainer";
import { products } from "./products.data";
import { ProductCard } from "./ProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductSelectFilter } from "./ProductSelectFilter";

export function ProductsShowcase() {
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
                // @ts-expect-error TODO @hanna @reza remove the commented line and fix typescript issue
                return b.views - a.views;
            case "newest":
                // @ts-expect-error TODO @hanna @reza remove the commented line and fix typescript issue
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
        <section className="w-full bg-[url('/img/home/Color-Triangle-101.png')] bg-no-repeat bg-cover pb-32 pt-40 lg:py-40">
            <BaseContainer className="lg:ps-44">
                {/* Title + Filter */}
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between lg:pe-44 mb-6 ps-8 lg:ps-0">
                    <h2 className="text-[40px] lg:text-[54px] font-medium lg:font-bold text-white ">محصولات</h2>

                    <div className="flex items-center gap-2 mt-4 lg:mt-12">
                        <ProductSelectFilter value={filter} onChange={setFilter} />
                        <button
                            onClick={goLeftToRight}
                            className="cursor-pointer ms-3 w-9 h-9 hidden lg:flex items-center justify-center border border-white rounded-xs bg-transparent"
                        >
                            <ArrowRight color="#FFF" size={17} />
                        </button>

                        <button
                            onClick={goRightToLeft}
                            className="cursor-pointer w-9 h-9 hidden lg:flex items-center justify-center border border-white rounded-xs bg-transparent"
                        >
                            <ArrowLeft color="#FFF" size={17} />
                        </button>
                    </div>
                </div>

                {/* RTL Slider */}
                <div dir="ltr" className="relative w-full">
                    <div
                        ref={sliderRef}
                        className="flex flex-row-reverse gap-5 overflow-x-auto hiddenScrollStyle scroll-smooth px-8 lg:pe-0 lg:ps-44 py-2"
                    >
                        {sortedProducts.map((product) => (
                            <div key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* See All */}
                <div className=" flex justify-end pe-8 lg:pe-44 mt-6">
                    <div className="border h-12 lg:h-9 px-8 lg:px-6 text-white lg:text-xs flex items-center gap-1 border-white rounded-xs cursor-pointer">
                        مشاهده همه
                        <ArrowLeft color="#FFF" className="size-6 lg:size-4" />
                    </div>
                </div>
            </BaseContainer>
        </section>
    );
}
