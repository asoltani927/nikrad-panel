"use client";

import { useState, useEffect } from "react";
import { getShops } from "../actions/get-shops.action";
import { Shop } from "@/types";

export function useShops() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const data = await getShops();

      setShops(data.shops);
      setError(null);
    } catch (err) {
      console.error("Error fetching shops:", err);
      setError("خطا در دریافت فروشگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  return {
    shops,
    loading,
    error,
    sellersRefetch: fetchShops,
  };
}
