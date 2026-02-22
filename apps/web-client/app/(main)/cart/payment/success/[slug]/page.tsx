"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation";


export default function PaymentSuccessPage() {
    const router = useRouter()

    const params = useParams();
    const slug = params?.slug;

    const handleNext = () => {
        router.push("/")
    }

    return (
        <div className="relative w-full lg:min-h-screen flex flex-col items-center px-10 pt-16 lg:pt-10 pb-12 lg:pb-44">

            <Image
                src="/svg/material-book/Backgroundpatterndecorative.svg"
                width={580}
                height={580}
                alt="phone"
                className="absolute hidden lg:block opacity-[0.6] "
            />

            <div className="relative z-10 w-full flex flex-col items-center mb-14">

                <div className="w-[88px] h-[88px] relative lg:mt-20">
                    <Image
                        src="/svg/material-book/success-payment.svg"
                        fill
                        alt="phone"
                        className="object-contain"
                    />
                </div>

                <h1 className="text-center text-2xl font-semibold text-[#1F242F] mt-7">
                    پرداخت شما با موفقیت انجام شد.
                </h1>

                <p className="w-[275px] text-center lg:text-sm text-muted-foreground mb-8 mt-6 leading-6 ">
                    کد رهگیری: <span >{slug}</span>
                </p>

                <div className="w-full lg:w-fit flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-2">
                    <Button variant={"outline"}
                        className="w-full  sm:w-[135px]  py-6 lg:py-1.5 bg-transparent cursor-pointer  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] text-base lg:text-xs font-medium"
                        onClick={handleNext}
                    >
                        پیگیری سفارش
                    </Button>
                    <Button
                        className="w-full sm:w-[135px] py-6 lg:py-1.5  cursor-pointer rounded-[3px] bg-yellow-500 lg:bg-brand-primary hover:bg-[#e7bd35] text-white lg:text-[#1C1D1F] text-base lg:text-xs font-medium"
                        onClick={handleNext}
                    >
                        بازگشت به صفحه اصلی
                    </Button>
                </div>
            </div>

        </div>
    )
}
