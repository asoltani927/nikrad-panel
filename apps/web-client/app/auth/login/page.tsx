"use client"


import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";


export default function LoginPage() {
    const router = useRouter()
    const [phone, setPhone] = useState("")

    const phoneSchema = z.string()
        .min(1, "شماره موبایل الزامی است")
        .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست");

    const [error, setError] = useState("");

    const handleNext = () => {
        const result = phoneSchema.safeParse(phone);

        if (!result.success) {
            console.log("Zod result:", result);
            setError(result.error.issues[0].message);
            return;
        }


        setError("");
        console.log("Phone:", phone);
        router.push("/auth/otp");
    };

    return (
        <div className="w-full min-h-screen flex items-center gap-6 bg-white py-6 px-8 lg:px-0">
            <section className="relative h-full flex items-center justify-center w-full lg:w-[43%]  " >
                <Image
                    src="/svg/Backgroundpatterndecorative(1).svg"
                    width={580}
                    height={580}
                    alt="phone"
                    className="hidden lg:block absolute"
                />
                <div className="relative w-full flex flex-col items-center justify-center z-20">

                    <div className="w-16 h-16 lg:w-12 lg:h-[50px] relative ">
                        <Image
                            src="/img/nikrad-logo.png"
                            alt="Nikrad_Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-[24px] lg:text-[22px] font-semibold lg:font-medium mt-6 lg:mt-4">وارد حساب کاربری خود شوید</h3>
                    <p className="w-full lg:w-[275px] text-center text-sm lg:text-[11px] text-muted-foreground mt-2 lg:mt-0 mb-10 lg:mb-6 leading-6 ">
                        خوش آمدید! لطفا شماره موبایل خود را وارد کنید.
                    </p>
                    <div className="w-full lg:w-[275px] relative z-10 grid items-center gap-1 ">
                        <Label htmlFor="phone" className="text-[#5B5C5F] text-[10px]">
                            شماره موبایل
                        </Label>
                        <Input
                            className="h-10 lg:h-9 mb-4 rounded-sm bg-white ps-10 text-[#5B5C5F] text-[11px]! 
                               border border-[#D0D5DD]  
                               focus-visible:ring-0 focus-visible:ring-offset-0  
                               focus-visible:border-[#EAAA08] focus-visible:outline-none"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setError("");
                            }}
                            type="tel"
                            id="phone"
                        />
                        <span className="absolute end-8 border-e-[1.3px] border-[#D0D5DD] w-1 h-3.5 mt-1"></span>
                        <span className="absolute end-2 text-[#5B5C5F] text-[10px] mt-1">98+</span>
                        {error &&
                            <p className="absolute bottom-0 text-red-500 text-[9px]">{error}</p>
                        }
                    </div>
                    <Button
                        className="w-full lg:w-[275px] h-10 lg:h-9 text-[11px] cursor-pointer rounded-sm mt-1 font-light! bg-[#EAAA08] hover:bg-[#d8a708]"
                        onClick={handleNext}
                    >
                        ورود به حساب
                    </Button>
                    <div className="w-full lg:w-[275px] flex flex-col items-start gap-4">
                        <label className="flex items-end gap-2 text-xs font-thin text-[#1C1D1F] cursor-pointer mt-4">
                            <Checkbox className="h-4 w-4" />
                            <span className="text-[#5B5C5F] text-sm lg:text-[10px] ">با ثبت‌نام و ورود، <Link href="/rules" className="text-yellow-600 underline cursor-pointer">قوانین فروشگاه </Link>را می‌پذیرم.</span>
                        </label>
                        {/* <div className="text-[#5B5C5F] text-sm lg:text-[10px] ">
                            حساب کاربری ندارید؟
                            <Link href="/auth/register" className="text-yellow-600"> ثبت‌نام</Link>
                        </div> */}
                    </div>
                </div>
            </section>
            <section className="hidden lg:flex justify-center h-full w-[57%]  " >
                <div className="relative  flex justify-center w-8 h-8 lg:w-full lg:h-[140vh] ">
                    <img
                        src="/img/login-bg-21.png"
                        alt="material-book"
                        className="lg:w-fit lg:h-full object-cover"
                    />
                    <div className="w-[92%] h-[15.5%] absolute bottom-0 flex justify-center items-center  text-white  leading-9 text-[20px] bg-cover bg-no-repeat ">
                        با پیوستن به فروشگاه نیکراد می‌توانید مستقیماَ از فروشندگان خرید کنید یا به عنوان<br /> فروشنده محصولات خود را عرضه کنید.
                    </div>
                </div>
            </section>
        </div>
    )
}