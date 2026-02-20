"use server";

import { backendRequest } from "@/clients/backend";
import { Cart } from "@/types/cart.type";

export interface UpdateItemCartArgs {
  id: string;
  addressId?: string | null;
  quantity?: number;
  shippingId?: string | null;
}

export async function updateItemCart({
  id,
  addressId,
  quantity,
  shippingId,
}: UpdateItemCartArgs): Promise<{ message: string } | null> {
  try {
    await backendRequest<{
      cart?: Cart | null;
    }>({
      method: "PATCH",
      url: `/cart/item/${id}`,
      data: {
        addressId,
        quantity,
        shippingId,
      },
    });
    return { message: "Item updated successfully" };
  } catch (err) {
    console.error("Error updating cart item:", err);
    throw err;
  }
}
