"use client";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Search, TextAlignJustify, X } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import SidebarItem from "@/app/profile/components/sidebar/SidebarItem";
import { userSidebarMenu } from "@/app/profile/components/sidebar/user.menu";

export default function ProfileMobileDrawer() {
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        console.log("logout");
    };

    return (
        <Drawer open={open} onOpenChange={setOpen} direction="top">
            <DrawerTrigger asChild className="lg:hidden">
                <button>
                    <TextAlignJustify size={26} />
                </button>
            </DrawerTrigger>

            {/* Drawer Content */}
            <DrawerContent className="p-6 bg-white h-screen rounded-b-2xl">

                <div className="flex items-center  mb-6 gap-2 border-b pb-5">
                    <button className="me-4" onClick={() => setOpen(false)}>
                        <X size={26} />
                    </button>
                    <Link href={'/'} className="w-9 h-9 relative">
                        <Image src="/img/nikrad-logo.png" alt="logo" fill className="object-contain" />
                    </Link>
                    <Link href={'/'} className="w-[150px] h-8 relative">
                        <Image src="/svg/nikrad-label1.svg" alt="logo" fill className="object-contain" />
                    </Link>
                </div>


                <ul className="space-y-2 mt-3">
                    {userSidebarMenu.map((item) => (
                        <SidebarItem
                            key={item.id}
                            item={item}
                        />
                    ))}
                </ul>


                <nav className="flex flex-col gap-5 text-sm font-medium mb-6 mt-10 border-t pt-6">
                    <Link href="#">فروشگاه</Link>
                    <Link href={'/inquiries'}>نیازمندی‌ها</Link>
                    <Link href="/about">درباره ما</Link>
                    <Link href="#">تماس با ما</Link>
                </nav>


                <Link href={'/material-book'}>
                    <Button className="w-full h-11 mb-5 rounded-full border border-black text-[12px] font-light">
                        دفترچه متریال
                    </Button>
                </Link>

                <div className="relative mb-6">
                    <Input
                        placeholder="جستجو"
                        className="ps-10 text-sm h-11 placeholder:text-[13px]! placeholder:font-thin border-[#DADCDE] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                    />
                    <Search
                        className="absolute top-1/2 -translate-y-1/2 start-3  size-4 text-gray-500" />
                </div>

                <Separator className="mb-6" />


                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 ps-6 pe-3 hover:text-red-500 cursor-pointer mt-4 mb-2"
                >
                    <LogOut className="size-4" />
                    <span>خروج از حساب کاربری</span>
                </button>
            </DrawerContent>
        </Drawer >
    );
}
