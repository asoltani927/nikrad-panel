"use server";

import { backendRequest } from "@/clients/backend";
import { Cart } from "@/types/cart.type";

export interface RemoveItemFromCartArgs {
  id: string;
}

export async function removeItemFromCart({
  id,
}: RemoveItemFromCartArgs): Promise<{ message: string } | null> {
  try {
    await backendRequest<{
      cart?: Cart | null;
    }>({
      method: "DELETE",
      url: `/cart/${id}`,
    });
    return { message: "Item removed successfully" };
  } catch (err) {
    console.error("Error removing item from cart:", err);
    throw err;
  }
}
