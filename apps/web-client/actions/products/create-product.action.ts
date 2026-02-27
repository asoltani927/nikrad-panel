'use server'
import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

interface CreateProductParams {
  name: string;
  categoryId: string;
  brandId: string;
  condition: string;
  content: string;
}
export async function createProduct(params: CreateProductParams): Promise<Product> {
  try {
    const data = await backendRequest<Product>({
      method: "POST",
      url: `/products`,
      data: params,
    });

    return data;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}
