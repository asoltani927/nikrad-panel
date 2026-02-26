'use client'

import BaseContainer from "@/components/base/BaseContainer";
import LayoutFooter from "@/components/layout/Footer";
import ProfileHeader from "@/components/layout/ProfileHeader";
import { useAuth } from "@/providers/auth.provider";
import { CircleCheck, User, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfileRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user, loading, isLoggedIn } = useAuth()

  const router = useRouter()

  // TODO: remove this when auth is implemented

  if (loading) {
    return null
  }

  if (!loading && !isLoggedIn) {
    router.push('/auth')
    return
  }

  return (
    <>
      <ProfileHeader />
      <div className="flex lg:hidden items-start border-b border-gray-200 mt-6 pb-4 ps-6 pe-3">
        <div className="w-5 h-5 flex items-center justify-center relative bg-yellow-600 rounded-full overflow-hidden border-white">
          <User className="absolute -bottom-0.75 size-5 text-white fill-white" />
        </div>


        <div className="flex flex-col gap-1.5 ms-3 me-2">
          {
            loading && (<>

              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
            </>)
          }
          {
            !loading && (
              <>
                <span>{user?.fullName}</span>
                <span className="text-gray-600">{user?.telephoneNumbers[0]?.value}</span>
              </>
            )
          }
        </div>

        <CircleCheck className="size-5 fill-yellow-400 text-white -mt-1" />
      </div>


      <div className="mb-8">
        {children}
      </div>
      <LayoutFooter />
    </>
  );
}
