import { backendRequest } from "@/clients/backend";
import { Need } from "@/types/needs.type";

export async function getNeeds(): Promise<Need[]> {
  try {
    const data = await backendRequest<{ needs: Need[] }>({
      method: "GET",
      url: "/needs",
    });
    return data.needs;
  } catch (err) {
    console.error("Error fetching needs:", err);
    throw err;
  }
}
