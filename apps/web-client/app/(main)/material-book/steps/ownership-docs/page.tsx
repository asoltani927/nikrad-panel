"use client";

import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BaseContainer from "@/components/base/BaseContainer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import CircularStepProgress from "../components/CircularStepProgress";

// ------------------ ZOD SCHEMA ------------------
const schema = z.object({
    projectName: z.string().min(1, "نام پروژه الزامی است"),
    area: z.string().min(1, "متراژ عرصه الزامی است"),
    province: z.string().min(1, "استان را انتخاب کنید"),
    foundation: z.string().min(1, "متراژ زیربنا الزامی است"),
    city: z.string().min(1, "شهر را انتخاب کنید"),
    floors: z.string().min(1, "تعداد طبقات الزامی است"),
    units: z.string().min(1, "تعداد واحدها الزامی است"),
    usage: z.string().min(1, "کاربری ساختمان را انتخاب کنید"),
    startYear: z.string().min(1, "سال شروع پروژه الزامی است"),
    status: z.string().min(1, "وضعیت پروژه را انتخاب کنید")
});

export default function OwnershipDocsPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        projectName: "",
        area: "",
        province: "",
        foundation: "",
        city: "",
        floors: "",
        units: "",
        usage: "",
        startYear: "",
        status: ""
    });

    const [errors, setErrors] = useState<any>({});

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = () => {
        const result = schema.safeParse(form);

        if (!result.success) {
            const formatted: any = {};
            result.error.issues.forEach((i) => (formatted[i.path[0]] = i.message));
            setErrors(formatted);
            return;
        }

        router.push("/material-book/steps/booklet-type");
    };

    return (
        <BaseContainer>
            <div className="w-full lg:min-h-screen flex flex-col items-center justify-start pb-24 lg:pt-16 px-6">

                {/* Stepper */}
                <div className="w-full lg:w-[45%] hidden lg:flex justify-center mb-12 lg:mb-16">
                    <Stepper
                        currentIndex={3}
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

                <CircularStepProgress
                    currentIndex={3}
                    steps={[
                        "مشخصات کلی پروژه",
                        "مشخصات فنی",
                        "طراحی مستندات",
                        "مالکیت و مدارک",
                        "انتخاب نوع دفترچه",
                        "صورت حساب"
                    ]}
                />

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
                        مالکیت و مدارک
                    </h1>
                </div>

                {/* Form Fields */}
                <div className="w-full lg:w-[42%] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 mb-4 lg:mb-8">

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">نام پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.projectName}
                            onChange={(e) => handleChange("projectName", e.target.value)}
                            type="text"
                            placeholder="نام پروژه را وارد کنید"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.projectName}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ عرصه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.area}
                            onChange={(e) => handleChange("area", e.target.value)}
                            type="number"
                            placeholder="مثلاً 200"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.area}</p>
                    </div>

                    <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                        <Select onValueChange={(v) => handleChange("province", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="استان" />
                            </SelectTrigger>
                            <SelectContent>
                                {["تهران", "اصفهان", "شیراز"].map(o => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.province}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ زیربنا</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.foundation}
                            onChange={(e) => handleChange("foundation", e.target.value)}
                            type="number"
                            placeholder="مثلاً 150"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.foundation}</p>
                    </div>

                    <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                        <Select onValueChange={(v) => handleChange("city", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="شهر" />
                            </SelectTrigger>
                            <SelectContent>
                                {["تهران", "اصفهان", "شیراز"].map(o => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.city}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد طبقات پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.floors}
                            onChange={(e) => handleChange("floors", e.target.value)}
                            type="number"
                            placeholder="مثلاً 3"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.floors}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد واحدها</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.units}
                            onChange={(e) => handleChange("units", e.target.value)}
                            type="number"
                            placeholder="مثلاً 6"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.units}</p>
                    </div>

                    <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                        <Select onValueChange={(v) => handleChange("usage", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="کاربری ساختمان" />
                            </SelectTrigger>
                            <SelectContent>
                                {["مسکونی", "تجاری", "اداری"].map(o => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.usage}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">سال شروع پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.startYear}
                            onChange={(e) => handleChange("startYear", e.target.value)}
                            type="number"
                            placeholder="مثلاً 1401"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.startYear}</p>
                    </div>

                    <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                        <Select onValueChange={(v) => handleChange("status", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="وضعیت فعلی پروژه" />
                            </SelectTrigger>
                            <SelectContent>
                                {["در حال ساخت", "تکمیل شده", "نیمه‌کاره"].map(o => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.status}</p>
                    </div>

                </div>

                {/* Next Button */}
                <Button
                    className="w-full sm:w-[275px] h-12 lg:h-9 lg:text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708] "
                    onClick={handleSubmit}
                >
                    مرحله بعد
                </Button>
            </div>
        </BaseContainer>
    );
}
