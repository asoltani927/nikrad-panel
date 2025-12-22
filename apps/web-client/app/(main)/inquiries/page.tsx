"use client"

import BaseContainer from "@/components/base/BaseContainer";
import { InquiriesBreadcrumb } from "./components/InquiriesBreadcrumb";
import { InquiriesTitle } from "./components/InquiriesTitle";
import { InquiriesFilters } from "./components/InquiriesFilters";
import { Button } from "@/components/ui/button";
import { InquiriesPagination } from "./components/InquiriesPagination";
import { InquiriesToolbar } from "./components/InquiriesToolbar";
import { InquiriesList } from "./components/InquiriesList";
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ProductsPage() {

  const router = useRouter()
  const isLoggedIn = false

  const handleStart = () => {
    if (isLoggedIn) {
      router.push("/inquiries/create-inquiry")
    } else {
      router.push(`/auth-redirect/phone?redirect=/inquiries/create-inquiry`)
    }
  }


  return (
    <div className="w-full bg-white  font-sans dark:bg-black">

      <div className="hidden lg:block relative w-full  h-auto ">
        <img
          src="/img/needs-bg.png"
          alt="img"
          className="block w-full  h-auto "
        />

        <div className="w-full absolute bottom-13 ">
          <BaseContainer className="w-full lg:px-[202px]  flex justify-end  " >
            <Button onClick={handleStart} className="cursor-pointer flex items-center gap-2  w-fit px-8! lg:px-[23px]! h-7  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-sm lg:text-[11px] font-medium">
              ثبت نیازمندی جدید
            </Button>
          </BaseContainer>
        </div>
      </div>

      <InquiriesBreadcrumb />

      <InquiriesTitle />

      <BaseContainer className="w-full flex flex-col items-center mt-0 lg:mt-8">
        <div className="w-full px-4 lg:px-[202px] lg:grid grid-cols-4 gap-4">
          <div className=" hidden lg:block col-span-1">
            <InquiriesFilters />
          </div>
          <div className="col-span-3">
            <InquiriesToolbar />
            <InquiriesList />
          </div>
        </div>
        <div className="w-full px-4 lg:px-[202px] ">
          <InquiriesPagination />
        </div>
      </BaseContainer>

    </div>
  );
}
