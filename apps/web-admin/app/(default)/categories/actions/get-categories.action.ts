import { backendRequest } from "@/clients/backend";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  try {
    const data = await backendRequest<{ categories: Category[] }>({
      method: "GET",
      url: "/categories",
    });
    return data.categories;
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw err;
  }
}
