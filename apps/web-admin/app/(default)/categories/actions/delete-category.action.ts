
"use client";

import { backendRequest } from "@/clients/backend";

export async function deleteCategory(id: number) {
  try {
    const data = await backendRequest<{ success: boolean }>({
      method: "DELETE",
      url: `/categories/${id}`,
    });

    return data.success;
  } catch (err) {
    console.error("Error deleting category:", err);
    throw err;
  }
}
