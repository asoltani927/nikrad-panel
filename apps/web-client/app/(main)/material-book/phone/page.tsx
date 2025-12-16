"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { z } from "zod";


export default function PhonePage() {
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
        router.push("/material-book/verify");
    };


    return (
        <div className="relative w-full flex flex-col items-center px-10 pt-16 pb-44">

            <Image
                src="/svg/material-book/Backgroundpatterndecorative.svg"
                width={580}
                height={580}
                alt="phone"
                className="absolute"
            />

            <div className="w-[275px] h-[270px] relative mt-52">
                <Image
                    src="/img/material-book/11879344_Checklist3242.png"
                    fill
                    alt="phone"
                    className="object-contain"
                />
            </div>

            <p className="w-[275px] text-center text-sm text-muted-foreground mb-6 leading-6 -mt-8">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و استفاده است.
            </p>

            <div className="w-[275px] relative z-10 grid items-center gap-1 ">
                <Label htmlFor="phone" className="text-[#5B5C5F] text-[10px]">
                    شماره موبایل
                </Label>

                <Input
                    className="h-9 mb-4 rounded-sm ps-10 text-[#5B5C5F] text-[11px]! 
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
                className="w-[275px] h-9 text-[11px] mt-2 cursor-pointer rounded-sm font-light! bg-[#EAAA08] hover:bg-[#d8a708]"
                onClick={handleNext}
            >
                مرحله بعد
            </Button>
        </div>
    )
}
