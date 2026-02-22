import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";


export function ProductsToolbar() {
    return (
        <div className=" w-full flex flex-row-reverse lg:flex-row items-center justify-end gap-4 mb-7">

            <div className="w-1/3 relative">
                <Input
                    placeholder="جستجو"
                    className=" w-full h-9 placeholder:text-[11px]! placeholder:font-thin text-[11px]!  ps-9 border-[#CECFD2] focus-within:outline-0 rounded-full  focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none"
                />
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 text-zinc-500 size-3.5" />
            </div>

            <div className="custom-style-select w-1/2 lg:w-48! ">
                <Select>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="مرتب‌سازی" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-xs" value="popular">پربازدیدترین</SelectItem>
                        <SelectItem className="text-xs" value="newest">جدیدترین</SelectItem>
                        <SelectItem className="text-xs" value="expensive">گران‌ترین</SelectItem>
                        <SelectItem className="text-xs" value="cheapest">ارزان‌ترین</SelectItem>
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
}