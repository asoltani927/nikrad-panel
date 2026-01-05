import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export function SellerToolbar() {
    return (
        <div className=" lg:pe-14 w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-[17px] mb-7">
            <div className=" w-full lg:w-2/3 grid grid-cols-2  gap-[17px]  mt-5 lg:mt-0">
                <Badge className=" w-full bg-blue-50 text-[#1C1D1F] h-24  lg:h-10 rounded-md text-base lg:text-xs flex justify-center lg:justify-start  ">
                    <span className="px-10 lg:px-0 text-center lg:text-start text-wrap">
                        در انتظار تایید حساب
                    </span>
                </Badge>
                <Badge className="w-full bg-[#ECFDF3] text-[#1C1D1F] h-24  lg:h-10 rounded-md text-base lg:text-xs  flex flex-col lg:flex-row justify-center lg:justify-start  ">
                    <span className="px-10 lg:px-0 text-center lg:text-start text-wrap">
                        233
                    </span>
                    <span className="px-10 lg:px-0 text-center lg:text-start text-wrap">
                        معامله موفق
                    </span>
                </Badge>
            </div>
            <Button className=" w-full lg:w-1/3 bg-white  lg:bg-brand-primary h-12 lg:h-10 text-yellow-600 lg:text-gray-900  border lg:border-none border-yellow-500 rounded-sm lg:text-xs hover:bg-yellow-500 cursor-pointer ">مشاهده تمام محصولات</Button>
            <Button
                className="w-full block lg:hidden mt-6 items-center gap-2 px-7! h-12 lg:h-7 rounded-[3px] bg-yellow-500  lg:bg-white text-white  border border-yellow-500 cursor-pointer lg:text-[11px] font-normal">
                درخواست مشاوره
            </Button>
        </div>
    );
}