import Image from "next/image";
import { FavoriteType } from "./typings/favorite.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingCart, Store, Trash2 } from "lucide-react";
import { generateProductLink } from "@/utils/generate-product-link.util";


export function FavoriteCard({ favoriteItem }: { favoriteItem: FavoriteType }) {

    return (
        <div className="border rounded-lg p-4 text-sm hover:shadow-xs ">
            <Link href={generateProductLink({ id: favoriteItem.id.toString(), slug: favoriteItem.slug })} className="flex justify-between" >
                <div className="flex flex-col justify-between ">
                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-gray-800"> {favoriteItem.name}</span>
                        <span className="text-xs text-gray-700">{favoriteItem.price} تومان</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-700 text-xs">
                        <Store className="size-3.5" />
                        فروشگاه نیکراد</div>
                </div>

                <div className="w-16 h-16 lg:w-24 lg:h-24 relative">
                    <Image
                        src={favoriteItem.image} alt={favoriteItem.name}
                        fill
                        className="object-contain"
                    />
                </div>
            </Link>
            <div className="grid grid-cols-2 justify-between items-center gap-3 mt-4 rounded-sm ">

                <Button asChild variant={"outline"} className="grow px-6! h-8  rounded-sm  text-xs font-medium">
                    <Link
                        href={`/${favoriteItem.id}`}
                        className="flex items-center gap-2 "
                    >
                        <ShoppingCart className="size-3.5" />
                        افزودن به سبد خرید
                    </Link>
                </Button>

                <Button asChild variant={"outline"} className="grow  h-8  rounded-sm  text-xs font-medium">
                    <Link
                        href={`/${favoriteItem.id}`}
                        className="flex items-center gap-2 "
                    >
                        <Trash2 className="size-3.5" />
                        حذف از علاقه‌مندی‌ها
                    </Link>
                </Button>

            </div>
        </div>
    )
}