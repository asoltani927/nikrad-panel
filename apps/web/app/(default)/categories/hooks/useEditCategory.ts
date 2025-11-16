"use client";

import { useState } from "react";
import { editCategory, EditCategoryPayload } from "../actions/put-category.action";
import { Category } from "@/types";

export function useEditCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateCategory = async (
    payload: EditCategoryPayload,
    onSuccess?: (updatedCategory: Category) => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      const updated = await editCategory(payload);
      onSuccess?.(updated);
      return updated;
    } catch (err) {
      console.error(err);
      setError("خطا در ویرایش دسته‌بندی");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateCategory, loading, error };
}
