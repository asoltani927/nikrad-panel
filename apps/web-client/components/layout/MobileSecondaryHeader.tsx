import Link from "next/link";
import BaseContainer from "../base/BaseContainer";
import { Search, User } from "lucide-react";
import MobileDrawer from "./MobileDrawer"

export default function MobileSecondaryHeader() {
    return (
        <header
            className="w-full bg-white border-b mb-8 px-[6%] lg:px-[10%] lg:sticky flex items-center justify-center top-0 z-50 lg:shadow-xs pt-6 pb-2 lg:py-3.5 text-[#1C1D1F]">
            <BaseContainer className="flex lg:items-center gap-6 lg:gap-4">
                <div className="w-full flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <MobileDrawer />
                        <Link href={'/'} className="flex text-lg items-center gap-3 text-gray-800 underline">
                            مصالح ساختمانی نیکراد
                        </Link>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <Link
                        href={'/auth/login'}
                        className=" "
                    >
                        <User color="#61646C" className="block lg:hidden   size-7" />
                    </Link>
                    <Search color="#61646C" className="block lg:hidden   size-6.5" />
                </div>
            </BaseContainer>
        </header>
    );
}
