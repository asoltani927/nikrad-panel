'use server'
import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

interface UpdateProductParams {
  id: string, 
  name: string;
  categoryId: string;
  brandId: string;
  condition: string;
  content: string;
}
export async function updateProduct(params: UpdateProductParams): Promise<Product> {
  try {
    const data = await backendRequest<Product>({
      method: "PUT",
      url: `/products/${params.id}`,
      data: params,
    });

    return data;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
}
