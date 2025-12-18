"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import LayoutFooter from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";


export default function PaymentSuccessPage() {
    const router = useRouter()


    const handleNext = () => {
        router.push("/")
    }

    return (
        <>
            <Header />
            <div className="relative w-full h-full flex flex-col items-center justify-center lg:justify-start px-10 pt-6 pb-20 lg:pb-44">

                <Image
                    src="/svg/Content.svg"
                    width={950}
                    height={950}
                    alt="phone"
                    className="hidden lg:block absolute"
                />

                <div className="relative z-10 w-full flex flex-col items-center mb-14">

                    <div className="w-52 h-52 lg:w-[330px] lg:h-[330px] relative lg:mt-48">
                        <Image
                            src="/svg/Error.svg"
                            fill
                            alt="phone"
                            className="object-contain"
                        />
                    </div>

                    <h1 className="text-center text-lg lg:text-[42px] font-semibold text-[#1F242F] -mt-4 lg:-mt-12">
                        صفحه مورد نظر پیدا نشد.
                    </h1>

                    <p className="w-[275px] text-center text-sm text-muted-foreground mb-8 lg:mb-4 mt-4 leading-6 ">
                        صفحه‌ای که به دنبال آن هستید وجود ندارد. <br />در این جا چند کلیک مفید وجود دارد:
                    </p>

                    <div className="w-full sm:w-[275px] flex justify-center relative  ">
                        <div className="w-full lg:w-fit relative">
                            <Input
                                placeholder="جستجوی محصولات"
                                className="w-full lg:w-68 h-10 lg:h-9 placeholder:text-[11px]! placeholder:font-thin text-[11px]!  ps-8 border-[#DADCDE] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                            />
                            <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-zinc-500 size-3.5" />
                        </div>
                    </div>

                    <div className="w-full sm:w-fit flex flex-col-reverse sm:flex-row items-center gap-4 lg:gap-2 mt-6 lg:mt-8">
                        <Button variant={"outline"}
                            className="w-full  sm:w-[135px]  py-5 lg:py-1.5 bg-transparent cursor-pointer  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] text-sm lg:text-xs font-medium"
                            onClick={handleNext}
                        >
                            <ArrowRight />
                            بازگشت
                        </Button>
                        <Button
                            className="w-full sm:w-[90px] py-5 lg:py-1.5  cursor-pointer rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-sm lg:text-xs font-medium"
                            onClick={handleNext}
                        >
                            خانه
                        </Button>
                    </div>
                </div>

            </div>
            <LayoutFooter />
        </>
    )
}
