"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useSendOtp } from "../hooks/useSendOtp";
import { normalizePhone } from "@/utils/normalizePhone.util";

type Props = {
  onSuccess: (phone: string) => void;
};

export default function LoginForm({ onSuccess }: Props) {
  const [phone, setPhone] = useState("");
  const { submit, loading, error: otpError, success } = useSendOtp();

  const phoneSchema = z
    .string()
    .min(1, "شماره موبایل الزامی است")
    .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست");

  const [error, setError] = useState("");

  const handleNext = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    const normalizedPhone = normalizePhone(phone);
    const ok = await submit(normalizedPhone);

    if (ok) {
      onSuccess(normalizedPhone);
    }
  };

  return (
    <div className="w-full h-screen flex items-center gap-6 bg-white py-4 px-8 lg:px-0 lg:pe-4 ">
      <section className="relative h-full flex items-center justify-center w-full lg:w-[43%]  ">
        <Image
          src="/svg/Backgroundpatterndecorative(1).svg"
          width={580}
          height={580}
          alt="phone"
          className="hidden lg:block absolute"
        />
        <div className="relative w-full flex flex-col items-center justify-center z-20">
          <div className="w-16 h-16 lg:w-20 lg:h-20.5 relative ">
            <Image
              src="/img/nikrad-logo.png"
              alt="Nikrad_Logo"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-[24px] lg:text-[32px] font-semibold lg:font-medium mt-6 lg:mt-4">
            وارد حساب کاربری خود شوید
          </h3>
          <p className="w-full lg:w-[320px] text-center text-sm lg:text-[14px] text-muted-foreground mt-2 lg:mt-0 mb-10 lg:mb-6 leading-6 ">
            خوش آمدید! لطفا شماره موبایل خود را وارد کنید.
          </p>
          <div className="w-full lg:w-[320px] relative z-10 grid items-center gap-1 ">
            <Label htmlFor="phone" className="text-[#5B5C5F] text-[15px]">
              شماره موبایل
            </Label>
            <Input
              className="h-10 lg:h-10 mb-5 rounded-sm bg-white ps-12 text-[#5B5C5F] text-[15px]! 
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
            <span className="absolute end-10 border-e-[1.3px] border-[#D0D5DD] w-1 h-5 mt-2" />
            <span className="absolute end-2 text-[#5B5C5F] text-[14px] mt-2.5">
              98+
            </span>
            {error && (
              <p className="absolute bottom-0 text-red-500 text-[11px]">
                {error}
              </p>
            )}
          </div>
          <Button
            disabled={loading}
            className="w-full lg:w-[320px] h-10 lg:h-9 text-[16px] cursor-pointer rounded-sm mt-1 font-light!
             bg-[#EAAA08] hover:bg-[#d8a708] disabled:opacity-50"
            onClick={handleNext}
          >
            {loading ? "در حال ارسال..." : "ورود به حساب"}
          </Button>
          <div className="w-full lg:w-[320px] flex flex-col items-start gap-4">
            <label className="flex items-end gap-2 text-xs font-thin text-[#1C1D1F] cursor-pointer mt-8">
              <Checkbox className="h-5 w-5" />
              <span className="text-[#5B5C5F] text-sm lg:text-[14PX] ">
                با ثبت‌نام و ورود،{" "}
                <Link
                  href="/rules"
                  className="text-yellow-600 underline cursor-pointer"
                >
                  قوانین فروشگاه{" "}
                </Link>
                را می‌پذیرم.
              </span>
            </label>
            {/* <div className="text-[#5B5C5F] text-sm lg:text-[10px] ">
                            حساب کاربری ندارید؟
                            <Link href="/auth/register" className="text-yellow-600"> ثبت‌نام</Link>
                        </div> */}
          </div>
        </div>
      </section>
      <section className="hidden lg:flex justify-center h-full w-[57%]  ">
        <div className="relative  flex justify-center w-8 h-8 lg:w-full lg:h-full ">
          <img
            src="/img/login-bg-21.png"
            alt="material-book"
            className="lg:w-full lg:h-full bg-center object-cover rounded-lg "
          />
          <div className="w-full flex items-center justify-center   absolute bottom-0  h-[18%]">
            <img className="w-full h-full " src="/img/Attributioncard.png" />
            <div className="absolute  w-full h-full flex justify-center items-center  text-white  leading-9 text-lg bg-cover bg-no-repeat ">
              با پیوستن به فروشگاه نیکراد می‌توانید مستقیماَ از فروشندگان خرید
              کنید یا به عنوان
              <br /> فروشنده محصولات خود را عرضه کنید.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
