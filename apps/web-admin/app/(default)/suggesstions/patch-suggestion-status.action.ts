import { backendRequest } from "@/clients/backend";
import { Suggestion } from "@/types";

export async function patchSuggestionStatus(
    id: number,
    status: string
): Promise<Suggestion> {
    try {
        const data = await backendRequest<{ message: string; suggestion: Suggestion }>({
            method: "PATCH",
            url: `/suggestions/${id}`,
            data: { status },
        });

        return data.suggestion;
    } catch (err) {
        console.error("Error updating suggestion status:", err);
        throw err;
    }
}
