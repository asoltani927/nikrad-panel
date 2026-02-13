"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types";
import { getCategories } from "@/actions/categories/get-categories.action";

/**
 * @deprecated
 * TODO: I think not necessary, use tanstack @reza
 */
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, error, categoriesRefetch: fetchCategories };
}
