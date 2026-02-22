"use client";

import { useState, useEffect, useCallback } from "react";
import { getShop } from "../actions/get-shop.action";
import { Shop } from "@/types";

export function useShop(cuid: string | number) {
  const [shop, setShop] = useState<Shop>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShop = useCallback(async () => {
    if (!cuid) return;

    setLoading(true);
    try {
      const data = await getShop(cuid);
      setShop(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching shop:", err);
      setError("خطا در دریافت فروشگاه");
    } finally {
      setLoading(false);
    }
  }, [cuid]);

  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  return { shop, loading, error, shopRefetch: fetchShop };
}
