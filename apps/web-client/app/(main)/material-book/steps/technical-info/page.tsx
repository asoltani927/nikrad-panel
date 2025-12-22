"use client";

import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BaseContainer from "@/components/base/BaseContainer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";

export default function TechnicalInfoPage() {
    const router = useRouter();

    // ------------------ ZOD SCHEMA ------------------
    const schema = z.object({
        roof: z.string().min(1, "نوع سقف را انتخاب کنید"),
        skeleton: z.string().min(1, "نوع اسکلت را انتخاب کنید"),
        materials: z.string().min(1, "نوع مصالح را انتخاب کنید"),
        foundationType: z.string().min(1, "نوع فونداسیون را انتخاب کنید"),
        electric: z.string().min(1, "تأسیسات برقی را انتخاب کنید"),
        heating: z.string().min(1, "تأسیسات گرمایشی را انتخاب کنید"),
        cost: z.string().min(1, "هزینه را وارد کنید"),
        smart: z.string().min(1, "گزینه هوشمندسازی را انتخاب کنید")
    });

    // ------------------ FORM STATE ------------------
    const [form, setForm] = useState({
        roof: "",
        skeleton: "",
        materials: "",
        foundationType: "",
        electric: "",
        heating: "",
        cost: "",
        smart: ""
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // ------------------ SUBMIT ------------------
    const handleSubmit = () => {
        const result = schema.safeParse(form);

        if (!result.success) {
            const formatted: any = {};
            result.error.issues.forEach((i) => (formatted[i.path[0]] = i.message));
            setErrors(formatted);
            return;
        }

        router.push("/material-book/steps/documentation-design");
    };

    return (
        <BaseContainer>
            <div className="w-full flex flex-col items-center justify-start pb-24 lg:pt-16 px-6">

                {/* Stepper */}
                <div className="w-full lg:w-[45%] flex justify-center mb-12 lg:mb-16">
                    <Stepper
                        currentIndex={1}
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

                {/* Title */}
                <div className="relative flex items-center mb-11">
                    <Image
                        src="/svg/material-book/material-bg-text.svg"
                        alt="material-book"
                        width={190}
                        height={7}
                        className="absolute top-5 ms-2 object-contain"
                    />
                    <h1 className="relative z-10 text-[26px] font-medium text-gray-800">
                        مشخصات فنی و سازه
                    </h1>
                </div>

                {/* Form Fields */}
                <div className="w-full lg:w-[42%] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4 lg:mb-8">

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("roof", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع سقف" />
                            </SelectTrigger>
                            <SelectContent>
                                {["کامپوزیت", "تیرچه بلوک", "دال بتنی", "سقف سبک"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.roof}</p>
                    </div>

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("skeleton", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع اسکلت سازه" />
                            </SelectTrigger>
                            <SelectContent>
                                {["بتنی", "فولادی", "ترکیبی"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.skeleton}</p>
                    </div>

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("materials", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع مصالح ساختمانی" />
                            </SelectTrigger>
                            <SelectContent>
                                {["آجر", "بلوک سیمانی", "بلوک سبک", "تهرانچی"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.materials}</p>
                    </div>

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("foundationType", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع فونداسیون" />
                            </SelectTrigger>
                            <SelectContent>
                                {["رادیه", "نواری", "منفرد", "ترکیبی"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.foundationType}</p>
                    </div>

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("electric", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع تأسیسات برقی" />
                            </SelectTrigger>
                            <SelectContent>
                                {["معمولی", "هوشمند", "صنعتی"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.electric}</p>
                    </div>

                    <div className="custom-style-select w-full flex flex-col gap-1">
                        <Select onValueChange={(v) => handleChange("heating", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="نوع تأسیسات گرمایشی" />
                            </SelectTrigger>
                            <SelectContent>
                                {["پکیج", "موتورخانه", "اسپیلت", "گرمایش از کف"].map((o) => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px]">{errors.heating}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px] ">هزینه مدنظر برای هر متر مربع</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="number"
                            value={form.cost}
                            onChange={(e) => handleChange("cost", e.target.value)}
                            placeholder="مثلاً ۵۰۰۰۰۰"
                        />
                        <p className="h-3 text-red-500 text-[9px]">{errors.cost}</p>
                    </div>

                    <div>
                        <Label className="text-[#5B5C5F] text-[10px]">هوشمندسازی می‌خواهید؟</Label>
                        <RadioGroup
                            dir="rtl"
                            value={form.smart}
                            onValueChange={(v) => handleChange("smart", v)}
                            className="flex gap-6 mt-3"
                        >
                            <div className="flex items-center gap-2 cursor-pointer text-[#1C1D1F] text-[11px]">
                                <RadioGroupItem value="yes" />
                                بله
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer text-[#1C1D1F] text-[11px]">
                                <RadioGroupItem value="no" />
                                خیر
                            </div>
                        </RadioGroup>
                        <p className="h-3 text-red-500 text-[9px]">{errors.smart}</p>
                    </div>

                </div>

                {/* Next Button */}
                <Button
                    className="w-full lg:w-[275px] h-12 lg:h-9 lg:text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708] "
                    onClick={handleSubmit}
                >
                    مرحله بعد
                </Button>
            </div>
        </BaseContainer>
    );
}
