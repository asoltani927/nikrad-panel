"use client";

import { Bell, LogOut, User } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Notifications } from "./Notifications";
import { useState } from "react";

export default function Header() {
  const [openSheet, setOpenSheet] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "سفارش جدید",
      message: "سفارش شماره ۱۲۳۴۵ ثبت شد.",
      unread: true,
    },
    {
      id: 2,
      title: "کاربر جدید",
      message: "کاربر test@example.com ثبت‌نام کرد.",
      unread: true,
    },
    {
      id: 3,
      title: "پیام پشتیبانی",
      message: "تیکت جدیدی دریافت شد.",
      unread: false,
    },
  ];

  return (
    <header className="w-full bg-white shadow px-4 py-2 flex justify-end items-center gap-4 rounded">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-gray-100 cursor-pointer"
        aria-label="Notifications"
        onClick={() => setOpenSheet(true)}
      >
        <Bell className=" text-gray-700" />
        {notifications.some((n) => n.unread) && (
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500" />
        )}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none cursor-pointer">
            <Image
              src="/account.svg"
              alt="Profile"
              width={40}
              height={34}
              className="rounded-full border hover:ring hover:ring-primary transition"
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48 ml-10">
          <DropdownMenuLabel className="text-center">
            حساب کاربری
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem
              onClick={() => console.log("Edit Profile")}
              className="cursor-pointer"
            >
              <User className="w-4 h-5 ml-2 text-gray-600" />
              ویرایش پروفایل
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={() => console.log("Logout")}
            className="cursor-pointer text-red-600 focus:text-red-600"
          >
            <LogOut className="w-4 h-5 ml-2" color="red" />
            خروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Notifications
        open={openSheet}
        onClose={() => setOpenSheet(false)}
        notifications={notifications}
      />
    </header>
  );
}
