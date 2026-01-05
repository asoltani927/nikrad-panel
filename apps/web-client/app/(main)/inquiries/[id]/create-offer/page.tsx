"use client";

import React, { useState } from "react";
import BaseContainer from "@/components/base/BaseContainer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { z } from "zod";

export default function CreateOffer() {

    const schema = z.object({
        requestTitle: z.string().min(1, "عنوان نیازمندی الزامی است"),
        category: z.string().min(1, "دسته بندی الزامی است"),
        requestedAmount: z.string().min(1, "مقدار مورد نظر الزامی است"),
        province: z.string().min(1, "استان را انتخاب کنید"),
        city: z.string().min(1, "شهر را انتخاب کنید"),
        proposedCost: z.string().min(1, "هزینه پیشنهادی الزامی است")
    });

    const [form, setForm] = useState({
        requestTitle: "",
        category: "",
        requestedAmount: "",
        province: "",
        city: "",
        proposedCost: ""
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

        // Submit logic
    };

    return (
        <BaseContainer>
            <div className="w-full min-h-screen flex flex-col items-center justify-start pb-16 lg:pb-56 lg:pt-16 px-6">

                <div className="relative flex items-center mb-11">
                    <Image
                        src="/svg/Vector3454114.svg"
                        alt="material-book"
                        width={300}
                        height={7}
                        className="hidden lg:block absolute top-5 ms-2 object-contain"
                    />
                    <Image
                        src="/svg/material-book/material-bg-text.svg"
                        alt="material-book"
                        width={190}
                        height={7}
                        className="block lg:hidden absolute top-5 ms-2 object-contain"
                    />
                    <h1 className="lg:w-[300px] relative text-center z-10 text-[26px] font-medium text-gray-800">
                        فرم ثبت پیشنهاد
                    </h1>
                </div>

                <div className="w-full sm:w-[275px] flex flex-col gap-x-6 gap-y-1.5 mb-4 lg:mb-8">

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">عنوان نیازمندی</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.requestTitle}
                            onChange={(e) => handleChange("requestTitle", e.target.value)}
                            type="text"
                            placeholder="عنوان درخواست را وارد کنید"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.requestTitle}</p>
                    </div>

                    <div className="custom-style-select custom-select-height w-full flex flex-col justify-end gap-1">
                        <Select onValueChange={(v) => handleChange("category", v)}>
                            <SelectTrigger>
                                <SelectValue placeholder="دسته بندی" />
                            </SelectTrigger>
                            <SelectContent>
                                {["مسکونی", "تجاری", "اداری"].map(o => (
                                    <SelectItem key={o} value={o}>{o}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.category}</p>
                    </div>

                    <div className="flex flex-col justify-end gap-1">
                        <Label className="text-[#5B5C5F] text-[10px]">مقدار مورد نظر</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.requestedAmount}
                            onChange={(e) => handleChange("requestedAmount", e.target.value)}
                            type="number"
                            placeholder="مقدار مورد نظر را وارد کنید"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.requestedAmount}</p>
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
                        <Label className="text-[#5B5C5F] text-[10px]">هزینه پیشنهادی</Label>
                        <Input
                            className="placeholder:text-[11px] h-12 lg:h-9"
                            value={form.proposedCost}
                            onChange={(e) => handleChange("proposedCost", e.target.value)}
                            type="number"
                            placeholder="هزینه پیشنهادی را وارد کنید"
                        />
                        <p className="h-3 text-red-500 text-[9px] -mt-0.5">{errors.proposedCost}</p>
                    </div>

                </div>

                <Button
                    className="w-full sm:w-[275px] h-12 lg:h-9 lg:text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708]"
                    onClick={handleSubmit}
                >
                    ثبت
                </Button>
            </div>
        </BaseContainer>
    );
}
