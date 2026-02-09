"use client";

import { useState, useCallback } from "react";
import { sendOtp } from "../action/post-otp.action";

interface UseSendOtpResult {
  submit: (phone: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useSendOtp(): UseSendOtpResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (phone: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await sendOtp({ phone });

      if (!res.success) {
        throw new Error(res.message || "Login step one failed");
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
