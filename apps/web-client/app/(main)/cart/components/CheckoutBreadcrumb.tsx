import Link from "next/link"
import { ChevronLeft } from "lucide-react"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import BaseContainer from "@/components/base/BaseContainer"

// TODO: This component is very similar to ProductBreadcrumb, we can create a generic breadcrumb component and reuse it in both places
// TODO: @reza 
export function CheckoutBreadcrumb() {
    return (
        <div className="h-fit w-full flex justify-center bg-[#F5F5F6] py-3">
            <BaseContainer className="w-full">
                <Breadcrumb className="px-6 lg:px-[184px] ">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="lg:text-base font-normal!  ">صفحه اصلی</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronLeft className="size-4.5!" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="lg:text-base font-medium">سبد خرید</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </BaseContainer>
        </div>
    )
}
