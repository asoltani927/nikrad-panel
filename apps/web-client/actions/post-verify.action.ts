"use server";

import { backendRequest } from "@/clients/backend";
import { cookies } from "next/headers";

interface VerifyOtpPayload {
  phone: string;
  type: "login";
  code: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message?: string;
  token: string;
  code?: string;
}

export async function verifyOtp(
  payload: VerifyOtpPayload,
): Promise<VerifyOtpResponse> {
  try {
    const res = await backendRequest<VerifyOtpResponse>({
      method: "POST",
      url: "/auth/otp/verify",
      data: payload,
    });
    console.log(res);

    if (res.success && res.token) {
      const cookieStore = await cookies();

      cookieStore.set({
        name: "access_token",
        value: res.token,
        httpOnly: true,
        secure: !(process.env.NODE_ENV !== "development"),
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return res;
  } catch (err) {
    console.error("Error in verify otp:", err);
    throw err;
  }
}
