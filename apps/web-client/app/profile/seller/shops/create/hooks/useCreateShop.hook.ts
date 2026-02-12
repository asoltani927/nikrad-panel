"use client";

import { useState, useCallback } from "react";
import { createShop } from "../actions/post-shop.action";
import { Shop } from "@/types";

interface UseCreateShopResult {
  submit: (payload: Shop) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useCreateShop(): UseCreateShopResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (payload: Shop): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await createShop(payload);

      if (!res.success) {
        throw new Error(res.message || "Create shop failed");
      }

      setSuccess(true);
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unexpected error");
      }
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    submit,
    loading,
    error,
    success,
  };
}
