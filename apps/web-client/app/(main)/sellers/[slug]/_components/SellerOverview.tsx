"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Heart, MapPin, Share2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";


export function SellerOverview() {
    const [expanded, setExpanded] = useState(false);

    const text = `
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
`;


    return (
        <>
            <div className="flex flex-col lg:bg-[#FAFAFA] px-4 lg:px-2.5 pt-5 lg:border border-gray-100 pb-4 rounded-lg mt-4 lg:mt-0">
                <div className="flex items-center justify-between px-2.5">
                    <h1 className=" text-[23px] lg:text-[20px] font-medium text-gray-700 ">
                        درباره فروشگاه
                    </h1>
                    <div className="flex items-center gap-2">
                        <button className="cursor-pointer">
                            <Share2 className="size-6 lg:size-4" color="#EAAA08" />
                        </button>
                        <button className="cursor-pointer">
                            <Heart className="size-6 lg:size-4" color="#EAAA08" />
                        </button>
                    </div>
                </div>
                <Separator className="h-[0.5px]! mt-2 lg:mt-1.5 mb-4 lg:mb-6 bg-gray-200" />
                <div className="flex flex-col gap-4 px-2.5">
                    <p
                        className={`text-gray-500 text-justify lg:text-[13px] leading-6 ${expanded ? "" : "line-clamp-6"
                            }`}
                    >
                        {text}
                    </p>

                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="flex items-center gap-2 text-[13px] text-yellow-600 cursor-pointer underline"
                    >
                        {expanded ? "نمایش کمتر" : "توضیحات بیشتر"}
                        {expanded ? (
                            <ChevronUp size={18} className="text-yellow-500" />
                        ) : (
                            <ChevronDown size={18} className="text-yellow-500" />
                        )}
                    </button>
                </div>
                <Separator className="h-[0.5px]! my-3 bg-gray-200" />
                <div className="flex justify-between items-center text-base lg:text-[11.5px] font-normal text-gray-400 mt-1 px-2.5 mb-3">
                    <span>روزهای فعالیت</span>
                    <span className="text-gray-700">شنبه تا چهارشنبه</span>
                </div>
                <div className="flex justify-between items-center text-base lg:text-[11.5px] font-normal text-gray-400 mt-1 px-2.5 mb-3">
                    <span>ساعت‌های فعالیت</span>
                    <span className="text-gray-700">8 تا 22</span>
                </div>
                <div className="flex justify-between items-center text-base lg:text-[11.5px] font-normal text-gray-400 mt-1 px-2.5 mb-3">
                    <span>ساعت‌های پاسخگویی</span>
                    <span className="text-gray-700">8 تا 22</span>
                </div>
                <div className="flex justify-between items-center text-base lg:text-[11.5px] font-normal text-gray-400 mt-1 px-2.5">
                    <span>شبکه‌های اجتماعی</span>
                    <div className="flex gap-2 text-gray-600 ">
                        <a href={'#'}>
                            <Image
                                src="/svg/sellers/linkedin-gray.svg"
                                alt="linkedin"
                                width={15}
                                height={15}
                                className=""
                            />
                        </a>
                        <a href={'#'}>   <Image
                            src="/svg/sellers/telegram-gray.svg"
                            alt="telegram"
                            width={15}
                            height={15}
                            className=""
                        /></a>
                        <a href={'#'}>   <Image
                            src="/svg/sellers/whatsapp-gray.svg"
                            alt="whatsapp"
                            width={15}
                            height={15}
                            className=""
                        /></a>
                    </div>
                </div>
                <Button className="mt-3 text-sm lg:text-[11px] h-10 lg:h-8 rounded-[3px]  col-span-6 lg:col-span-7 bg-brand-primary text-black hover:bg-[#e7bd35] cursor-pointer">
                    لوکیشن گوگل مپ
                    <MapPin size={14} />
                </Button>
            </div>
        </>
    );
}
