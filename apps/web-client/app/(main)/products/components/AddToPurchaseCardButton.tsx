'use client';

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/providers/auth.provider";
import Link from "next/link";

interface AddToPurchaseCardButtonProps {
    product: { slug: string, id: string, sellers: { seller: { id: string } }[] } // TODO: define product type properly;
}

export function AddToPurchaseCardButton({ product }: AddToPurchaseCardButtonProps) {

    const { isLoggedIn, loading, } = useAuth();
    const { addToCart, isAdding } = useCart();

    const onLogInRequired = () => {
        // TODO: Implement a better way to notify the user, such as a modal or toast notification or make a modal for login and show it here instead of alert @reza
        alert("لطفاً ابتدا وارد حساب کاربری خود شوید.");
    };


    const handleAddingToPurchaseCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // prevent navigation if needed
        if (!isLoggedIn) {
            if (onLogInRequired) {
                onLogInRequired();
            }
            return;
        }
        await addToCart({
            productId: product.id,
            quantity: 1,
            sellerId: product.sellers[0].seller.id,
            addressId: null,
            shippingId: null,
            variantId: null,
        })
        // TODO: add product to cart logic

    }

    if (loading || isAdding) {
        return (
            <Button size={'sm'} disabled className="flex items-center gap-2 rounded-[3px] bg-gray-300 text-gray-500 text-xs font-medium">
                <span className="block lg:hidden">...</span>
            </Button>
        );
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
