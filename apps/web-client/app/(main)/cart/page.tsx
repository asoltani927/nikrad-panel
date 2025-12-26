"use client";

import { useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import BaseContainer from "@/components/base/BaseContainer";
import { useRouter } from "next/navigation";
import { CheckoutBreadcrumb } from "./components/CheckoutBreadcrumb";
import { cartItems } from "./components/cardItems.data";
import { Badge } from "@/components/ui/badge";

export default function CartPage() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push("/cart/checkout");
    };

    const [quantities, setQuantities] = useState(
        Object.fromEntries(cartItems.map(item => [item.id, 1]))
    );

    const increment = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] + 1
        }));
    };

    const decrement = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    };

    return (
        <div className="lg:mt-14">
            <CheckoutBreadcrumb />
            <BaseContainer>
                <div className="w-full lg:min-h-screen flex flex-col items-center justify-start pb-24 lg:pt-10 lg:pb-9 px-6">
                    {/* ------------------ TITLE ------------------ */}
                    <div className="lg:w-[73%] flex items-center justify-between mb-9 text-[23px] font-semibold text-gray-800">
                        <h1>سبد خرید</h1>
                        <span className="text-gray-600">3 کالا</span>
                    </div>

                    <div className="w-full lg:w-[73%] grid grid-cols-12 gap-4">

                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 lg:gap-4 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg lg:py-7 px-4">
                            {cartItems.map((item) => (
                                <div key={item.id}>
                                    {/* <div className="flex items-center"></div> */}
                                    <div
                                        className="flex flex-col lg:flex-row justify-between text-xs pb-6 lg:pb-4 pe-3"
                                    >
                                        <div className="w-full lg:w-fit flex gap-6 lg:gap-3">
                                            <div className="w-20 h-20 lg:w-[54px] lg:h-[54px] aspect-square relative lg:mt-2">
                                                <Image
                                                    src="/img/product-image.png"
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain rounded-sm"
                                                />
                                            </div>

                                            <div className="relative flex flex-col gap-1.5">
                                                <h5 className="text-[#54555D] text-[15px] lg:text-[12.5px] font-medium">
                                                    {item.title}
                                                </h5>

                                                <div className="flex flex-row items-center text-sm lg:text-[11px] gap-1.5">
                                                    <span className="text-[#54555D] font-normal">رنگ:</span>
                                                    <div
                                                        className={`w-5 h-5 lg:w-[14.5px] lg:h-[14.5px] rounded-[3px] ${item.color}`}
                                                    />
                                                </div>

                                                <div className="absolute lg:relative -bottom-8 -start-26 lg:bottom-auto lg:start-auto flex items-center gap-2">
                                                    <button
                                                        onClick={() => increment(item.id)}
                                                        className="w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center hover:bg-gray-50 cursor-pointer border border-[#85858B] rounded-sm"
                                                    >
                                                        <Plus color="#000000" className="size-2 lg:size-2.5 -mt-px" />
                                                    </button>

                                                    <span className="text-[10px]">{quantities[item.id]}</span>

                                                    <button
                                                        onClick={() => decrement(item.id)}
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
                                                <span className="line-through">{item.oldPrice}</span>
                                                <Badge className="bg-[#FEE4E2] border-[#F97066] text-[#D92D20] px-3! lg:px-2! text-xs lg:text-[9px] h-8 lg:h-6">
                                                    {item.discount}
                                                </Badge>
                                            </div>
                                            <div className="me-[51px] lg:me-0 lg:ms-1.5">
                                                {item.price}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit col-span-12 lg:col-span-4 flex flex-col gap-3 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg pt-7 pb-5 px-2">
                            <div className="flex justify-between items-center px-3">
                                <h3 className="font-medium text-xl lg:text-[15px] text-[#2E2F39]">سبد خرید</h3>
                            </div>

                            <div className="border-t border-[#ECECED] pt-3 text-sm flex flex-col gap-4 lg:gap-2 px-3">
                                <span className="font-thin lg:text-[13px] text-[#333741]">جزئیات پرداخت</span>

                                <p className="flex justify-between text-sm lg:text-[12px]">
                                    <span className="text-[#85888E] ">تعداد</span>
                                    <span className="text-[#333741]">۳</span>
                                </p>

                                <p className="flex justify-between text-sm lg:text-[12px]">
                                    <span className="text-[#85888E] ">قیمت کالاها</span>
                                    <span className="text-[#333741]">۳۴۳۴ تومان</span>
                                </p>

                                <p className="flex justify-between text-sm lg:text-[12px]">
                                    <span className="text-[#CA8504] ">تخفیف</span>
                                    <span className="text-[#333741]">۳۴ تومان</span>
                                </p>

                                <p className="flex justify-between text-sm lg:text-[12px]">
                                    <span className="text-[#85888E] ">هزینه ارسال</span>
                                    <span className="text-[#333741]">۳۴۳ تومان</span>
                                </p>

                                <p className="flex justify-between text-sm lg:text-[12px] border-t border-[#ECECED] pt-4 lg:pt-2">
                                    <span className="text-[#85888E] ">مبلغ قابل پرداخت</span>
                                    <span className="text-[#333741]">۳۴۳ تومان</span>
                                </p>
                            </div>

                            <p className="text-[13px] lg:text-[9px] font-thin  text-gray-500 leading-4 px-3">
                                <span className="text-[#CA8504]">توجه:</span>
                                کالاهای موجود در سبد شما رزرو و ثبت نشده‌اند.
                                برای ثبت سفارش مراحل بعدی را تکمیل کنید.
                            </p>

                            <Button onClick={handleSubmit} className="w-full mt-4 lg:mt-0 bg-yellow-500 lg:bg-brand-primary cursor-pointer lg:text-[11px] rounded-md lg:rounded-[3px] h-12 lg:h-7 hover:bg-[#cc9205] text-white lg:text-black">
                                تکمیل سفارش
                            </Button>
                        </div>

                    </div>
                </div>
            </BaseContainer>
        </div>
    );
}
