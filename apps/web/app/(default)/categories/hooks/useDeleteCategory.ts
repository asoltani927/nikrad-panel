"use client";

import { useState } from "react";
import { deleteCategory } from "../actions/delete-category.action";

export function useDeleteCategory() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const removeCategory = async (id: number, onSuccess?: () => void) => {
    setLoading(true);
    setError(null);

    try {
      await deleteCategory(id);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError("خطا در حذف دسته‌بندی");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { removeCategory, loading, error };
}
