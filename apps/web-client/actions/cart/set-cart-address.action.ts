"use server";

import { backendRequest } from "@/clients/backend";
import { Cart } from "@/types/cart.type";

export interface SetCartAddressArgs {
  addressId: string;
}

export async function setCartAddress({
  addressId,
}: SetCartAddressArgs): Promise<{ message: string } | null> {
  try {
    await backendRequest<{
      cart?: Cart | null;
    }>({
      method: "POST",
      url: `/cart/address/${addressId}`,
    });
    return { message: "Address was set successfully" };
  } catch (err) {
    console.error("Error setting address:", err);
    throw err;
  }
}
