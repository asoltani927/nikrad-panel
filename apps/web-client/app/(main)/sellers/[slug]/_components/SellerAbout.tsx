"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";


export function SellerAbout() {
    const [expanded, setExpanded] = useState(false);

    const text = `
لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
`;

    return (
        <>
            <div className="flex flex-col lg:bg-[#FAFAFA] px-4 lg:px-2.5 pt-5 lg:border border-gray-100 pb-4 rounded-lg mt-14 lg:mt-4">
                <div className="flex items-center justify-between ps-2.5 pe-1">
                    <h1 className=" text-[23px] lg:text-[20px] font-medium text-gray-700 ">
                        درباره فروشنده
                    </h1>
                    <div className="relative rounded-full w-[81px] h-[81px]  lg:w-[60px]  lg:h-[60px] flex items-center justify-center ">
                        <Image src="/svg/home/Avatar.svg"
                            alt="avatar" fill />
                    </div>
                </div>
                <Separator className="h-[0.5px]! mt-1.5 mb-6 bg-gray-200" />
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

            </div>
        </>
    );
}
