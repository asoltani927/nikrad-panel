"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import BaseContainer from "@/components/base/BaseContainer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Stepper from "../components/Stepper";
import { useRouter } from "next/navigation";

export default function PaymentInfoPage() {
    const router = useRouter();
    const [gateway, setGateway] = useState("mellat");
    const [discount, setDiscount] = useState("");


    const cardBase =
        "flex justify-between items-center gap-8 border border-[#ECECED] p-4 px-2 rounded-sm cursor-pointer";

    const handleSubmit = () => {
        router.push("/payment/success/34kj5hkjh53kj");
    };

    return (
        <BaseContainer>
            <div className="w-full flex flex-col items-center justify-start py-16 px-6">

                {/* Stepper */}
                <div className="w-[45%] flex justify-center mb-16">
                    <Stepper
                        currentIndex={5}
                        steps={[
                            "مشخصات کلی پروژه",
                            "مشخصات فنی",
                            "طراحی مستندات",
                            "مالکیت و مدارک",
                            "انتخاب نوع دفترچه",
                            "صورت حساب"
                        ]}
                    />
                </div>

                {/* ------------------ TITLE ------------------ */}
                <div className="relative flex items-center mb-11">
                    <Image
                        src="/svg/material-book/material-bg-text.svg"
                        alt="material-book"
                        width={190}
                        height={7}
                        className="absolute top-5 ms-2 object-contain"
                    />
                    <h1 className="relative z-10 text-[26px] font-medium text-gray-800">
                        صورت‌حساب و پرداخت
                    </h1>
                </div>

                <div className="w-[73%] grid grid-cols-12 gap-4">

                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 bg-[#FAFAFA] border-[#F1F1F1] border rounded-lg py-7 px-4">

                        <div className="flex items-start justify-between">
                            <h2 className="text-[14px] font-medium text-[#2E2F39] ">انتخاب درگاه و ثبت کد تخفیف</h2>

                            <div className="w-50 custom-style-select flex flex-col justify-end gap-2">
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="انتخاب سایر روش‌های پرداخت" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["تهران", "اصفهان", "شیراز"].map(o => (
                                            <SelectItem key={o} value={o}>{o}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <RadioGroup dir="rtl" value={gateway} onValueChange={setGateway} className="w-fit flex flex-col gap-4">

                            {/* Mellat */}
                            <div
                                onClick={() => setGateway("mellat")}
                                className={
                                    cardBase +
                                    (gateway === "mellat"
                                        ? " border-[#FDE272] bg-[#FEFDF0]"
                                        : " border-[#ECECED] bg-transparent")
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/melat-img11.svg" width={20} height={20} alt="mellat" />
                                    </div>
                                    <div>
                                        <p className="font-thin text-xs text-gray-800 mb-1">بانک ملت</p>
                                        <p className="text-[9px] font-thin text-[#85888E] ">پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب</p>
                                    </div>
                                </div>

                                <RadioGroupItem value="mellat" />
                            </div>

                            {/* Saman */}
                            <div
                                onClick={() => setGateway("saman")}
                                className={
                                    cardBase +
                                    (gateway === "saman"
                                        ? " border-[#FDE272] bg-[#FEFDF0]"
                                        : " border-[#ECECED] bg-transparent")
                                }
                            >
                                <div className="flex items-center gap-4">
                                    <div className="bg-white rounded-full p-1.5 ">
                                        <Image src="/svg/material-book/saman11-img.svg" width={20} height={20} alt="saman" />
                                    </div>

                                    <div>
                                        <p className="font-thin text-xs text-gray-800 mb-1">بانک سامان</p>
                                        <p className="text-[9px] font-thin text-[#85888E] ">پرداخت آنلاین از طریق کلیه کارت‌های عضو شتاب</p>
                                    </div>
                                </div>

                                <RadioGroupItem value="saman" />
                            </div>
                        </RadioGroup>

                        <div className="w-full mb-2 flex justify-start ">
                            <Separator className="w-[75%]! bg-[#ECECED]" />
                        </div>

                        {/* ------------------ Discount Code ------------------ */}
                        <div className="">
                            <h3 className="text-[10px] font-thin mb-1 text-[#61646C] ">کد تخفیف</h3>

                            <div className="flex items-center relative w-60">
                                <Input
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)}
                                    placeholder="کد تخفیف را وارد کنید"
                                    className="pe-10 placeholder:text-xs! focus-within:border-[#FDE272]!"
                                />

                                {discount.length > 0 && (
                                    <X
                                        onClick={() => setDiscount("")}
                                        className="absolute end-12 me-1 top-2.5 h-4 w-4 text-gray-400 cursor-pointer"
                                    />
                                )}


                                <Button
                                    className="absolute cursor-pointer rounded-xs end-[3px] top-1 h-7 font-thin px-3.5 text-[10px] "
                                >
                                    ثبت
                                </Button>
                            </div>
                        </div>

                        <div className="w-full flex justify-start ">
                            <Separator className="w-[75%]! bg-[#ECECED]" />
                        </div>

                        {/* ------------------ Order Details ------------------ */}
                        <div className=" rounded-sm p-4 py-2 pt-4 bg-white flex flex-col gap-2 text-[12px] ">
                            <h3 className="ps-1.5 font-medium text-[15px] text-[#2E2F39]">توضیحات سفارش</h3>

                            <div className="px-1.5 w-full flex items-center justify-between border-t border-[#ECECED] pt-3 ">
                                <p className="text-[#85888E]">
                                    زمان ارسال سفارش
                                </p>
                                <span className="text-[#333741]"> ۱۴۰۲/۱۲/۲۳</span>
                            </div>

                            <div className="px-1.5 w-full flex items-center justify-between ">
                                <p className="text-[#85888E]">
                                    مقصد
                                </p>
                                <span className="text-[#333741]">تهران</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-fit col-span-12 lg:col-span-4 flex flex-col gap-3 bg-[#FAFAFA] border-[#F1F1F1] border rounded-lg pt-7 pb-5 px-2">

                        <div className="flex justify-between items-center px-3">
                            <h3 className="font-medium text-[15px] text-[#2E2F39]">سبد خرید</h3>
                            <Trash2 color="#EAAA08" size={16} className="cursor-pointer" />
                        </div>

                        <div className="border-t border-[#ECECED] pt-3 text-sm flex flex-col gap-2 px-3">
                            <span className="font-thin text-[13px] text-[#333741]">جزئیات پرداخت</span>

                            <p className="flex justify-between text-[12px]">
                                <span className="text-[#85888E] ">تعداد</span>
                                <span className="text-[#333741]">۳</span>
                            </p>

                            <p className="flex justify-between text-[12px]">
                                <span className="text-[#85888E] ">قیمت کالاها</span>
                                <span className="text-[#333741]">۳۴۳۴ تومان</span>
                            </p>

                            <p className="flex justify-between text-[12px]">
                                <span className="text-[#CA8504] ">تخفیف</span>
                                <span className="text-[#333741]">۳۴ تومان</span>
                            </p>

                            <p className="flex justify-between text-[12px]">
                                <span className="text-[#85888E] ">هزینه ارسال</span>
                                <span className="text-[#333741]">۳۴۳ تومان</span>
                            </p>

                            <p className="flex justify-between text-[12px] border-t border-[#ECECED] pt-2">
                                <span className="text-[#85888E] ">مبلغ قابل پرداخت</span>
                                <span className="text-[#333741]">۳۴۳ تومان</span>
                            </p>
                        </div>

                        <p className="text-[9px] font-thin  text-gray-500 leading-4 px-3">
                            <span className="text-[#CA8504]">توجه:</span>
                            کالاهای موجود در سبد شما رزرو و ثبت نشده‌اند.
                            برای ثبت سفارش مراحل بعدی را تکمیل کنید.
                        </p>

                        <Button onClick={handleSubmit} className="w-full bg-brand-primary cursor-pointer text-[11px] rounded-[3px] h-7 hover:bg-[#cc9205] text-black">
                            پرداخت
                        </Button>

                    </div>
                </div>
            </div>
        </BaseContainer>
    );
}
