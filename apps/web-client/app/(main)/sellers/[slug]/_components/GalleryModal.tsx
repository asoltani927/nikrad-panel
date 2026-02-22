"use client";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

interface Props {
    images: string[];
}

export function GalleryModal({ images }: Props) {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

    return (
        <div dir="ltr" ref={emblaRef} className="overflow-hidden w-full rounded-lg">
            <div className="flex rounded-lg">
                {images.map((img, i) => (
                    <div key={i} className="relative min-w-full h-[70vh] rounded-lg">
                        <Image
                            src={img}
                            alt={`modal-${i}`}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
