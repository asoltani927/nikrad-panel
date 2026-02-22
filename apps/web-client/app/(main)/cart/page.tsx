"use client";

import { useRouter } from "next/navigation";
import CheckoutCartItem from "./components/CheckoutCartItem";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useMemo } from "react";
import { PaymentDetails } from "./components/PaymentDetails";

export default function CartPage() {
    const router = useRouter();

    const { cart } = useCart()

    const cartItems = useMemo(() => cart?.items ?? [], [cart])

    const handleSubmit = () => {
        router.push("/cart/checkout");
    };


    return (
        <div className="w-full lg:w-[73%] grid grid-cols-12 gap-4 px-6">
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 lg:gap-4 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg lg:py-7 lg:px-11">
                {cartItems.map((item, index) => (
                    <div key={item.id}>
                        <CheckoutCartItem
                            color=""
                            discount={item.discountValue}
                            id={item.id}
                            price={item.totalAmount}
                            title={item.product.name}
                            quantity={item.quantity}
                        />

                        {index !== cartItems.length - 1 && (
                            <div className="w-full mt-6 lg:mt-4 flex justify-end">
                                <Separator className="lg:w-[90%]!  bg-[#ECECED]" />
                            </div>
                        )}
                    </div>
                ))}
                {
                    cartItems.length <= 0 && (
                        <p className="text-center text-sm lg:text-xs text-gray-500 font-thin">
                            سبد خرید شما خالی است.
                        </p>
                    )
                }
            </div>
            <div className="h-fit col-span-12 lg:col-span-4 flex flex-col gap-3 lg:bg-[#FAFAFA] border-[#F1F1F1] lg:border rounded-lg pt-7 pb-5 lg:px-2">
                <PaymentDetails onSubmit={handleSubmit} defaultCaption="تکمیل سفارش" />
            </div>
        </div>
    );
}
