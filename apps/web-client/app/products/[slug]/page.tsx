import { ProductGallery } from "./_components/ProductGallery";
import { Check, Heart, Share2, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb";
import BaseContainer from "@/components/base/BaseContainer";

export default function ProductDetailsPage() {
    return (
        <div className="mt-14">
            <ProductBreadcrumb />
            <BaseContainer className="w-full flex flex-col items-center mt-16">
                <div className="w-full lg:px-[202px] grid grid-cols-1 lg:grid-cols-12 gap-5">

                    <div className="col-span-7">
                        <ProductGallery />
                    </div>

                    <div className="col-span-5 flex flex-col gap-2.5">

                        <div className="flex items-center justify-between">
                            <h1 className="text-[23px] font-semibold text-[#1F242F]">
                                نام محصول
                            </h1>
                            <div className="flex items-center gap-4">
                                <button >
                                    <Share2 size={23} color="#EAAA08" />
                                </button>
                                <button >
                                    <Heart size={23} color="#EAAA08" />
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2">
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        className={i < 3 ? "text-[#FDB022]" : "text-[#CECFD2]"}
                                        fill={i < 3 ? "#FDB022" : "#CECFD2"}
                                    />
                                ))}
                            </div>

                            <span className="text-[11px] text-[#85888E]">(245 نظر)</span>
                        </div>

                        <div className="flex justify-between items-center text-sm text-[#85888E] mt-1">
                            <span>شناسه محصول</span>
                            <span className="text-gray-700">PRD-45821</span>
                        </div>

                        <p className="text-xs text-[#555] leading-6 line-clamp-3">
                            این محصول از بهترین متریال ساخته شده و مناسب استفاده در پروژه‌های
                            معماری و دکوراسیون داخلی می‌باشد.
                        </p>

                        <div className="flex justify-between items-center">
                            <span className="text-sm text-[#85888E] font-base">قیمت</span>
                            <span className="text-[20px] font-medium text-[#1F242F]">
                                12,500,000 تومان
                            </span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                            <span className="text-[#85888E] font-base">رنگ محصول</span>

                            <div className="flex items-center gap-2">

                                <div className="bg-[#94999F] rounded-[3px] w-[23px] h-[23px] "></div>
                                <div className="bg-[#C2B1A5] rounded-[3px] w-[23px] h-[23px] "></div>

                                <div className="relative w-[27.5px] h-[27px] flex items-center justify-center border-[0.3px] rounded-[3px] border-[#F1AB90]">
                                    <div className="flex items-center justify-center  absolute bg-[#F1AB90] rounded-[3px] w-[23px] h-[23px] ">
                                        <Check size={11} color="white" />
                                    </div>
                                </div>

                                <div className="bg-[#997979] rounded-[3px] w-[23px] h-[23px] "></div>
                                <div className="bg-[#050505] rounded-[3px] w-[23px] h-[23px] "></div>

                            </div>
                        </div>


                        <div className="flex justify-between items-center text-sm mt-1 mb-1.5">
                            <span className="text-[#85888E]">نام فروشنده</span>
                            <span className="font-medium text-gray-700">فروشگاه نیکراد استیل</span>
                        </div>

                        <span className="text-xs text-yellow-700">
                            3 عدد موجود در انبار
                        </span>

                        <div className="flex gap-[17px] mt-1.5">
                            <Button asChild variant={"outline"} className=" w-5/12 h-7 bg-transparent  rounded-[3px] border-yellow-500 hover:bg-[#e7bd35] text-[#CA8504] text-[11px] font-medium">
                                <Link
                                    href={'/products'}
                                    className="flex items-center gap-2 "
                                >
                                    رفتن به صفحه محصولات
                                </Link>
                            </Button>
                            <Button className="text-[11px] h-7 rounded-xs w-7/12 bg-brand-primary text-black hover:bg-[#e7bd35]">
                                افزودن به سبد خرید
                            </Button>
                        </div>

                    </div>
                </div>
            </BaseContainer>
        </div>
    );
}
