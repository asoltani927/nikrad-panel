import Image from "next/image";
import { MaterialCatalogItemType } from "../typings/materialCatalog.types";

export function MaterialCatalogCard({ icon, title, description }: MaterialCatalogItemType) {
    return (
        <div className="w-full lg:w-[290px] shrink-0 relative flex flex-col justify-center items-center gap-1 bg-[#FAFAFA] p-5 lg:px-6 lg:py-8 rounded-2xl">
            <div className="absolute -top-6 p-1 z-10 flex items-center justify-center bg-white border rounded-[12px] border-[#D5D7DA]">
                <Image src={icon} alt={title} width={28} height={28} />
            </div>

            <h5 className="text-nowrap font-medium text-[13.5px] lg:text-[18px]">{title}</h5>
            <p className="text-center font-light text-[#61646C] lg:leading-6 text-[10px] lg:text-[13px]">{description}</p>
        </div>
    );
}
