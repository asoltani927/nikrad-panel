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
    const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;

    return (
        <>

            {/*  Header Logic */}
            {!isHome && isMobile ? <MobileSecondaryHeader /> : <Header />}

            <main>
                {children}
            </main>
            <LayoutFooter />
        </>
    );
}
