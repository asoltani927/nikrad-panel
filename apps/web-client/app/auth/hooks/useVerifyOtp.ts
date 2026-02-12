"use client";

import { useState, useCallback } from "react";
import { verifyOtp } from "../action/post-verify.action";

interface UseVerifyOtpResult {
  submit: (params: { phone: string; code: string }) => Promise<void>;
  loading: boolean;
  error: string | null;
  code: string | null | undefined;
  success: boolean;
}

export function useVerifyOtp(): UseVerifyOtpResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState<string | null | undefined>(null);

  const submit = useCallback(
    async ({ phone, code }: { phone: string; code: string }) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const res = await verifyOtp({
          phone,
          code,
          type: "login",
        });

        if (!res.success) {
          throw new Error(res.message || "OTP verification failed");
        }

        setSuccess(true);
        setCode(res.code);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    submit,
    loading,
    error,
    success,
    code,
  };
}
