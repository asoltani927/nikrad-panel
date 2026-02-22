import { useCart } from "@/hooks/use-cart";
import { Button } from "@base-ui/react";
import { useMemo } from "react";

interface PaymentDetailsProps {
    onSubmit: () => void;
    defaultCaption: string;
}

export function PaymentDetails({ onSubmit, defaultCaption }: PaymentDetailsProps) {

    const { cart } = useCart()

    const cartItems = useMemo(() => cart?.items ?? [], [cart])

    const handleSubmit = () => {
        onSubmit();
    };


    return <>
        <div className="flex justify-between items-center px-3 border-t lg:border-none pt-8 mt-8 lg:mt-0 lg:pt-0">
            <h3 className="hidden lg:block font-medium text-xl lg:text-[15px] text-[#2E2F39]">سبد خرید</h3>
            <h3 className="block lg:hidden font-medium text-xl lg:text-[15px] text-[#2E2F39]">صورت حساب</h3>
        </div>
        <div className="lg:border-t border-[#ECECED] pt-3 text-sm flex flex-col gap-4 lg:gap-2 px-3 space-y-2">
            <span className="hidden lg:block font-thin lg:text-[13px] text-[#333741]">صورت حساب</span>
            <p className="flex justify-between text-sm lg:text-xs">
                <span className="text-[#85888E] ">تعداد</span>
                <span className="text-[#333741]">{cartItems.length}</span>
            </p>
            <p className="flex justify-between text-sm lg:text-xs">
                <span className="text-[#85888E] ">قیمت کالاها</span>
                <span className="text-[#333741]">{cart?.amount} تومان</span>
            </p>
            <p className="flex justify-between text-sm lg:text-xs">
                <span className="text-[#CA8504] ">تخفیف</span>
                <span className="text-[#333741]">{0} تومان</span>
            </p>
            <p className="flex justify-between text-sm lg:text-xs">
                <span className="text-[#85888E] ">هزینه ارسال</span>
                <span className="text-[#333741]">{cart?.shippingCost} تومان</span>
            </p>
            <p className="flex justify-between text-sm lg:text-xs border-t border-[#ECECED] pt-4">
                <span className="text-[#85888E] ">مبلغ قابل پرداخت</span>
                <span className="text-[#333741]">{cart?.totalAmount} تومان</span>
            </p>
        </div>
        <p className="text-[13px] lg:text-xs font-thin  text-gray-500 px-3  space-y-2 leading-5">
            <span className="text-[#CA8504]">توجه:</span>
            کالاهای موجود در سبد شما رزرو و ثبت نشده‌اند.
            برای ثبت سفارش مراحل بعدی را تکمیل کنید.
        </p>
        {
            cartItems.length === 0 && (
                <p className="text-center text-sm lg:text-xs text-gray-500 font-thin">
                    سبد خرید شما خالی است.
                </p>
            )
        }
        {
            cartItems.length > 0 && (
                <Button onClick={handleSubmit} className="w-full mt-4 lg:mt-0 bg-yellow-500 lg:bg-brand-primary cursor-pointer text-base lg:text-[11px] rounded-md lg:rounded-[3px] h-12 lg:h-7 hover:bg-[#cc9205] text-white lg:text-black">
                    {defaultCaption ? defaultCaption : " تکمیل سفارش"}
                </Button>
            )
        }
    </>
}