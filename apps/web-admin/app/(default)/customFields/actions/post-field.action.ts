"use server";
import { backendRequest } from "@/clients/backend";
import { Field } from "@/types";

export interface CreateFieldPayload {
    name: string;
    title: string;
    type: Field["data"][number]["type"];
    required: boolean;
    order: number;
    step: number;
    categoryId: number;
    target: Field["data"][number]["target"];
}

export async function postField(payload: CreateFieldPayload): Promise<Field> {
    try {
        const data = await backendRequest<Field>({
            method: "POST",
            url: "/custom-fields",
            data: payload,
        });
        return data;
    } catch (err) {
        console.error("Error creating field:", err);
        throw err;
    }
}
