'use server'

import { backendRequest } from "@/clients/backend";
import { Category } from "@/types";

export async function getProductCategories(): Promise<Category[]> {
  try {
    const data = await backendRequest<{ categories: Category[] }>({
      method: "GET",
      url: "/categories/products",
    });
    return data.categories;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
