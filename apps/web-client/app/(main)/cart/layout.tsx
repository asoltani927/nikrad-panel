'use client';
import BaseContainer from "@/components/base/BaseContainer";
import { CheckoutBreadcrumb } from "./components/CheckoutBreadcrumb";
import { useCart } from "@/hooks/use-cart";
import { useMemo } from "react";

export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const { cart } = useCart()

    const cartItems = useMemo(() => cart?.items ?? [], [cart])

    return (
        <div className="lg:mt-14 lg:min-h-screen">
            <CheckoutBreadcrumb />
            <BaseContainer>
                <div className="w-full  flex flex-col items-center justify-start pb-20 lg:pt-10 lg:pb-10 ">
                    <div className="w-full lg:w-[73%] flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-0 justify-between mb-8 lg:mb-9 mt-12 lg:mt-0 text-[23px] font-semibold text-gray-800 px-6 border-b pb-6 lg:border-none lg:pb-0 ">
                        <h1>سبد خرید</h1>
                        <span className="text-base font-normal lg:text-[23px] lg:font-semibold text-gray-600">{cartItems.length} کالا</span>
                    </div>
                    {children}
                </div>
            </BaseContainer>
        </div>
    )
}