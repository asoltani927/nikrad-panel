"use server";

import { backendRequest } from "@/clients/backend";
import { User } from "@/providers/auth.provider";

interface FetchUserInfoResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export async function fetchUserInfo(): Promise<User> {
  try {
    const res = await backendRequest<FetchUserInfoResponse>({
      method: "GET", // or POST if your backend requires it
      url: `/auth/me`,
    });
    console.log(res);

    console.log(res);

    if (!res.success || !res.user) {
      throw new Error(res.message || "Failed to fetch user info");
    }

    return res.user;
  } catch (err) {
    console.error("Error fetching user info:", err);
    throw err;
  }
}
