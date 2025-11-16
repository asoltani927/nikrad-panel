"use server";

import { backendRequest } from "@/clients/backend";
import { Category } from "@/types";

interface CreateCategoryPayload {
  name: string;
  slug: string;
  parentId: number | null;
}

export async function postCategory(
  payload: CreateCategoryPayload
): Promise<Category> {
  try {
    const data = await backendRequest<Category>({
      method: "POST",
      url: "/categories",
      data: {
        ...payload,
        names: {
          fa: payload.name,
          en: payload.slug,
        },
      },
    });
    return data;
  } catch (err) {
    console.error("Error creating category:", err);
    throw err;
  }
}
