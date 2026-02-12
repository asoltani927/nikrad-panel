"use server";

import { backendRequest } from "@/clients/backend";

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface FetchUserInfoResponse {
  success: boolean;
  data?: User;
  message?: string;
}

export async function fetchUserInfo(): Promise<User> {
  try {
    const res = await backendRequest<FetchUserInfoResponse>({
      method: "GET", // or POST if your backend requires it
      url: `/auth/me`,
    });

    if (!res.success || !res.data) {
      throw new Error(res.message || "Failed to fetch user info");
    }

    return res.data;
  } catch (err) {
    console.error("Error fetching user info:", err);
    throw err;
  }
}
