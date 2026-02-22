"use client";

import { useRef } from "react";
import BaseContainer from "@/components/base/BaseContainer";
import { blogs } from "./blogs.data";
import { BlogCard } from "./BlogCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function BlogsShowcase() {
    const sliderRef = useRef<HTMLDivElement>(null);

    const goRightToLeft = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft -= 300;
    };

    const goLeftToRight = () => {
        if (sliderRef.current) sliderRef.current.scrollLeft += 300;
    };

    return (
        <section className="w-full pt-32 lg:pt-40 pb-12 lg:pb-32 bg-gray-50">
            <BaseContainer className="lg:px-44">
                {/* Title + Arrows */}
                <div className="w-full flex items-center justify-start lg:justify-between mb-7 px-8 lg:px-0">

                    <div className="relative">
                        <Image
                            src="/svg/home/Vector 113.svg"
                            alt="svgVector"
                            width={290}
                            height={150}
                            className="hidden lg:block absolute top-7 -start-4 object-cover"
                        />

                        <h2 className="relative z-10 text-[40px] lg:text-[54px] font-bold text-gray-900">مطالب وبلاگ</h2>
                    </div>

                    <div className="hidden lg:flex items-center gap-3 mt-4">
                        <Button variant={"outline"}
                            onClick={goLeftToRight}
                            className="cursor-pointer  w-9 h-9 flex items-center justify-center border border-[#EAAA08] text-[#CA8504] hover:bg-[#e7bd35]  rounded-xs bg-transparent"
                        >
                            <ArrowRight size={17} />
                        </Button>

                        <Button variant={"outline"}
                            onClick={goRightToLeft}
                            className="cursor-pointer  w-9 h-9 flex items-center justify-center border border-[#EAAA08] text-[#CA8504] hover:bg-[#e7bd35]  rounded-xs bg-transparent"
                        >
                            <ArrowLeft size={17} />
                        </Button>
                    </div>
                </div>

                {/* RTL Slider */}
                <div dir="ltr" className="relative w-full">
                    <div
                        ref={sliderRef}
                        className="flex flex-row-reverse gap-5 overflow-x-auto hiddenScrollStyle scroll-smooth py-2 px-8 lg:px-0"
                    >
                        {blogs.map((blog) => (
                            <div key={blog.id}>
                                <BlogCard blog={blog} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* See All */}
                <div className="hidden lg:flex justify-end  mt-10 lg:mt-6 pe-8 lg:pe-0">
                    <Button variant={"outline"} className="border h-9 px-6! bg-transparent border-[#EAAA08] text-[#CA8504] hover:bg-[#e7bd35] text-xs flex items-center gap-1  rounded-xs cursor-pointer">
                        <Link
                            href={`#`}
                            className="flex items-center gap-2 "
                        >
                            مشاهده همه
                            <ArrowLeft size={17} />
                        </Link>

                    </Button>

                </div>
            </BaseContainer>
        </section>
    );
}
