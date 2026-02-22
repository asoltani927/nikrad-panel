import { backendRequest } from "@/clients/backend";
import { ShopsResponse } from "@/types";

export async function getShops(): Promise<ShopsResponse> {
  try {
    const data = await backendRequest<ShopsResponse>({
      method: "GET",
      url: "/shops/owner",
    });

    return data;
  } catch (err) {
    console.error("Error fetching shops:", err);
    throw err;
  }
}
