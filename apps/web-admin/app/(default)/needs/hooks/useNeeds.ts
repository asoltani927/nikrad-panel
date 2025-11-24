"use client";

import { useState, useEffect } from "react";
import { getNeeds } from "../actions/get-needs.action";
import { Need } from "@/types";

export function useNeeds() {
  const [needs, setNeeds] = useState<Need[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNeeds = async () => {
    setLoading(true);
    try {
      const data = await getNeeds();
      setNeeds(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching needs:", err);
      setError("خطا در دریافت نیازمندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, []);

  return { needs, loading, error, needsRefetch: fetchNeeds };
}
