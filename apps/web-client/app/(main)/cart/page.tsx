"use client";

import { Button } from "@/components/ui/button";
import BaseContainer from "@/components/base/BaseContainer";
import { useRouter } from "next/navigation";
import { CheckoutBreadcrumb } from "./components/CheckoutBreadcrumb";
import { cartItems } from "./components/cardItems.data";
import CheckoutCartItem from "./components/CheckoutCartItem";
import { Separator } from "@/components/ui/separator";

export default function CartPage() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push("/cart/checkout");
    };


    return (
        <div className="lg:mt-14 lg:min-h-screen">
            <CheckoutBreadcrumb />
            <BaseContainer>
                <div className="w-full  flex flex-col items-center justify-start pb-20 lg:pt-10 lg:pb-10 ">
                    {/* ------------------ TITLE ------------------ */}
                    <div className="w-full lg:w-[73%] flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 justify-between mb-8 lg:mb-9 mt-12 lg:mt-0 text-[23px] font-semibold text-gray-800 px-6 border-b pb-6 lg:border-none lg:pb-0 ">
                        <h1>سبد خرید</h1>
                        <span className="text-base font-normal lg:text-[23px] lg:font-semibold text-gray-600">3 کالا</span>
                    </div>
                    <div className="w-full lg:w-[73%] grid grid-cols-12 gap-4 px-6">
                        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 lg:gap-4 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg lg:py-7 lg:px-11">
                            {cartItems.map((item, index) => (
                                <div key={item.id}>
                                    <CheckoutCartItem {...item} />

                                    {index !== cartItems.length - 1 && (
                                        <div className="w-full mt-6 lg:mt-4 flex justify-end">
                                            <Separator className="lg:w-[90%]!  bg-[#ECECED]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="h-fit col-span-12 lg:col-span-4 flex flex-col gap-3 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg pt-7 pb-5 lg:px-2">
                            <div className="flex justify-between items-center px-3 border-t lg:border-none pt-8 mt-8 lg:mt-0 lg:pt-0">
                                <h3 className="hidden lg:block font-medium text-xl lg:text-[15px] text-[#2E2F39]">سبد خرید</h3>
                                <h3 className="block lg:hidden font-medium text-xl lg:text-[15px] text-[#2E2F39]">جزئیات پرداخت</h3>
                            </div>
                            <div className="lg:border-t border-[#ECECED] pt-3 text-sm flex flex-col gap-4 lg:gap-2 px-3">
                                <span className="hidden lg:block font-thin lg:text-[13px] text-[#333741]">جزئیات پرداخت</span>
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
                            <Button onClick={handleSubmit} className="w-full mt-4 lg:mt-0 bg-yellow-500 lg:bg-brand-primary cursor-pointer text-base lg:text-[11px] rounded-md lg:rounded-[3px] h-12 lg:h-7 hover:bg-[#cc9205] text-white lg:text-black">
                                تکمیل سفارش
                            </Button>
                        </div>
                    </div>
                </div>
            </BaseContainer>
        </div>
    );
}
