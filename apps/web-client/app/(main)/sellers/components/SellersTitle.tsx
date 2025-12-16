
"use client";

import BaseContainer from "@/components/base/BaseContainer"
import Image from "next/image"
import { useState } from "react";
import MobileFiltersDialog from "./MobileFiltersDialog";

export function SellersTitle() {
    const [filtersOpen, setFiltersOpen] = useState(false);

    return (
        <>
            <BaseContainer className="w-full flex justify-center py-3 mt-6 lg:mt-[60px] ">
                <div className="w-full px-4 lg:px-[202px] relative flex justify-start gap-2 lg:gap-6 items-center ">
                    <Image
                        src="/svg/products/Vector113(1).svg"
                        alt="products-title-bg"
                        width={160}
                        height={10}
                        className="hidden lg:block absolute -ms-4 "
                    />
                    <Image
                        src="/svg/products/Vector113(1).svg"
                        alt="products-title-bg"
                        width={80}
                        height={10}
                        className="block lg:hidden absolute -ms-2 top-2 "
                    />
                    <h1 className="relative z-10 text-lg lg:text-[30px] font-semibold text-gray-800 underline lg:no-underline">
                        فروشگاه‌ها
                    </h1>
                    <div className=" text-[#85888E] text-sm lg:text-[17px] underline lg:no-underline ">(140 فروشگاه)</div>
                    <Image
                        src="/svg/Filter.svg"
                        alt="products-title-bg"
                        width={24}
                        height={24}
                        className="block lg:hidden absolute end-4 cursor-pointer"
                        onClick={() => setFiltersOpen(true)}
                    />

                </div>
            </BaseContainer>
            <MobileFiltersDialog
                open={filtersOpen}
                onOpenChange={setFiltersOpen}
            />
        </>
    )
}
