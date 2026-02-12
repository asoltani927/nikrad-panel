import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

export async function getProduct(id: string | number): Promise<Product> {
  try {
    const data = await backendRequest<Product>({
      method: "GET",
      url: `/products/${id}`,
    });

    return data;
  } catch (err) {
    console.error("Error fetching product:", err);
    throw err;
  }
}
