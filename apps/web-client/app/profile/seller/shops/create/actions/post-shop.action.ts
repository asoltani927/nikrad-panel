"use server";

import { backendRequest } from "@/clients/backend";
import { Shop } from "@/types";

interface CreateShopResponse {
  success: boolean;
  message?: string;
  shop?: Shop;
}

export async function createShop(payload: Shop): Promise<CreateShopResponse> {
  try {
    const data = await backendRequest<CreateShopResponse>({
      method: "POST",
      url: "/shops",
      data: payload,
    });

    return data;
  } catch (err) {
    console.error("Error in create shop:", err);
    throw err;
  }
}
