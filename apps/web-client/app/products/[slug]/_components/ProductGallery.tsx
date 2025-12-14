"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

const images = [
    "/img/product-image.png",
    "/img/material-book/11879344_Checklist3242.png",
    "/img/product-image.png",
    "/img/product-image.png",
    "/img/product-image.png",
    "/img/product-image.png",
    "/img/product-image.png",
];

export const ProductGallery = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [mainRef, mainApi] = useEmblaCarousel({
        direction: "ltr",
        loop: false,
    });

    useEffect(() => {
        if (!mainApi) return;
        const onSelect = () =>
            setSelectedIndex(mainApi.selectedScrollSnap());
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
            <div className="h-[420px] overflow-y-auto hiddenScrollStyle">
                <div className="flex flex-col gap-5">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => onThumbClick(i)}
                            className={`w-14 h-14  cursor-pointer relative aspect-square rounded-md overflow-hidden  ${selectedIndex === i
                                ? " opacity-100"
                                : "opacity-50 hover:opacity-60"
                                }`}
                        >
                            <Image
                                src={src}
                                alt=""
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
                    {images.map((src, i) => (
                        <div
                            key={i}
                            className="min-w-full relative aspect-square bg-[#F5F5F5]"
                        >
                            <Image
                                src={src}
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
