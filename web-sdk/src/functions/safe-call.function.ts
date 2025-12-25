export type SDKError = {
  code: string;
  message: string;
  details?: any;
};

export async function safeCall<T>({
  fn,
  onError,
}: {
  fn: () => Promise<T> | T;
  onError?: (error: SDKError) => void;
}): Promise<T | null> {
  try {
    return await fn();
  } catch (err: unknown) {
    // Normalize the error to SDKError
    const sdkError: SDKError = {
      code: (err as any)?.code || "UNKNOWN_ERROR",
      message: (err as any)?.message || String(err),
      details: (err as any)?.details,
    };

    if (onError) onError(sdkError);
    else console.error("SDK Error:", sdkError);

    return null;
  }
}
