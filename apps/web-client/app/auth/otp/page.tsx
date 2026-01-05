"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Info } from "lucide-react"
import { z } from "zod";

export default function OtpPage() {
    const router = useRouter()
    const [codes, setCodes] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState("")
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return

        const newCodes = [...codes]
        newCodes[index] = value
        setCodes(newCodes)
        setError("")

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !codes[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleNext = () => {
        const otpSchema = z
            .string()
            .length(6, "کد تأیید باید ۶ رقمی باشد")

        const otpValue = codes.join("")
        const result = otpSchema.safeParse(otpValue)

        if (!result.success) {
            setError(result.error.issues[0].message)
            return
        }

        setError("")
        router.push("/");
    }

    return (
        <div className="w-full min-h-screen flex items-center gap-6 bg-white py-6 px-8 lg:px-0">
            <section className="relative h-full flex items-center justify-center w-full lg:w-[43%]">
                <Image
                    src="/svg/Backgroundpatterndecorative(1).svg"
                    width={580}
                    height={580}
                    alt="phone"
                    className="hidden lg:block absolute"
                />
                <div className="relative w-full flex flex-col items-center justify-center z-20">

                    <div className="w-16 h-16 lg:w-12 lg:h-[50px] relative">
                        <Image
                            src="/img/nikrad-logo.png"
                            alt="Nikrad_Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h3 className="text-[24px] lg:text-[22px] font-semibold lg:font-medium mt-6 lg:mt-4">وارد حساب کاربری خود شوید</h3>
                    <p className="w-full lg:w-[275px] text-center text-sm lg:text-[11px] text-muted-foreground mt-2 lg:mt-0 mb-10 lg:mb-6 leading-6 ">
                        کد پیامک شده را وارد کنید:
                    </p>

                    <div dir="ltr" className=" relative z-10 flex gap-2 mb-2">
                        {codes.map((code, index) => (
                            <Input
                                key={index}
                                maxLength={1}
                                inputMode="numeric"
                                className=" text-[#5B5C5F] text-[11px] w-9 h-9 text-center rounded-sm border border-[#D0D5DD] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#EAAA08] focus-visible:outline-none font-medium shadow-none"
                                value={code}
                                onChange={(e) => handleChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (inputsRef.current[index] = el)}
                            />
                        ))}
                    </div>

                    {error &&
                        <div className="w-[275px] ps-3"><p className="text-red-500 text-[10px] mb-2">{error}</p></div>
                    }

                    <div className="w-[275px] ps-2 flex items-center justify-start font-extralight gap-1 text-[#5B5C5F] text-[9px] mb-6">
                        <Info size={13} color="#5B5C5F" />
                        <span>متن راهنما</span>
                    </div>

                    <Button
                        className="w-full lg:w-[275px] h-10 lg:h-9 text-[11px] cursor-pointer rounded-sm mt-1 font-light bg-[#EAAA08] hover:bg-[#d8a708]"
                        onClick={handleNext}
                    >
                        ورود به حساب
                    </Button>

                </div>
            </section>

            <section className="hidden lg:flex justify-center h-full w-[57%]">
                <div className="relative flex justify-center w-8 h-8 lg:w-full lg:h-[140vh]">
                    <img
                        src="/img/login-bg-21.png"
                        alt="material-book"
                        className="lg:w-fit lg:h-full object-cover"
                    />
                    <div className="w-[92%] h-[15.5%] absolute bottom-0 flex justify-center items-center text-white leading-9 text-[20px] bg-cover bg-no-repeat">
                        با پیوستن به فروشگاه نیکراد می‌توانید مستقیماَ از فروشندگان خرید کنید یا به عنوان<br /> فروشنده محصولات خود را عرضه کنید.
                    </div>
                </div>
            </section>
        </div>
    )
}
