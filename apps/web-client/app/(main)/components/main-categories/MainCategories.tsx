"use client"

import Image from "next/image"
import Link from "next/link"
import { mainCategories } from "./mainCategories.data"
import BaseContainer from "@/components/base/BaseContainer"

export function MainCategories() {
    return (
        <section className="">
            <BaseContainer className="">
                <div className="px-8 lg:px-0 pt-8 pb-10 lg:pt-12 lg:pb-16  flex lg:justify-center gap-6 lg:gap-8 lg:items-center overflow-auto lg:overflow-hidden hiddenScrollStyle lg:bg-[url('/svg/home/Backgroundpattern.svg')] lg:bg-no-repeat lg:bg-cover ">
                    {mainCategories.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="flex flex-col items-center group text-center"
                        >
                            <div className="w-24 h-24 lg:w-[116px] lg:h-[116px] relative ">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className=" transition-transform rounded-full duration-300 group-hover:scale-101"
                                />
                            </div>

                            <h3 className="mt-3 font-medium lg:font-semibold lg:text-lg text-[#333741] group-hover:text-black">
                                {item.title}
                            </h3>
                        </Link>

                    ))}
                </div>
            </BaseContainer>
        </section>
    )
}
