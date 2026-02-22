"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { userSidebarMenu } from "../components/sidebar/user.menu";
import Sidebar from "../components/sidebar/Sidebar";

export default function UserProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);

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
                {children}
            </main>
        </div>
    );
}
