"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Search, TextAlignJustify, X } from "lucide-react";
import { useState } from "react";

export default function MobileDrawer() {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="top">
            <DrawerTrigger asChild className="lg:hidden">
                <button>
                    <TextAlignJustify size={26} />
                </button>
            </DrawerTrigger>

            {/* Drawer Content */}
            <DrawerContent className="p-6 bg-white min-h-[40vh] rounded-b-2xl">

                <div className="flex items-center  mb-6 gap-2 border-b pb-5">
                    <button className="me-4" onClick={() => setOpen(false)}>
                        <X size={26} />
                    </button>
                    <div className="w-9 h-9 relative">
                        <Image src="/img/nikrad-logo.png" alt="logo" fill className="object-contain" />
                    </div>
                    <div className="w-[150px] h-8 relative">
                        <Image src="/svg/nikrad-label1.svg" alt="logo" fill className="object-contain" />
                    </div>
                </div>

                <Button className="w-full h-11 mb-5 rounded-full border border-black text-[12px] font-light">
                    دفترچه متریال
                </Button>

                <div className="relative mb-6">
                    <Input
                        placeholder="جستجو"
                        className="ps-10 text-sm h-11 placeholder:text-[13px]! placeholder:font-thin border-[#DADCDE] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    />
                    <Search
                        className="absolute top-1/2 -translate-y-1/2 start-3  size-4 text-gray-500" />
                </div>

                <nav className="flex flex-col gap-5 text-sm font-medium">
                    <Link href="#">فروشگاه</Link>
                    <Link href="#">نیازمندی‌ها</Link>
                    <Link href="#">درباره ما</Link>
                    <Link href="#">تماس با ما</Link>
                </nav>

                <Button className="w-full mt-10 h-12 bg-[#FAC515] text-black rounded-sm">
                    ورود / ثبت نام
                </Button>
            </DrawerContent>
        </Drawer>
    );
}
