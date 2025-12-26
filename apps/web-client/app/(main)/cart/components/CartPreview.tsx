"use client"

import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { usePathname } from "next/navigation";
import CartPreviewItem from "./CartPreviewItem"
import { cartItems } from "./cardItems.data"

export default function CartPreview() {
    const [open, setOpen] = useState(false)
    const [sideOffset, setSideOffset] = useState(11)

    const pathname = usePathname();

    const isHome = pathname === "/";
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;


    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }

        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    useEffect(() => {
        const handleResize = () => {
            const isMobileNow = window.innerWidth < 1024

            if (isMobileNow && isHome) {
                setSideOffset(-32)
            } else {
                setSideOffset(isMobileNow ? 11 : 28.5)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [isHome])


    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    className={`fixed left-0 right-0 bottom-0 z-40 bg-black/60 cursor-pointer
                     ${isHome && isMobile
                            ? "top-20"
                            : "top-[60px] lg:top-[78px]"
                        }
    `}
                    onClick={() => setOpen(false)}
                />
            )}


            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <button className="relative z-50 cursor-pointer">
                        <ShoppingCart
                            color={cartItems.length > 0 ? '#EAAA08' : '#333741'}
                            className="size-6 lg:size-5.5 cursor-pointer"
                        />

                        {cartItems.length > 0 && (
                            <Badge color="#FF383C" className="absolute -top-[5.2px] bg-[#FF383C] -right-1.5 h-[16.5px] min-w-4 pb-[0.4px] text-[9px] rounded-full px-1 font-mono tabular-nums">
                                {cartItems.length}
                            </Badge>
                        )}
                    </button>
                </PopoverTrigger>

                <PopoverContent
                    align="start"
                    sideOffset={sideOffset}
                    className="z-50 w-screen lg:w-[470px] p-0 py-6 lg:py-4 rounded-md shadow-lg overflow-y-auto max-h-[calc(100vh-78px)] "
                >
                    <div className="h-full">

                        {/* TITLE  */}
                        <div className="w-full flex justify-between items-center px-4 mb-0.5">
                            <h4 className="lg:text-[11.5px] font-semibold">
                                سبد خرید
                            </h4>
                            <X onClick={() => setOpen(false)} className="cursor-pointer size-5 lg:size-4" />
                        </div>
                        {cartItems?.length > 0 && (
                            <span className="text-[#5B5C5F] text-xs lg:text-[10px]  px-4 ">{cartItems?.length} کالا</span>
                        )}

                        <Separator className="bg-gray-100 h-[0.2px]! mt-6 lg:mt-3 mb-6" />

                        {/* PRODUCT CARDS  */}
                        {cartItems?.length > 0 ? (
                            <div className="space-y-6 lg:space-y-[18px] divide-y ps-4 pe-1 ">
                                {cartItems.map((item) => (
                                    <CartPreviewItem key={item.id} {...item} />
                                ))}

                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-3.5 mb-4 -mt-3 ">
                                <div className="w-28 h-32 lg:w-36 lg:h-32 relative ">
                                    <Image
                                        src="/svg/bag.svg"
                                        alt="Nikrad_Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="text-gray-900 text-lg lg:text-[14.5px] font-medium mt-1 " >هنوز هیچ محصولی به سبد خرید اضافه نکرده‌اید.</div>
                                <p className="text-gray-500 font-thin text-sm lg:text-xs text-center leading-5.5 ">برای شروع، از میان متریال‌ها و تجهیزات ساختمانی موجود، اقلام <br /> مورد نیاز خود را انتخاب کنید.</p>
                            </div>
                        )}


                        {/* ACTIONS  */}
                        <div className="w-full grid grid-cols-2 items-center justify-between gap-2 lg:gap-1.5 px-6 lg:px-4 mt-6 lg:mt-1">
                            <Button onClick={() => setOpen(false)} asChild className="bg-yellow-400 hover:bg-yellow-500 text-black text-base lg:text-[11px] h-11 lg:h-7 rounded-sm">
                                <Link href={cartItems?.length > 0 ? '/cart' : '/products'} >
                                    {cartItems?.length > 0 ? ' تکمیل فرآیند خرید ' : 'فروشگاه'}
                                </Link>
                            </Button>
                            <Button onClick={() => setOpen(false)} className="cursor-pointer w-full bg-transparent hover:bg-gray-50  border text-black border-[#DADCDE] h-11 lg:h-7 text-base lg:text-[11px] rounded-sm ">
                                انصراف
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </>
    )
}
