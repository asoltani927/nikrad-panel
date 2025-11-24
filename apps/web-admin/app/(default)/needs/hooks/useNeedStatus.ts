"use client";

import { useState } from "react";
import { patchNeedStatus } from "../actions/patch-need-status.action";

export function useNeedStatus() {
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
      await patchNeedStatus(id, status);
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
