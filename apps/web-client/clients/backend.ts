import { getAccessToken } from "@/actions/get-token-session";
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosHeaders,
} from "axios";

/**
 * Define your backend error response shape
 * (adjust this if your API uses a different structure)
 */
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  errors?: unknown;
}

export interface BackendError {
  message: string;
  statusCode?: number;
  errors?: unknown;
}

const backendInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 15000,
});

export async function backendRequest<TResponse, TData = unknown>(
  config: AxiosRequestConfig<TData>
): Promise<TResponse> {
  try {
    const token = await getAccessToken();

    // Normalize headers safely
    const headers =
      config.headers instanceof AxiosHeaders
        ? config.headers
        : new AxiosHeaders(config.headers as unknown as {});

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await backendInstance.request<TResponse>({
      ...config,
      headers,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const statusCode = error.response?.status;

      const backendMessage =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message;

      const normalizedError: BackendError = {
        message: backendMessage ?? "Something went wrong",
        statusCode,
        errors: error.response?.data?.errors,
      };

      if (!error.response) {
        normalizedError.message = "Network error. Please try again.";
      }

      throw normalizedError;
    }

    // Unknown runtime error
    throw {
      message: "Unexpected error occurred",
    } satisfies BackendError;
  }
}
