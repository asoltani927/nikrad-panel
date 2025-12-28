"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { CartItemType } from "./typings/cartItem.types";

export default function CartPreviewItem({
    id,
    title,
    color,
    oldPrice,
    price,
    discount,
}: CartItemType) {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <div className="flex flex-col lg:flex-row justify-between text-xs pb-6 lg:pb-4 pe-3">
            <div className="w-full lg:w-fit flex gap-6 lg:gap-3">
                <div className="w-20 h-20 lg:w-[54px] lg:h-[54px] aspect-square relative lg:mt-2">
                    <Image
                        src="/img/product-image.png"
                        alt={title}
                        fill
                        className="object-contain rounded-sm"
                    />
                </div>
                <div className="relative flex flex-col gap-1.5">
                    <h5 className="text-[#54555D] text-[15px] lg:text-[12.5px] font-medium">
                        {title}
                    </h5>
                    <div className="flex flex-row items-center text-sm lg:text-[11px] gap-1.5">
                        <span className="text-[#54555D] font-normal">رنگ:</span>
                        <div
                            className={`w-5 h-5 lg:w-[14.5px] lg:h-[14.5px] rounded-[3px] ${color}`}
                        ></div>
                    </div>
                    <div className="absolute lg:relative -bottom-8 -start-26 lg:bottom-auto lg:start-auto flex items-center gap-2">
                        <button
                            onClick={increment}
                            className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center hover:bg-gray-50 cursor-pointer border border-[#85858B] rounded-sm"
                        >
                            <Plus color="#000000" className="size-2 lg:size-2.5 -mt-px" />
                        </button>
                        <span className="text-[10px]">{quantity}</span>
                        <button
                            onClick={decrement}
                            className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center cursor-pointer hover:bg-gray-50 border border-[#85858B] rounded-sm"
                        >
                            <Minus color="#000000" className="size-2 lg:size-2.5 -mt-px" />
                        </button>
                        <Trash2 className="text-yellow-500 hover:text-yellow-600 cursor-pointer size-4 lg:size-4.3" />
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-fit items-end lg:items-start flex flex-col text-gray-900 lg:text-gray-700 gap-1 pe-4 lg:pe-0 -mt-4 lg:mt-0">
                <div className="flex items-center gap-2">
                    <span className="line-through">{oldPrice}</span>
                    <Badge className="bg-[#FEE4E2] border-[#F97066] text-[#D92D20] px-3! lg:px-2! text-xs lg:text-[9px] h-8 lg:h-6">
                        {discount}
                    </Badge>
                </div>
                <div className="me-[51px] lg:me-0 lg:ms-1.5">{price}</div>
            </div>
        </div>
    );
}
