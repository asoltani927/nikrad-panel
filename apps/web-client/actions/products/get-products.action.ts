'use server';
import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

export interface GetProductsParams {
  category?: string;
  sort?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined;
}

/**
 * Fetch products from backend, optionally filtered/sorted/paginated.
 */
export async function getProducts(
  params: GetProductsParams = {}
): Promise<Product[]> {
  try {
    // Build query string from params
    const queryString = new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined) // ignore undefined
        .map(([k, v]) => [k, String(v)])
    ).toString();

    const url = queryString ? `/products?${queryString}` : "/products";

    const data = await backendRequest<{ products: Product[] }>({
      method: "GET",
      url,
    });

    return data.products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return []
  }
}
