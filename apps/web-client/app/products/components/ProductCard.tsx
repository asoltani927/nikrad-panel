import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ProductType } from "@/app/components/typings/product.types";

export const ProductCard = ({ product }: { product: ProductType }) => {
    return (
        <div dir="rtl" className=" lg:min-w-[207px] lg:w-[207px] lg:max-w-[207px] bg-[#FAFAFA] text-[#333741] border rounded-[12px]  p-2 flex flex-col gap-2 hover:shadow transition-all">

            <div className="lg:w-[190px] lg:h-[190px] rounded-md bg-white ">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={190}
                    height={190}
                    className="rounded-md object-cover p-6"
                />
            </div>

            <div className="flex items-center gap-0.5">
                <div className="bg-[#B3B3B3] rounded-xs w-3.5 h-3.5 "></div>

                <div className="relative w-[18.5px] h-[18.8px] flex items-center justify-center border-[0.3px] rounded-xs border-[#F9D029]">
                    <div className="flex items-center justify-center  absolute bg-[#F9D029] rounded-xs w-[13px] h-[13px] ">
                        <Check size={8} />
                    </div>
                </div>

                <div className="bg-[#DAA37F] rounded-xs w-3.5 h-3.5 "></div>
            </div>

            <h3 className="font-medium text-[13px] ">{product.name}</h3>

            <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                <span className="text-[10px] text-[#85888E]">
                    شناسه محصول
                </span>
                <div className="">{product.code} </div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-[11px] font-medium">
                <span className="text-[10px] text-[#85888E]">
                    قیمت
                </span>
                <div className="">{product.price} تومان</div>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-[9px] font-thin">
                <span className=" text-[#CA8504]">
                    {product.stock ? product.stock + ' ' + 'عدد موجود در انبار' : 'ناموجود'}
                </span>
            </div>

            <div className="w-full flex items-center justify-between gap-1 text-[10px] font-thin border-t pt-3">
                <span className=" text-[#85888E]">
                    نام فروشنده
                </span>
                <div className="">فروشگاه {product.sellerName}</div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-">

                <Button asChild className="lg:grow lg:px-4! h-8  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-[11px] font-medium">
                    <Link
                        href={'#'}
                        className="flex items-center gap-2 "
                    >
                        <span className="hidden lg:block"> افزودن به سبد خرید</span>
                        <span className="block lg:hidden">خرید</span>
                    </Link>
                </Button>

                <Button asChild variant={"outline"} className="px-2 lg:px-auto lg:grow  h-8 bg-transparent  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] text-[11px] font-medium">
                    <Link
                        href={`/product/${product.id}`}
                        className="flex items-center gap-2 "
                    >
                        <span className="hidden lg:block"> جزئیات</span>
                        <span className="block lg:hidden">مشاهده جزئیات</span>
                    </Link>
                </Button>

            </div>
        </div>
    );
};
