import { backendRequest } from "@/clients/backend";
import { Field } from "@/types";

export async function getFields(): Promise<Field> {
    try {
        const data = await backendRequest<Field>({
            method: "GET",
            url: "/custom-fields",
        });
        return data;
    } catch (err) {
        console.error("Error fetching fields:", err);
        throw err;
    }
}
