import { Clock, Star } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReviewsPagination } from "./ReviewsPagination";
import { Button } from "@/components/ui/button";

export const SellerReviews = () => {
    return (
        <div className="flex flex-col gap-5 lg:gap-3 px-4 lg:ps-0 lg:pe-14 mt-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-1">
                <span className="font-medium text-2xl lg:text-lg">نظرات کاربران درباره این فروشگاه</span>
                <div className="w-1/2 lg:w-50 custom-style-select flex flex-col justify-end gap-2">
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="جدیدترین نظرات" />
                        </SelectTrigger>
                        <SelectContent>
                            {["قدیمی ترین", "محبوب ترین", "تست"].map(o => (
                                <SelectItem key={o} value={o}>{o}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            {Array.from({ length: 3 }, (_, index) => (
                <div
                    key={index}
                    className="flex flex-col gap-4 border border-gray-200 rounded-[12px] p-6"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-2">
                        <div className="flex  items-center justify-between lg:justify-self-auto gap-1">
                            <span className="text-[13px] text-gray-800">
                                عنوان نظر
                            </span>
                            <span className="hidden lg:block text-xs text-yellow-600">
                                نام و نام خانوادگی
                            </span>
                            <span className="block lg:hidden text-xs me-5">4.5</span>
                        </div>

                        <div className="flex items-center justify-between lg: gap-1">
                            <span className="hidden lg:block text-gray-500 text-xs me-1.5">
                                امتیاز ثبت شده توسط این کاربر:
                            </span>
                            <span className="hidden lg:block text-xs me-5">4.5</span>
                            <span className="block lg:hidden text-xs text-yellow-600">
                                نام و نام خانوادگی
                            </span>
                            <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <Star
                                        key={i}
                                        size={15}
                                        className={
                                            i < 4
                                                ? "text-[#FDB022]"
                                                : "text-[#CECFD2]"
                                        }
                                        fill={
                                            i < 4
                                                ? "#FDB022"
                                                : "#CECFD2"
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-[18px] text-justify">
                        کیفیت محصول بسیار خوب بود و بسته‌بندی مناسبی داشت.
                        کیفیت محصول بسیار خوب بود و بسته‌بندی مناسبی داشت.
                        کیفیت محصول بسیار خوب بود و بسته‌بندی مناسبی داشت.
                        کیفیت محصول بسیار خوب بود و بسته‌بندی مناسبی داشت.
                    </p>

                    <div className="flex justify-end items-center gap-1 text-gray-500 text-xs">
                        <Clock size={12} />
                        5 روز پیش
                    </div>
                </div>
            ))}
            <div className="flex justify-end lg:justify-center ">
                <Button className="w-full lg:w-32 bg-transparent hover:bg-yellow-600 border h-12 lg:h-9 px-5! lg:px-6 text-yellow-600 hover:text-white lg:text-xs flex items-center gap-1.5 border-yellow-500 rounded-xs cursor-pointer">
                    بارگذاری بیشتر
                </Button>
            </div>
        </div>
    );
};
