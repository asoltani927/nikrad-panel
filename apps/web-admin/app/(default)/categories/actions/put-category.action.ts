'use server';

import { backendRequest } from "@/clients/backend";
import { Category } from "@/types";

export interface EditCategoryPayload {
  id: number;
  name: string;
  slug: string;
  parentId?: number | null;
}

export async function editCategory(payload: EditCategoryPayload): Promise<Category> {
  try {
    const data = await backendRequest<{ category: Category }>({
      method: "PUT",
      url: `/categories/${payload.id}`,
      data: {
        ...payload,
        names: {
          fa: payload.name,
          en: payload.slug,
        },
      },
    });

    return data.category;
  } catch (err) {
    console.error("Error editing category:", err);
    throw err;
  }
}
