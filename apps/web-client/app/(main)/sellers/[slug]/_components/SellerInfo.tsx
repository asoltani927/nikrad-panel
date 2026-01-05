"use client";

import BaseContainer from "@/components/base/BaseContainer";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";


export const SellerInfo = () => {
    return (
        <div className="bg-yellow-300 relative mb-10">
            <img
                src="/img/sellers/Group6469.png"
                alt="img"
                className=" w-full h-[150px] lg:h-auto "
            />
            <div className="absolute top-0 h-full w-full  px-[6%] lg:pe-40  lg:ps-20 pt-4 lg:pt-8  ">
                <BaseContainer className="relative w-full h-full flex flex-col justify-between">
                    <Button
                        variant={"outline"}
                        className="w-fit flex items-center gap-2 px-1! lg:px-6! h-5 lg:h-9 bg-transparent rounded-[3px] border-gray-300 hover:bg-gray-200 cursor-pointer text-gray-50 text-sm lg:text-[11.5px] font-normal">
                        <span className="hidden lg:block"> تغییر تصویر</span>
                        <Pencil className="size-2.5 lg:size-3.5 " />
                    </Button>
                    <div className="absolute -bottom-7 lg:-bottom-11 w-full flex justify-between bg-green400 mt-12">
                        <div className="flex items-center gap-4 lg:gap-8 ">
                            <div className="w-24 h-24 lg:w-[147px] lg:h-[147px] relative ">
                                <Image
                                    src="/img/sellers/Rectangle4298.png"
                                    alt="Nikrad_Logo"
                                    fill
                                    className="object-contain border-gray-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#FAFAFA] text-nowrap font-medium text-[23px] lg:text-[25px] mb-2  ">نام فروشگاه</span>
                                <span className="text-[#FAFAFA] text-nowrap text-sm lg:text-base ">صاحب فروشگاه</span>
                                <div className="text-gray-700 text-nowrap mt-4 lg:mt-6 text-[15px] font-medium "> نازک کاری | نقاشی و رنگ‌آمیزی ساختمان</div>
                            </div>
                        </div>
                        <Button
                            className="hidden lg:flex mt-6 items-center gap-2 px-7! h-8 rounded-[3px] bg-white text-yellow-600  border border-yellow-500 cursor-pointer text-sm lg:text-xs font-normal">
                            درخواست مشاوره
                        </Button>

                    </div>
                </BaseContainer>
            </div>
        </div>
    );
};
