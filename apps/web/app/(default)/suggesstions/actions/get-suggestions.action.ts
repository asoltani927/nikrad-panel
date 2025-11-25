import { backendRequest } from "@/clients/backend";
import { Suggestion } from "@/types";

export interface SuggestionsResponse {
    suggestions: Suggestion[];
    total: number;
    page: number;
    limit: number;
}

export async function getSuggestions(
    page: number = 1,
    limit: number = 10
): Promise<SuggestionsResponse> {
    try {
        const data = await backendRequest<SuggestionsResponse>({
            method: "GET",
            url: `/suggestions?page=${page}&limit=${limit}`,
        });

        return data;
    } catch (err) {
        console.error("Error fetching suggestions:", err);
        throw err;
    }
}
