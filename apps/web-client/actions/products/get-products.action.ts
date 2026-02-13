'use server'
import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await backendRequest<{ products: Product[] }>({
      method: "GET",
      url: "/products",
    });

    return data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}
