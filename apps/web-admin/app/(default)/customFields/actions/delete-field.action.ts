"use client";

import { backendRequest } from "@/clients/backend";

export async function deleteField(id: number): Promise<void> {
    try {
        await backendRequest<void>({
            method: "DELETE",
            url: `/custom-fields/${id}`,
        });
    } catch (err) {
        console.error("Error deleting field:", err);
        throw err;
    }
}
