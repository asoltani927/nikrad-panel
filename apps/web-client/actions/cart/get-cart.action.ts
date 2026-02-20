'use server'

import { backendRequest } from "@/clients/backend";
import { Cart } from "@/types/cart.type";

export async function getCart(): Promise<Cart | null> {
  try {
    const data = await backendRequest<{
      cart?: Cart | null;
    }>({
      method: "GET",
      url: `/cart`,
    });
    return data.cart ?? null;
  } catch (err) {
    console.error("Error fetching cart:", err);
    throw err;
  }
}
