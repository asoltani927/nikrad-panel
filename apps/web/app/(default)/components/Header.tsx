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

export default function Header() {
  return (
    <header className="w-full bg-white shadow px-4 py-2 flex justify-end items-center gap-4 rounded">
      <Button
        variant="ghost"
        size="icon"
        className="relative hover:bg-gray-100"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5 text-gray-700" />
        <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="focus:outline-none">
            <Image
              src="/images/avatar.jpg"
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
    </header>
  );
}
