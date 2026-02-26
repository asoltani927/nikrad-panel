"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronRight, Info } from "lucide-react";
import { userSidebarMenu } from "../components/sidebar/user.menu";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "@/providers/auth.provider";
import Link from "next/link";

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

    const { user, loading } = useAuth()

    if (loading)
        return null
    return (
        <div className="flex relative min-h-[85vh]">
            {/* Sidebar */}
            <div
                className={clsx(
                    "hidden lg:block relative border-e border-gray-200 transition-[width] duration-500 ease-in-out",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                <ChevronRight
                    onClick={() => setCollapsed(!collapsed)}
                    className={clsx(
                        "size-5 absolute top-2 end-1 z-10 cursor-pointer rounded-full p-0.5 bg-[#F2F3F6] border hover:bg-gray-200 transition-transform duration-700",
                        collapsed && "rotate-180"
                    )}
                />

                <Sidebar collapsed={collapsed} items={userSidebarMenu} />
            </div>

            {/* content */}
            <main className="flex-1 transition-all duration-300  overflow-hidden">
                <div className="mb-4">                    
                    {
                        !user?.identified && (
                            <div className="flex w-full px-6 lg:px-16 py-4 bg-yellow-200 justify-center items-center gap-6 text-center text-sm text-gray-600">
                                <Info className="size-5 fill-yellow-600" />
                                <p dir="rtl">
                                    لطفاً اعتبار سنجی شما را تأیید کنید تا بتوانید از سرویس استفاده کنید. <br />
                                    اگر شما اعتبار سنجی خود را تایید نکرده اید، می توانید آن را در{" "}
                                    <Link href="/profile/identity" className="text-blue-500">
                                        اینجا
                                    </Link>
                                    انجام دهید.
                                </p>
                            </div>
                        )
                    }
                </div>
                {children}
            </main>
        </div>
    );
}
