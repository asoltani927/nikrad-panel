import { backendRequest } from "@/clients/backend";

interface SendEmailPayload {
  email: string;
}

interface SendEmailResponse {
  success: boolean;
  message?: string;
}

export async function sendEmail(
  payload: SendEmailPayload,
): Promise<SendEmailResponse> {
  try {
    const data = await backendRequest<SendEmailResponse>({
      method: "POST",
      url: "/newsletter",
      data: {
        email: payload.email,
      },
    });

    return data;
  } catch (err) {
    console.error("Error in send email:", err);
    throw err;
  }
}
