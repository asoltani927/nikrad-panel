"use client";

import { useState } from "react";
import { Category } from "@/types";
import { postCategory } from "../actions/post-category.action";

interface CreateCategoryPayload {
  name: string;
  slug: string;
  parentId: number | null;
}

export function useCreateCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCategory = async (
    payload: CreateCategoryPayload,
    onSuccess?: (category: Category) => void
  ) => {
    try {
      setLoading(true);
      setError(null);

      const category = await postCategory(payload);

      if (onSuccess) onSuccess(category);

      return category;
    } catch (err) {
      console.error("Error creating category:", err);
      setError("خطا در ایجاد دسته بندی");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createCategory,
    loading,
    error,
  };
}
