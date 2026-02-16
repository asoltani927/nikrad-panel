'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AddToPurchaseCardButtonProps {
    product: { slug: string };
}

export function AddToPurchaseCardButton({ product }: AddToPurchaseCardButtonProps) {
    const handleAddingToPurchaseCart = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent navigation if needed
        console.log(product);
        // TODO: add product to cart logic
        
    }

    return (
        <Button size={'sm'} asChild className="flex items-center gap-2 rounded-[3px] bg-brand-primary hover:bg-[#e7bd35] text-[#1C1D1F] text-xs font-medium">
            <Link href="#" onClick={handleAddingToPurchaseCart}>
                <span className="hidden lg:block">افزودن به سبد خرید</span>
                <span className="block lg:hidden">خرید</span>
            </Link>
        </Button>
    );
}
