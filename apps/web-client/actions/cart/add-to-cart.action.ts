"use server";

import { backendRequest } from "@/clients/backend";
import { Cart } from "@/types/cart.type";

export interface AddToCartInput {
  addressId: string | null;
  productId: string;
  quantity: number;
  sellerId: string;
  shippingId: string | null;
  variantId: string | null;
}

export async function addToCartAction(
  input: AddToCartInput,
): Promise<Cart | null> {
  try {

    // TODO: check is login or not
    const data = await backendRequest<{
      cart?: Cart | null;
    }>({
      method: "POST",
      url: `/cart`,
      data: input,
    });

    return data.cart ?? null;
  } catch (err) {
    console.error("Error adding to cart:", err);
    throw err;
  }
}
