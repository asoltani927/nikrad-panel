"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft } from "lucide-react";
import { GalleryModal } from "./GalleryModal";
import { Button } from "@/components/ui/button";

interface Props {
    images: string[];
}

export function SellerGallery({ images }: Props) {
    const [open, setOpen] = useState(false);

    const preview = images.slice(0, 8);
    const remaining = images.length - 8;

    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-0 mb-4 pe-4 lg:pe-14 mt-9">
                <span className="font-medium text-[23px] lg:text-lg ps-6 lg:ps-0">گالری تصاویر</span>
                {/* Desktop See All */}
                <div onClick={() => setOpen(true)} className="hidden lg:flex justify-end  ">
                    <Button className="bg-transparent hover:bg-gray-50 border h-12 lg:h-9 px-5! lg:px-6 text-gray-800 lg:text-xs flex items-center gap-1.5 border-gray-300 rounded-xs cursor-pointer">
                        مشاهده همه
                        <ArrowLeft color="#85888E" className="size-6 lg:size-4" />
                    </Button>
                </div>
            </div>

            {/* Mobile Images  */}
            <div className="w-full pe-6 flex lg:hidden overflow-x-auto hiddenScrollStyle gap-3">
                {preview.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative min-w-[175px] h-[322px] rounded overflow-hidden cursor-pointer"
                        onClick={() => setOpen(true)}
                    >
                        <Image
                            src={img}
                            alt={`gallery-mobile-${idx}`}
                            fill
                            className="object-cover rounded-md"
                        />

                        {idx === preview.length - 1 && remaining > 0 && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-2xl font-bold rounded-md">
                                +{remaining}
                            </div>
                        )}
                    </div>
                ))}
            </div>


            {/* Desktop Gallery  */}
            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-2 w-full pe-4 lg:pe-14">
                {/* column 1  */}
                {preview[0] && (
                    <div
                        className="relative h-64 lg:h-full rounded-md overflow-hidden "
                    >
                        <Image src={preview[0]} alt="gallery-0" fill className="object-cover rounded-md" />
                    </div>
                )}

                {/* column 2  */}
                <div className="grid grid-rows-2 gap-2">
                    {preview[1] && (
                        <div
                            className="relative h-32 rounded-md overflow-hidden "
                        >
                            <Image src={preview[1]} alt="gallery-1" fill className="object-cover rounded-md" />
                        </div>
                    )}
                    {preview[2] && (
                        <div
                            className="relative h-32 rounded-md overflow-hidden "
                        >
                            <Image src={preview[2]} alt="gallery-2" fill className="object-cover rounded-md" />
                        </div>
                    )}
                </div>

                {/* column 3  */}
                {preview[3] && (
                    <div
                        className="relative h-64 lg:h-full rounded-md overflow-hidden "
                    >
                        <Image src={preview[3]} alt="gallery-3" fill className="object-cover rounded-md" />
                    </div>
                )}

                {/* column 4  */}
                <div className="grid grid-rows-2 gap-2">
                    {preview[4] && (
                        <div
                            className="relative h-32 rounded-md overflow-hidden cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            <Image src={preview[4]} alt="gallery-4" fill className="object-cover rounded-md" />
                            {remaining > 0 && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-3xl font-bold rounded-md">
                                    {remaining}+
                                </div>
                            )}
                        </div>
                    )}
                    {preview[5] && (
                        <div
                            className="relative h-32 rounded-md overflow-hidden"
                        >
                            <Image src={preview[5]} alt="gallery-5" fill className="object-cover rounded-md" />
                        </div>
                    )}
                </div>
            </div>

            {/* Desktop See All */}
            <div onClick={() => setOpen(true)} className="flex lg:hidden justify-end px-6 mt-4 ">
                <Button className="w-full bg-transparent hover:bg-yellow-600 border h-12 lg:h-9 px-5! lg:px-6 text-yellow-600 lg:text-xs flex items-center gap-1.5 border-yellow-500 rounded-xs cursor-pointer">
                    مشاهده همه
                </Button>
            </div>

            {/* MODAL */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="p-0 bg-black max-w-[90vw]">
                    <GalleryModal images={images} />
                </DialogContent>
            </Dialog>
        </>
    );
}
