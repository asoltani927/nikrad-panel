import { backendRequest } from "@/clients/backend";
import { Need } from "@/types/needs.type";

export async function patchNeedStatus(
  id: number,
  status: string
): Promise<Need> {
  try {
    const data = await backendRequest<{ message: string; need: Need }>({
      method: "PATCH",
      url: `/needs/${id}`,
      data: { status },
    });

    return data.need;
  } catch (err) {
    console.error("Error updating need status:", err);
    throw err;
  }
}
