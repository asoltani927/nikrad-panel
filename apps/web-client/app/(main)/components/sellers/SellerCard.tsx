import Image from "next/image";
import { ArrowUpLeft, Star } from "lucide-react";
import { sellerType } from "../typings/seller.types";
import Link from "next/link";

export const SellerCard = ({ seller }: { seller: sellerType }) => {
    return (
        <div className="shrink-0 relative w-[210px] lg:w-[220px] h-80 lg:h-60 bg-[#F5F5F6] text-[#1F242F] rounded-[12px] pb-6 px-4 flex flex-col items-center justify-end gap-2  hover:shadow-sm transition-all duration-300">

            <div className="relative lg:absolute -top-4 lg:-top-14 rounded-full w-[81px] h-[81px]  lg:w-[100px]  lg:h-[100px] flex items-center justify-center ">
                <Image src={seller.avatar}
                    alt={seller.name} fill />
            </div>

            <div className="w-full flex flex-col items-start gap-1">
                <h3 className="font-medium text-[15px]">{seller.name}</h3>
                <p className="text-[11px] font-medium text-[#61646C]">به مدیریت {seller.owner}</p>
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

                <div className="text-[11px] font-medium">{seller.comments} نظر</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                <span className="text-[10px] text-[#85888E]">
                    تعداد محصول
                </span>
                <div className="">{seller.productsCount} عدد</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                <span className="text-[10px] text-[#85888E]">
                    محل شرکت
                </span>
                <div className="">{seller.city}</div>
            </div>

            <div className="w-full flex items-center justify-center gap-1 mt-4 ">
                {/* <div className="flex gap-2 text-gray-600 ">
                    {seller.social?.instagram &&
                        <a href={seller.social.instagram}>
                            <Image
                                src="/svg/home/linkedin.svg"
                                alt={seller.name}
                                width={15}
                                height={15}
                                className=""
                            />
                        </a>
                    }
                    {seller.social?.whatsapp && <a href={seller.social.whatsapp}>   <Image
                        src="/svg/home/telegram.svg"
                        alt={seller.name}
                        width={15}
                        height={15}
                        className=""
                    /></a>}
                    {seller.social?.telegram && <a href={`tel:${seller.social.telegram}`}>   <Image
                        src="/svg/home/whatsapp.svg"
                        alt={seller.name}
                        width={15}
                        height={15}
                        className=""
                    /></a>}
                </div> */}
                <Link
                    href={`sellers/${seller.slug}`}
                    className="flex items-center gap-1 text-[#EAAA08] text-xs font-medium text-nowrap transition"
                >
                    ورود به فروشگاه
                    <ArrowUpLeft size={15} />
                </Link>
            </div>

        </div>
    );
};
