import axios, { AxiosInstance, AxiosRequestConfig, AxiosHeaders } from "axios";
import { getAccessToken } from "@/app/actions/get-token-session";

const backendInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function backendRequest<T>(
  config: AxiosRequestConfig
): Promise<T> {
  const token = await getAccessToken();

  let headers: AxiosHeaders;

  if (config.headers instanceof AxiosHeaders) {
    headers = config.headers;
  } else {
    headers = new AxiosHeaders(config.headers as any);
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await backendInstance.request<T>({
    ...config,
    headers,
  });

  return response.data;
}
