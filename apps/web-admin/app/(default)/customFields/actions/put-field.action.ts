"use server";

import { backendRequest } from "@/clients/backend";
import { Field } from "@/types";

export interface UpdateFieldPayload {
    id: number;
    name: string;
    title: string;
    type: Field["data"][number]["type"];
    required: boolean;
    order: number;
    step: number;
    categoryId: number;
    target: Field["data"][number]["target"];
}

export async function updateField(payload: UpdateFieldPayload): Promise<Field> {
    try {
        const { id, ...dataToUpdate } = payload;

        const data = await backendRequest<Field>({
            method: "PUT",
            url: `/custom-fields/${id}`,
            data: dataToUpdate,
        });

        return data;
    } catch (err) {
        console.error("Error updating field:", err);
        throw err;
    }
}
