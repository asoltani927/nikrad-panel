"use client";

import { Button } from "@/components/ui/button";
import { SellerCard } from "./SellerCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BaseContainer from "@/components/base/BaseContainer";
import Image from "next/image";
import { useSellers } from "@/app/hooks/sellers/useSellers";

export const SellerShowcase = () => {
  const {
    sellers,
    loading,
    error,
    sellersRefetch: fetchSellers,
  } = useSellers();
  return (
    <section className="relative w-full pt-24 lg:pt-40 pb-20">
      <BaseContainer className="relative flex flex-col items-center">
        {/*  Background */}
        <Image
          src="/svg/home/Vector.svg"
          alt="Nikrad_Yellow_BG"
          width={600}
          height={450}
          className="hidden lg:block absolute -top-80 -start-24 z-0"
        />

        <div className="relative z-10 w-full flex justify-start flex-col items-start px-8 lg:pe-0 lg:ps-44">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-[#333741] ">
            فروشندگان{" "}
          </h2>
          <p className="text-[#61646C] text-lg font-normal">
            در این بخش می‌توانید مستقیماً از فروشندگان خرید کنید یا به عنوان
            فروشنده محصولات خود را عرضه کنید.
          </p>
          <div className="w-full lg:w-fit flex flex-col sm:flex-row items-center gap-4 mt-6">
            <Button
              asChild
              className="w-full sm:w-fit px-5! py-5 lg:py-1.5  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-sm lg:text-xs font-medium"
            >
              <Link href={"/sellers"} className="flex items-center gap-2 ">
                مشاهده فروشندگان
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant={"outline"}
              className="w-full sm:w-fit px-8!  py-5 lg:py-1.5 bg-transparent  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] text-sm lg:text-xs font-medium"
            >
              <Link href={"#"} className="flex items-center gap-2 ">
                ثبت‌نام
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="px-8 lg:px-0 w-full lg:w-fit hiddenScrollStyle relative flex overflow-x-auto lg:grid lg:grid-cols-4 lg:overflow-visible  z-10   gap-4 mt-12 lg:mt-24 ">
          {sellers.map((item, key) => (
            <SellerCard key={key} seller={item} />
          ))}
        </div>
      </BaseContainer>

      {/*  Background */}
      <Image
        src="/svg/home/Vector.svg"
        alt="Nikrad_Yellow_BG"
        width={600}
        height={500}
        className="hidden lg:block absolute -bottom-20 end-0 z-0"
      />
    </section>
  );
};
