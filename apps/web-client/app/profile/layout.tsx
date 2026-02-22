import LayoutFooter from "@/components/layout/Footer";
import ProfileHeader from "@/components/layout/ProfileHeader";
import { CircleCheck, User } from "lucide-react";

export default function ProfileRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProfileHeader />

      <div className="flex lg:hidden items-start border-b border-gray-200 mt-6 pb-4 ps-6 pe-3">
        <div className="w-5 h-5 flex items-center justify-center relative bg-yellow-600 rounded-full overflow-hidden border-white">
          <User className="absolute -bottom-0.75 size-5 text-white fill-white" />
        </div>
        <div className="flex flex-col gap-1.5 ms-3 me-2">
          <span>نام و نام خانوادگی</span>
          <span className="text-gray-600">09923244836</span>
        </div>

        <CircleCheck className="size-5 fill-yellow-400 text-white -mt-1" />
      </div>


      <div className="my-8">{children}</div>
      <LayoutFooter />
    </>
  );
}
