"use server";

import { backendRequest } from "@/clients/backend";

interface LogoutResponse {
  success: boolean;
  message?: string;
}

/**
 * Logs out the current user by clearing the server-side session cookie.
 */
export async function logoutUser(): Promise<void> {
  try {
    const res = await backendRequest<LogoutResponse>({
      method: "POST",
      url: "/auth/logout",
    });

    if (!res.success) {
      throw new Error(res.message || "Logout failed");
    }
  } catch (err) {
    console.error("Error during logout:", err);
    throw err;
  }
}
