"use client";

import React, { useState } from "react";
import Stepper from "../components/Stepper";
import BaseContainer from "@/components/base/BaseContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import CircularStepProgress from "../components/CircularStepProgress";

export default function DocumentationDesignPage() {
    const router = useRouter();

    // ------------------ ZOD SCHEMA ------------------
    const schema = z.object({
        area1: z.string().min(1, "پر کردن این فیلد الزامی است"),
        area2: z.string().min(1, "پر کردن این فیلد الزامی است"),
        built1: z.string().min(1, "پر کردن این فیلد الزامی است"),
        built2: z.string().min(1, "پر کردن این فیلد الزامی است"),
        floors1: z.string().min(1, "پر کردن این فیلد الزامی است"),
        floors2: z.string().min(1, "پر کردن این فیلد الزامی است"),
        floors3: z.string().min(1, "پر کردن این فیلد الزامی است"),
        floors4: z.string().min(1, "پر کردن این فیلد الزامی است"),
        area3: z.string().min(1, "پر کردن این فیلد الزامی است"),
        area4: z.string().min(1, "پر کردن این فیلد الزامی است"),
        built3: z.string().min(1, "پر کردن این فیلد الزامی است"),
        built4: z.string().min(1, "پر کردن این فیلد الزامی است"),
    });

    // ------------------ FORM STATES ------------------
    const [form, setForm] = useState({
        area1: "",
        area2: "",
        built1: "",
        built2: "",
        floors1: "",
        floors2: "",
        floors3: "",
        floors4: "",
        area3: "",
        area4: "",
        built3: "",
        built4: "",
    });

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [errors, setErrors] = useState<any>({});

    const handleChange = (name: string, value: string) => {
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    // ------------------ SUBMIT ------------------
    const handleSubmit = () => {
        const result = schema.safeParse(form);

        if (!result.success) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const formatted: any = {};
            result.error.issues.forEach((i) => (formatted[i.path[0]] = i.message));
            setErrors(formatted);
            return;
        }

        router.push("/material-book/steps/ownership-docs");
    };

    return (
        <BaseContainer>
            <div className="w-full lg:min-h-screen flex flex-col items-center justify-start pb-24 lg:pt-16 px-6">

                {/* Stepper */}
                <div className="w-full lg:w-[45%] hidden lg:flex justify-center mb-12 lg:mb-16">
                    <Stepper
                        currentIndex={2}
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
                    currentIndex={2}
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
                        طراحی مستندات
                    </h1>
                </div>

                {/* Form Fields */}
                <div className="w-full lg:w-[42%] grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 mb-4 lg:mb-8">

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ عرصه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.area1}
                            onChange={(e) => handleChange("area1", e.target.value)}
                            placeholder="متراژ عرصه را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.area1}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ عرصه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.area2}
                            onChange={(e) => handleChange("area2", e.target.value)}
                            placeholder="متراژ عرصه را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.area2}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ زیربنا</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.built1}
                            onChange={(e) => handleChange("built1", e.target.value)}
                            placeholder="متراژ زیربنا را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.built1}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ زیربنا</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.built2}
                            onChange={(e) => handleChange("built2", e.target.value)}
                            placeholder="متراژ زیربنا را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.built2}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد طبقات پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.floors1}
                            onChange={(e) => handleChange("floors1", e.target.value)}
                            placeholder="تعداد طبقات را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.floors1}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد طبقات پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.floors2}
                            onChange={(e) => handleChange("floors2", e.target.value)}
                            placeholder="تعداد طبقات را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.floors2}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد طبقات پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.floors3}
                            onChange={(e) => handleChange("floors3", e.target.value)}
                            placeholder="تعداد طبقات را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.floors3}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">تعداد طبقات پروژه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.floors4}
                            onChange={(e) => handleChange("floors4", e.target.value)}
                            placeholder="تعداد طبقات را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.floors4}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ عرصه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.area3}
                            onChange={(e) => handleChange("area3", e.target.value)}
                            placeholder="متراژ عرصه را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.area3}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ عرصه</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.area4}
                            onChange={(e) => handleChange("area4", e.target.value)}
                            placeholder="متراژ عرصه را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.area4}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ زیربنا</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.built3}
                            onChange={(e) => handleChange("built3", e.target.value)}
                            placeholder="متراژ زیربنا را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.built3}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">متراژ زیربنا</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            type="text"
                            value={form.built4}
                            onChange={(e) => handleChange("built4", e.target.value)}
                            placeholder="متراژ زیربنا را وارد کنید"
                        />
                        <p className="text-red-500 text-[10px]">{errors.built4}</p>
                    </div>

                </div>

                {/* Next Button */}
                <Button
                    className="w-full sm:w-[275px] h-12 lg:h-9 text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708] "
                    onClick={handleSubmit}
                >
                    مرحله بعد
                </Button>
            </div>
        </BaseContainer>
    );
}
