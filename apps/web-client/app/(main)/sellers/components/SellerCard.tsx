import Image from "next/image";
import { CircleCheck, Star } from "lucide-react";
import Link from "next/link";
import { sellerType } from "@/app/(main)/components/typings/seller.types";

export const SellerCard = ({ seller }: { seller: sellerType }) => {
    return (
        <Link href={`/sellers/${seller.slug}`} className="mt-10 lg:mt-12 shrink-0 relative h-80 lg:h-72 bg-[#FAFAFA] text-[#1F242F] rounded-[12px] pb-4 px-4 flex flex-col items-center justify-end gap-2  hover:shadow-sm transition-all duration-300">

            <div className="absolute -top-10 lg:-top-12 rounded-full w-[81px] h-[81px]  lg:w-[90px]  lg:h-[90px] flex items-center justify-center ">
                <Image src={seller.avatar}
                    alt={seller.name} fill />
            </div>

            <div className="w-full flex justify-between items-start gap-1">
                <h3 className="font-medium text-[15px]">{seller.name}</h3>
                <CircleCheck className="size-6 fill-[#16B364] border-[#16B364]! text-white " />
            </div>

            <div className="w-full flex items-center justify-between gap-1">
                <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={i < seller.rate ? "text-[#FDB022]" : "text-[#CECFD2]"}
                            fill={i < seller.rate ? "#FDB022" : "#CECFD2"}
                        />
                    ))}
                </div>

                <div className="text-xs font-medium">{seller.rate} از 5</div>
            </div>

            <div className="w-full flex justify-start">
                <p className="text-xs font-medium text-[#61646C]">دسته بندی فعالیت</p>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
                <span className="text-xs text-[#85888E]">
                    موقعیت 
                </span>
                <div className="">{seller.city}</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
                <span className="text-xs text-[#85888E]">
                   معاملات
                </span>
                <div className="text-end">200 عدد</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
                <span className="text-xs text-[#85888E]">
                  پیشنهادها
                </span>
                <div className="text-end">3000 عدد</div>
            </div>


            <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
                <span className="text-xs text-[#85888E]">
                  عضویت از
                </span>
                <div className="text-end">1 سال قبل</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
                <span className="text-xs text-[#85888E]">
                    نوع فروشنده
                </span>
                <div className="">حقوقی</div>
            </div>


        </Link>
    );
};
