"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Info } from "lucide-react"
import { z } from "zod"
import { useSearchParams } from "next/navigation";


export default function VerifyPage() {
    const router = useRouter()
    const [codes, setCodes] = useState(["", "", "", "", "", ""])
    const [error, setError] = useState("")
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";


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

    const handleSubmit = () => {
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
        router.push(redirect);
    }

    return (
        <div className="relative lg:min-h-screen w-full flex flex-col items-center -mt-4 lg:mt-0 px-6 lg:px-10 pt-0 lg:pt-16 pb-24 lg:pb-44">
            <Image
                src="/svg/material-book/Backgroundpatterndecorative.svg"
                width={580}
                height={580}
                alt="verify"
                className="hidden lg:block absolute"
            />

            <div className="w-[350px] h-[285px]  lg:w-[275px] lg:h-[270px] relative lg:mt-52">
                <Image
                    src="/img/material-book/11879344_Checklist3242.png"
                    fill
                    alt="phone"
                    className="object-contain"
                />
            </div>

            <p className="w-[270px] text-center text-sm text-muted-foreground mb-5 leading-6 lg:-mt-8">
                کد تأیید ۶ رقمی ارسال شده به شماره وارد شده را وارد کنید.
            </p>

            <div dir="ltr" className=" relative z-10 flex gap-2 mb-2">
                {codes.map((code, index) => (
                    <Input
                        key={index}
                        maxLength={1}
                        inputMode="numeric"
                        className=" text-[#5B5C5F] text-[11px]!
                            w-9 h-9 text-center rounded-sm
                            border border-[#D0D5DD]  
                            focus-visible:ring-0 
                            focus-visible:ring-offset-0
                            focus-visible:border-[#EAAA08] 
                            focus-visible:outline-none
                            font-medium shadow-none
                        "
                        value={code}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                    />
                ))}
            </div>

            {error &&
                <div className="w-[275px] ps-3"><p className="text-red-500 text-[10px] mb-2">{error}</p></div>}

            <div className="w-[275px] ps-2 flex items-center justify-start font-extralight gap-1 text-[#5B5C5F] text-[9px] mb-6">
                <Info size={13} color="#5B5C5F" />
                <span>اگر کد را دریافت نکردید، دوباره ارسال می‌شود.</span>
            </div>

            <Button
                className="w-full lg:w-[275px] h-12 sm:h-9 lg:text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708]"
                onClick={handleSubmit}
            >
                مرحله بعد
            </Button>
        </div>
    )
}
