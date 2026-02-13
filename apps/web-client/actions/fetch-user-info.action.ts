"use server";

import { backendRequest } from "@/clients/backend";

// TODO: make this interfaces global and reusable across the app @reza
interface User {
  id: string;
  fullName: string;
  username: string;
  telephoneNumbers: {
    value?: string;
    targets: string[];
  }[];
}

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
