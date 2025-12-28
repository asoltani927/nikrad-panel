"use client";
import React, { useState } from "react";
import BaseContainer from "@/components/base/BaseContainer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { booklets } from "./components/booklets.data";
import BookletCard from "./components/BookletCard";
import Stepper from "../components/Stepper";

const schema = z.object({
  selectedBooklet: z.string().min(1, "لطفاً نوع دفترچه را انتخاب کنید")
});

export default function BookletTypePage() {
  const router = useRouter();
  const [selectedBooklet, setSelectedBooklet] = useState("");
  const [error, setError] = useState("");

  const handleSelect = (titleFa: string) => {
    setSelectedBooklet(titleFa);
    setError("");
  };

  const handleSubmit = () => {
    const result = schema.safeParse({ selectedBooklet });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    router.push("/material-book/steps/payment-info");
  };

  return (
    <BaseContainer>
      <div className="w-full lg:min-h-screen flex flex-col items-center justify-start pb-24 lg:pt-16 px-6">
        <div className="w-full lg:w-[45%] flex justify-center mb-12 lg:mb-16">
          <Stepper
            currentIndex={4}
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
        <div className="relative flex items-center mb-11">
          <Image
            src="/svg/material-book/material-bg-text.svg"
            alt="material-book"
            width={190}
            height={7}
            className="absolute top-5 ms-2 object-contain"
          />
          <h1 className="relative z-10 text-[26px] font-medium text-gray-800">
            انتخاب نوع دفترچه
          </h1>
        </div>

        <div className="w-[90%] flex flex-col sm:flex-row sm:flex-wrap justify-center gap-5 mb-4">
          {booklets.map((booklet, idx) => (
            <BookletCard
              key={idx}
              booklet={booklet}
              selected={selectedBooklet === booklet.titleFa}
              onSelect={handleSelect}
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-[11px] mb-2">{error}</p>}
        <Button
          className="w-full sm:w-[275px] h-12 lg:h-9 lg:text-[11px] cursor-pointer rounded-sm bg-[#EAAA08] hover:bg-[#d8a708] mt-2"
          onClick={handleSubmit}
        >
          مرحله بعد
        </Button>
      </div>
    </BaseContainer>
  );
}
