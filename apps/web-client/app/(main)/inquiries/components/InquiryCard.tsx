import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { inquiryType } from "./typings/inquiry.types";

export const InquiryCard = ({ inquiry }: { inquiry: inquiryType }) => {
    return (
        <div className="shrink-0 relative lg:min-w-[207px] lg:w-[207px] lg:max-w-[207px] h-80 lg:h-[223px] bg-[#FAFAFA] text-[#1F242F] rounded-[12px] pb-6 px-4 flex flex-col items-center justify-end gap-2  hover:shadow-sm transition-all duration-300">
            <Image className="absolute top-0 start-0 object-contain rounded-tr-[12px]"
                width={50}
                height={10}
                src="/svg/Rectangle382.svg"
                alt="Rectangle" />
            <div className="w-full h-full relative z-10 flex flex-col items-center gap-2 justify-end ">

                <div className="w-full flex justify-between items-start gap-1">
                    <h3 className="font-medium text-[15px]">{inquiry.title}</h3>
                </div>

                <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                    <span className="text-[10px] text-[#85888E]">
                        مقدار مورد نیاز
                    </span>
                    <div className="">{inquiry.quantity}</div>
                </div>

                <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                    <span className="text-[10px] text-[#85888E]">
                        موقعیت مکانی
                    </span>
                    <div className="">{inquiry.location.province + inquiry.location.city}</div>
                </div>

                <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                    <span className="text-[10px] text-[#85888E]">
                        اولویت
                    </span>
                    <div className="">{inquiry.priority}</div>
                </div>


                <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                    <span className="text-[10px] text-[#85888E]">
                        مهلت تحویل
                    </span>
                    <div className="">{inquiry.deliveryDeadline}</div>
                </div>

                <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                    <span className="text-[10px] text-[#85888E]">
                        تعداد پیشنهادها
                    </span>
                    <div className="">{inquiry.offersCount}</div>
                </div>

                <Button asChild className=" w-full lg:px-[23px]! h-6  rounded-[6px] bg-brand-primary hover:bg-[#e7bd35] text-black text-sm lg:text-[10px] font-medium">
                    <Link
                        href={inquiry.inquiryLink}
                        className="flex items-center gap-2 "
                    >
                        ثبت پیشنهاد
                    </Link>
                </Button>
            </div>
        </div>
    );
};
