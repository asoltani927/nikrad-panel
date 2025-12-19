"use client";

import LayoutFooter from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import MobileSecondaryHeader from "@/components/layout/MobileSecondaryHeader";
import { usePathname } from "next/navigation";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const pathname = usePathname();

    const isHome = pathname === "/";

    return (
        <>
            {/* Desktop Header — always visible */}
            <div className="hidden lg:block">
                <Header />
            </div>

            {/* Mobile Header Logic */}
            <div className=" block lg:hidden">
                {isHome ? <Header /> : <MobileSecondaryHeader />}
            </div>

            <main>
                {children}
            </main>
            <LayoutFooter />
        </>
    );
}
