'use client'

import CartPreview from "@/app/(main)/cart/components/CartPreview"
import { useAuth } from "@/providers/auth.provider"
import Link from "next/link"
import { User, ChevronLeft } from "lucide-react"
import { Button } from "../ui/button"

export default function UserNavigation() {
    const { isLoggedIn, loading } = useAuth();

    // 🔄 Loading State
    if (loading) {
        return (
            <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-md" />
                <div className="w-20 h-8 bg-gray-200 animate-pulse rounded-md" />
            </div>
        )
    }

    return (
        <>
            {isLoggedIn ? (
                <div className="flex items-center gap-4">
                    <CartPreview />

                    <Link
                        href="/profile"
                        className="flex items-center"
                    >
                        <User
                            color="#333741"
                            className="size-5.5 cursor-pointer"
                        />
                    </Link>
                </div>
            ) : (
                <Link href="/auth">
                    <Button variant="link" size="sm">
                        ورود / ثبت نام
                        <ChevronLeft className="hidden lg:block h-4 w-4" />
                    </Button>
                </Link>
            )}
        </>
    )
}
