"use client";

import { useState, useEffect } from "react";
import { getSellers } from "@/actions/sellers/get-sellers.action";
import { Sellers } from "@/types";

export function useSellers() {
  const [sellers, setSellers] = useState<Sellers[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSellers = async () => {
    setLoading(true);
    try {
      const data = await getSellers();

      setSellers(data.shops);
      setError(null);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      setError("خطا در دریافت فروشگاه‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return {
    sellers,
    loading,
    error,
    sellersRefetch: fetchSellers,
  };
}
