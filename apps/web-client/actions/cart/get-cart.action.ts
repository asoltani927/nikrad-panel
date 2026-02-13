import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

export async function getCart(): Promise<Product> {
  try {
    const data = await backendRequest<Product>({
      method: "GET",
      url: `/cart`,
    });

    return data;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
}
