import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Product } from "@/types";
import { generateProductLink } from "@/utils/generate-product-link.util";
import { AddToPurchaseCardButton } from "./AddToPurchaseCardButton";
import { generateSellerLink } from "@/utils/generate-seller-link.util";

export const ProductCard = ({
  product,
}: {
  product: Product;
}) => {
  return (
    <div
      dir="rtl"
      className="  bg-[#FAFAFA] text-[#333741] border rounded-[12px]  p-2 flex flex-col gap-2 hover:shadow transition-all"
    >
      <div className="lg:w-[190px] lg:h-[190px] rounded-md bg-white ">
        <Image
          src={product.thumbnail.url ?? "/placeholder.png"}
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

      <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
        <span className="text-xs text-[#85888E]">شناسه</span>
        <div className="">{product.code} </div>
      </div>

      <div className="w-full flex items-center justify-between gap-1 text-xs font-medium">
        <span className="text-xs text-[#85888E]">قیمت</span>
        <div className="">{product.price} تومان</div>
      </div>

      <div className="w-full flex items-center justify-between gap-1 text-xs font-thin">
        <span className=" text-[#CA8504]">
          {0 ? 0 + " " + "عدد موجود  " : "ناموجود"}
        </span>
      </div>

      <div className="w-full flex items-center justify-between gap-1 text-xs font-thin border-t pt-3">
        <span className=" text-[#85888E]">فروشنده</span>
        <div className="">
          <Link
            href={generateSellerLink(product.sellers[0].seller)}
            className="text-[#CA8504]"
            target="_blank"
          >
            {product?.sellers[0]?.seller.name.substring(0, 15)}...
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 mt-">
        <Button
          asChild
          className="lg:grow lg:px-4! h-8  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-xs font-medium"
        >
          <AddToPurchaseCardButton
            product={product}
          />
        </Button>

        <Button
          asChild
          variant={"outline"}
          className="px-2 lg:px-auto lg:grow  h-8 bg-transparent  rounded-[3px] border-[#EAAA08] hover:bg-[#e7bd35] text-[#CA8504] text-xs font-medium"
        >
          <Link
            href={generateProductLink(product)}
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
