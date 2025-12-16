import BaseContainer from "@/components/base/BaseContainer";
import Image from "next/image";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { materialCatalogItems } from "./materialCatalog.data";

export function MaterialCatalog() {

    const leftItems = materialCatalogItems.filter(i => i.side === "left");
    const rightItems = materialCatalogItems.filter(i => i.side === "right");

    return (
        <section className="w-full flex items-center justify-center px-4 mt-8">
            <BaseContainer className="relative w-full flex flex-col lg:flex-row items-center justify-center">

                {/* Yellow Background */}
                <Image
                    src="/svg/home/yellow-bg.svg"
                    alt="Nikrad_Yellow_BG"
                    width={700}
                    height={580}
                    className="hidden lg:block absolute z-0"
                />

                {/* Left Cards */}
                <div className="grid grid-cols-2 lg:flex flex-col gap-y-10 gap-4 lg:gap-y-12 lg:gap-12 mt-96 lg:mt-0">
                    {leftItems.map(item => (
                        <MaterialCatalogCard key={item.id} {...item} />
                    ))}
                </div>

                {/*  Center Section */}
                <div className="absolute top-0 lg:relative lg:top-auto flex flex-col gap-6 items-center justify-center me-7 lg:ms-20 lg:-mt-8">
                    <h3 className="font-black text-[32px] lg:text-[40px] text-black z-10">
                        دفترچه متریال
                    </h3>

                    <div className="w-56 h-64 lg:w-[360px] lg:h-[400px] relative z-20">
                        <Image
                            src="/svg/home/svg-mobile3434.svg"
                            alt="Nikrad_Logo"
                            fill
                        />
                    </div>

                </div>

                {/*  Right Cards */}
                <div className="grid grid-cols-2 lg:flex flex-col gap-y-10 gap-4 lg:gap-y-12 lg:gap-12 mt-10 lg:mt-0">
                    {rightItems.map(item => (
                        <MaterialCatalogCard key={item.id} {...item} />
                    ))}
                </div>

            </BaseContainer>
        </section>
    );
}
