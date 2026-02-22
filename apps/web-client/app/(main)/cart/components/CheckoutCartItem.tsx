"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import { CartItemType } from "../typings/cartItem.types";
import { useCart } from "@/hooks/use-cart";

export default function CheckoutCartItem({
    id,
    title,
    color,
    price,
    discount,
    quantity: initialQuantity,
}: CartItemType) {
    const { updateItem } = useCart();
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateItem({ id, quantity: newQuantity });
    };

    const decrement = () => {
        const newQuantity = quantity > 1 ? quantity - 1 : 1;
        setQuantity(newQuantity);
        updateItem({ id, quantity: newQuantity });
    };

    const oldPrice = useMemo(() => {
        if (discount > 0) return price + discount;
        return 0;
    }, [price, discount]);

    return (
        <div className="flex flex-col lg:flex-row justify-between text-xs gap-4">
            {/* Product Info */}
            <div className="w-full lg:w-[53%] flex items-center gap-8 lg:gap-3">
                <div className="w-[82px] h-[82px] lg:w-[62px] lg:h-[62px] aspect-square relative mb-14 lg:mb-0">
                    <Image
                        src="/img/product-image.png"
                        alt={title}
                        fill
                        className="object-contain rounded-sm"
                    />
                </div>
                <div className="relative flex flex-col justify-center gap-3 lg:gap-[7px]">
                    <h5 className="text-[#54555D] text-[17px] lg:text-[12px] font-medium">
                        {title}
                    </h5>
                    <span className="text-[#54555D] text-base lg:text-xs">کد : pr-55434</span>
                    <span className="text-[#54555D] font-normal text-sm lg:text-xs">پوشش : کف و دیوار</span>

                    <div className="flex flex-row items-center text-sm lg:text-[11px] gap-1.5">
                        <span className="text-[#54555D] font-normal text-sm lg:text-xs">رنگ:</span>
                        <div className={`w-5 h-5 lg:w-[14.5px] lg:h-[14.5px] rounded-[3px] ${color}`} />
                    </div>
                </div>
            </div>

            {/* Price & Quantity */}
            <div className="flex relative justify-end w-full lg:w-[47%]">
                <div className="w-full lg:w-[60%] flex flex-col items-center text-gray-900 lg:text-gray-700 gap-6 pe-4 lg:pe-0 -mt-4 lg:mt-0">
                    <div className="w-full hidden lg:flex items-center justify-start gap-2 font-medium text-sm lg:text-[13px] text-black">
                        قیمت واحد
                    </div>
                    <div className="w-full flex flex-col items-end lg:items-start justify-end gap-2">
                        {oldPrice > 0 && (
                            <div className="flex items-center gap-3">
                                <span className="line-through text-sm lg:text-xs">{oldPrice}</span>
                                <Badge className="bg-[#FEE4E2] border-[#F97066] text-[#D92D20] px-3! lg:px-2! text-sm lg:text-[9px] h-8 lg:h-6">
                                    {discount}
                                </Badge>
                            </div>
                        )}
                        <div className="me-[51px] lg:me-0 lg:ms-1.5 text-sm lg:text-xs">
                            {price} تومان
                        </div>
                    </div>
                </div>

                <div className="lg:w-[40%] absolute lg:relative bottom-18 -start-0 lg:bottom-auto lg:start-auto flex flex-row-reverse lg:flex-col items-center gap-2 lg:gap-6">
                    <div className="w-full flex items-center justify-end lg:gap-11">
                        <div className="hidden lg:block font-medium text-[13px]">تعداد</div>
                        <Trash2 className="text-yellow-500 hover:text-yellow-600 cursor-pointer size-4.5 lg:size-4.5" />
                    </div>
                    <div className="w-full flex items-center justify-end gap-2.5 lg:gap-3.5">
                        <button
                            onClick={increment}
                            className="w-6 h-6 lg:w-[30px] lg:h-[30px] flex items-center justify-center hover:bg-gray-50 cursor-pointer border border-[#85858B] rounded-sm"
                        >
                            <Plus color="#000000" className="size-2 lg:size-3.5 -mt-px" />
                        </button>
                        <span className="text-sm lg:text-xs">{quantity}</span>
                        <button
                            onClick={decrement}
                            className="w-6 h-6 lg:w-[30px] lg:h-[30px] flex items-center justify-center cursor-pointer hover:bg-gray-50 border border-[#85858B] rounded-sm"
                        >
                            <Minus color="#000000" className="size-2 lg:size-3.5 -mt-px" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}