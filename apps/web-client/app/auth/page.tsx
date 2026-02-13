"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { normalizePhone } from "@/utils/normalizePhone.util";
import { useAuth } from "@/providers/auth.provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const phoneSchema = z
  .string()
  .min(1, "شماره موبایل الزامی است")
  .regex(/^(\+98|0)?9\d{9}$/, "شماره موبایل معتبر نیست");

const RESEND_DELAY = 120; // seconds



const LoggedInView = () =>   {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const handleLogout = async () => {
    await logout();       // clears user, localStorage, and cookie
    router.push("/");     // redirect to home page
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">خوش آمدید، {user.fullName  }!</h2>
        <p className="mt-2 text-gray-500">{user.username}</p>

        <div className="mt-4 flex justify-center gap-2">
          <Button onClick={handleLogout}>خروج</Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            فروشگاه
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/dashboard")}
          >
            داشبورد
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(0);

  const { sendOtp, verifyOtp, loading, error: authError, user } = useAuth();

  // Handle input change
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    setError("");

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };


  // Timer effect
  useEffect(() => {
    if (step !== "otp") return;
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, step]);

  // Handle backspace
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !codes[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (step !== "otp") return;

    const otp = codes.join("");

    if (otp.length === 6 && !codes.includes("")) {
      handleVerifyOtp();
    }
  }, [codes]);

  // Send OTP
  const handleSendOtp = async () => {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    const normalizedPhone = normalizePhone(phone);
    const ok = await sendOtp(normalizedPhone);
    if (!ok) return;
    setStep("otp");
    setTimer(RESEND_DELAY);
    inputsRef.current[0]?.focus();

    // Optionally, you can focus the OTP input here
  };

  const handleResendOtp = async () => {
    if (timer > 0) return; // prevent sending before timer ends

    const normalizedPhone = normalizePhone(phone);
    const ok = await sendOtp(normalizedPhone);
    if (!ok) return;

    setCodes(["", "", "", "", "", ""]);
    inputsRef.current[0]?.focus();
    setTimer(RESEND_DELAY);
    toast.success("کد تایید مجدداً ارسال شد");
  };

  // Verify OTP (if you want OTP input in the same form)
  const handleVerifyOtp = async () => {
    if (step !== "otp") {
      return;
    }
    const otp = codes.join("");

    if (otp.length !== 6) {
      setError("کد تایید معتبر نیست");
      return;
    }
    const normalizedPhone = normalizePhone(phone);
    const ok = await verifyOtp(normalizedPhone, otp);
    if (!ok) {
      // TODO: handle styling of toast message @reza
      toast.warning("کد تایید معتبر نیست");
      setCodes(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
      return;
    }
    console.log("OTP verification result:", ok);
  };

  // If user is already logged in
  if (user) {
    return (<LoggedInView />);
  }

  return (
    <div className="w-full h-screen flex bg-white py-4 px-8 lg:px-0 gap-6">
      {/* Left Section */}
      <section className="relative flex items-center justify-center w-full lg:w-[43%] h-full">
        <Image
          src="/svg/Backgroundpatterndecorative(1).svg"
          width={580}
          height={580}
          alt="phone"
          className="hidden lg:block absolute"
        />

        <div className="relative z-20 flex flex-col items-center justify-center w-full">
          {/* Logo */}
          <div className="relative w-16 h-16 lg:w-20 lg:h-20.5">
            <Image
              src="/img/nikrad-logo.png"
              alt="Nikrad_Logo"
              fill
              className="object-contain"
            />
          </div>

          <h3 className="mt-6 lg:mt-4 text-[24px] lg:text-[32px] font-semibold lg:font-medium">
            وارد حساب کاربری خود شوید
          </h3>


          {
            step === "phone" ? (
              <p className="w-full lg:w-[320px] text-center text-sm lg:text-[14px] text-muted-foreground mt-2 mb-10 lg:mb-6 leading-6">
                خوش آمدید! لطفا شماره موبایل خود را وارد کنید.
              </p>
            ) : (
              <p className="w-full lg:w-[275px] text-center text-sm lg:text-[15px] text-muted-foreground mt-2 lg:mt-0 mb-10 lg:mb-6 leading-6">
                کد پیامک شده به {phone} را وارد کنید:
              </p>
            )
          }

          {
            step === "phone" && (
              <div className="relative w-full lg:w-[320px] grid gap-1">
                <Label htmlFor="phone" className="text-[#5B5C5F] text-[15px]">
                  شماره موبایل
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setError("");
                    }}
                    className="h-10 mb-5 rounded-sm bg-white ps-12 text-[#5B5C5F] text-[15px] border border-[#D0D5DD] focus-visible:outline-none focus-visible:border-[#EAAA08]"
                  />
                  <span className="absolute end-10 border-e-[1.3px] border-[#D0D5DD] w-1 h-5 mt-2" />
                  <span className="absolute end-2 text-[#5B5C5F] text-[14px] mt-2.5">98+</span>
                </div>

                {(error || authError) && (
                  <p className="absolute bottom-0 text-red-500 text-[11px]">{error || authError}</p>
                )}
              </div>)
          }
          {step === "otp" && (
            <div className="w-full lg:w-[320px] flex flex-col items-center mt-2">
              <div className="flex gap-2 mb-2" dir="ltr">
                {codes.map((code, index) => (
                  <Input
                    key={index}
                    maxLength={1}
                    inputMode="numeric"
                    className="text-[#5B5C5F] bg-white text-[11px] w-11 h-11 text-center rounded-sm border border-[#D0D5DD] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-[#EAAA08] focus-visible:outline-none font-medium shadow-none"
                    value={code}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => {
                      inputsRef.current[index] = el;
                    }}
                  />
                ))}
              </div>

              {/* Resend OTP */}
              <button
                className={`my-2 text-sm text-yellow-600 underline ${timer > 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={handleResendOtp}
                disabled={timer > 0}
              >
                {timer > 0 ? `ارسال مجدد در ${timer} ثانیه` : "ارسال مجدد کد"}
              </button>
            </div>
          )}

          {/* Buttons */}
          {
            step === "phone" ? (
              <Button
                onClick={handleSendOtp}
                disabled={loading}
                className="w-full lg:w-[320px] h-10 lg:h-9 mt-1 font-light rounded-sm text-[16px] bg-[#EAAA08] hover:bg-[#d8a708] disabled:opacity-50"
              >
                {loading ? "در حال ارسال..." : "ارسال کد ورود"}
              </Button>) : (
              <Button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full lg:w-[320px] h-10 lg:h-9 mt-1 font-light rounded-sm text-[16px] bg-[#EAAA08] hover:bg-[#d8a708] disabled:opacity-50"
              >
                {loading ? "در حال بررسی..." : "ورود"}
              </Button>)
          }

          {/* Terms */}
          <div className="w-full lg:w-[320px] flex flex-col items-center gap-4 mt-4  text-center">
            {
              step === "otp" && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full h-9 rounded-sm text-[14px] border-[#D0D5DD] hover:bg-[#f5f5f5]"
                  onClick={() => {
                    setStep("phone");
                    setCodes(["", "", "", "", "", ""]);
                    setPhone("");
                    setError("");
                    inputsRef.current[0]?.focus();
                  }}
                >
                  اصلاح شماره موبایل
                </Button>
              )
            }
            {/* TODO: fixed font size is not good  @reza */}
            <span className="text-[#5B5C5F] text-sm lg:text-[14px]">
              با ثبت‌نام و ورود،{" "}
              <Link href="/rules" className="text-yellow-600 underline">
                قوانین فروشگاه
              </Link>{" "}
              را می‌پذیرم.
            </span>
          </div>
        </div>


      </section>
      {/* Right Section */}
      <section className="hidden lg:flex justify-center h-full w-[57%]">
        <div className="relative flex justify-center w-full h-full">
          <img
            src="/img/login-bg-21.png"
            alt="material-book"
            className="lg:w-full lg:h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 w-full flex items-center justify-center">
            <img className="w-full h-full" src="/img/Attributioncard.png" />
            <div className="absolute w-full h-full flex justify-center items-center text-white leading-9 text-xs bg-cover bg-no-repeat text-center">
              با پیوستن به فروشگاه نیکراد می‌توانید مستقیماَ از فروشندگان خرید
              کنید یا به عنوان  فروشنده محصولات خود را عرضه کنید.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}