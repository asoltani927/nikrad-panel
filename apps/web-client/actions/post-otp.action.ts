"use server";

import { backendRequest } from "@/clients/backend";

interface SendOtpPayload {
  phone: string;
}

interface SendOtpResponse {
  success: boolean;
  message?: string;
}

export async function sendOtp(
  payload: SendOtpPayload,
): Promise<SendOtpResponse> {
  try {
    const data = await backendRequest<SendOtpResponse>({
      method: "POST",
      url: "/auth/otp",
      data: {
        phone: payload.phone,
      },
    });

    return data;
  } catch (err) {
    console.error("Error in send otp:", err);
    throw err;
  }
}
