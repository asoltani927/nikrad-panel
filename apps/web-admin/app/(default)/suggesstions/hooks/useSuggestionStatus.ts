"use client";

import { useState } from "react";
import { patchSuggestionStatus } from "../actions/patch-suggestion-status.action";

export function useSuggestionStatus() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async (
    id: number,
    status: string,
    onSuccess?: () => void
  ) => {
    setLoading(true);
    setError(null);

    try {
      await patchSuggestionStatus(id, status);
      onSuccess?.();
    } catch (err) {
      console.error("خطا در تغییر وضعیت:", err);
      setError("خطا در تغییر وضعیت درخواست");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateStatus, loading, error };
}
