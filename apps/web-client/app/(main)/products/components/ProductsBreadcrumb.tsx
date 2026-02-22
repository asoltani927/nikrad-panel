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

export function ProductsBreadcrumb() {
    return (
        <div className="h-fit w-full flex justify-center bg-[#F5F5F6] py-3">
            <BaseContainer className="w-full">
                <Breadcrumb className="px-4 sm:px-10 lg:px-14 ">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/" className="lg:text-base font-normal! underline ">صفحه اصلی</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                            <ChevronLeft className="size-4.5!" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbPage className="lg:text-base font-medium">محصولات</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </BaseContainer>
        </div>
    )
}
