"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { product } from "./product.data";
import { ProductImage } from "./typings/product.type";
import { ZoomIn } from "lucide-react";

export const ProductGallery = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [mainRef, mainApi] = useEmblaCarousel({
        direction: "ltr",
        loop: false,
    });

    useEffect(() => {
        if (!mainApi) return;
        const onSelect = () => setSelectedIndex(mainApi.selectedScrollSnap());
        mainApi.on("select", onSelect);
        onSelect();
    }, [mainApi]);

    const onThumbClick = (index: number) => {
        if (!mainApi) return;
        mainApi.scrollTo(index);
    };

    return (
        <div className="flex gap-4">
            {/* Thumbnails - Native Scroll */}
            <div className="h-[447px] overflow-y-auto hiddenScrollStyle">
                <div className="flex flex-col gap-5">
                    {product.images.map((image: ProductImage, i: number) => (
                        <button
                            key={i}
                            onClick={() => onThumbClick(i)}
                            className={`w-14 h-14 cursor-pointer relative aspect-square rounded-md overflow-hidden ${selectedIndex === i ? "opacity-100" : "opacity-50 hover:opacity-60"
                                }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt || `تصویر محصول ${i + 1}`}
                                fill
                                className="object-cover shadow-xs"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Main image - Embla */}
            <div dir="ltr" ref={mainRef} className="flex-1 overflow-hidden rounded-xl">
                <div className="flex">
                    {product.images.map((image: ProductImage, i: number) => (
                        <div
                            key={i}
                            className="min-w-full relative aspect-square bg-[#F5F5F5]"
                        >
                            <Image
                                src={image.src}
                                alt={image.alt || `تصویر محصول ${i + 1}`}
                                fill
                                className="object-contain"
                            />
                            <div className="absolute cursor-pointer top-4 end-4 flex items-center justify-center rounded-sm bg-brand-primary p-[7px] ">
                                <ZoomIn size={16} color="#333741" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
