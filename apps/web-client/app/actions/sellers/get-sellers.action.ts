import { backendRequest } from "@/clients/backend";
import { SellersResponse } from "@/types";

export async function getSellers(): Promise<SellersResponse> {
  try {
    const data = await backendRequest<SellersResponse>({
      method: "GET",
      url: "/shops",
    });

    return data;
  } catch (err) {
    console.error("Error fetching sellers:", err);
    throw err;
  }
}
