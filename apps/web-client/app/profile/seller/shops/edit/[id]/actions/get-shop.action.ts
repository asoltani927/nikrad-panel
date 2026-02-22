import { backendRequest } from "@/clients/backend";
import { Shop } from "@/types";

export async function getShop(cuid: string | number): Promise<Shop> {
  try {
    const data = await backendRequest<Shop>({
      method: "GET",
      url: `/shops/${cuid}`,
    });

    return data;
  } catch (err) {
    console.error("Error fetching shops:", err);
    throw err;
  }
}
