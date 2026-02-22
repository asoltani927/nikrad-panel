"use client"

import * as React from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    DotButton,
    BarIndicator,
    type CarouselApi
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { heroCarouselItems } from "./heroCarousel.data";

export function HeroCarousel() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap())
        }

        api.on("select", onSelect)
        onSelect()

        return () => {
            api.off("select", onSelect)
        }
    }, [api])

    return (
        <section className="relative mt-4 lg:mt-0 bg-white px-8 lg:px-0">
            <Carousel setApi={setApi} opts={{ loop: true }} dir="ltr" className="w-full">
                <CarouselContent>
                    {heroCarouselItems.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative w-full flex flex-col  ">
                                {/* Main Image */}
                                <img
                                    src={item.image}
                                    alt="img"
                                    className="hidden lg:block w-full  block h-[210px] lg:h-auto"
                                />
                                <img
                                    src="/img/home/slider1.png"
                                    alt="img"
                                    className="block lg:hidden w-full  block h-[210px] sm:h-auto lg:h-auto"
                                />
                                {/* Overlay Image */}
                                <img
                                    src={item.overlay}
                                    alt="Nikrad_Logo_overlay"
                                    className="hidden lg:block absolute top-0 left-0 w-full h-auto z-10"
                                />
                                {/* Content  */}
                                <div dir="rtl" className="lg:absolute flex flex-col items-center mt-6 lg:mt-0 lg:max-w-[400px]  lg:top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 ">
                                    <h3 className="mb-2 lg:mb-4 text-center text-[#1C1D1F] lg:text-white lg:font-semibold text-lg lg:text-[30px]  ">
                                        {item.title}
                                    </h3>
                                    <p className="text-center font-light text-sm leading-7 text-[#1C1D1F] lg:text-white">
                                        {item.desc}
                                    </p>
                                    <Button className="hidden lg:block mt-4 px-7! py-1.5  rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-xs font-medium">
                                        <Link
                                            href={item.buttonLink}
                                            className="flex items-center gap-2 text-[#1C1D1F]  "
                                        >
                                            {item.buttonText}
                                        </Link>
                                    </Button>

                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex bg-transparent text-white border-2 border-white" />
                <CarouselNext className="hidden lg:flex bg-transparent text-white border-2 border-white" />

                <div className="relative w-full flex lg:hidden justify-center items-center gap-2 py-4 mt-4">

                    <CarouselPrevious className="absolute end-12 bottom-0 flex bg-transparent! shadow-none! border-none! text-[#97989B] " />
                    <CarouselNext className="absolute start-12 bottom-0 flex bg-transparent! shadow-none! border-none! text-[#97989B] " />

                    {Array.from({ length: 5 }).map((_, i) => (
                        <BarIndicator
                            key={i}
                            active={current === i}
                        />
                    ))}
                </div>
            </Carousel>
            <div className="w-full bottom-1 absolute z-20 hidden lg:flex justify-center items-center gap-2 py-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <DotButton
                        key={i}
                        active={current === i}
                    />
                ))}
            </div>

        </section>
    )
}