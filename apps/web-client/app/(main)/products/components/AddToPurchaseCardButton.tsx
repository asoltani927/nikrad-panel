'use client';

import { addToCartAction, AddToCartInput } from "@/actions/cart/add-to-cart.action";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";

interface AddToPurchaseCardButtonProps {
    product: { slug: string, id: string, sellers: { seller: { id: string } }[] } // TODO: define product type properly;
}

export function AddToPurchaseCardButton({ product }: AddToPurchaseCardButtonProps) {

    const { mutateAsync } = useMutation<unknown, unknown, AddToCartInput>({
        mutationKey: ["addToCart", product.slug],
        mutationFn: async (variables) => {
            return await addToCartAction({
                ...variables,
            });
        },
        onSuccess: (data) => {
            console.log("Product added to cart successfully:", data);
        },
        onError: (error) => {
            console.error("Error adding product to cart:", error);
        }
    })

    const handleAddingToPurchaseCart = async (e: React.MouseEvent) => {
        e.preventDefault(); // prevent navigation if needed
        console.log(product);
        await mutateAsync({
            productId: product.id,
            quantity: 1,
            sellerId: product.sellers[0].seller.id,
            addressId: null,
            shippingId: null,
            variantId: null,
        })
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
