"use client";

import { useState } from "react";
import { postField } from "../actions/post-field.action";
import { Field } from "@/types";

export type CreateFieldPayload = {
    name: string;
    title: string;
    type: Field["data"][number]["type"];
    required: boolean;
    order: number;
    step: number;
    categoryId: number;
    target: Field["data"][number]["target"];
};

export function useCreateFields() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createField = async (payload: CreateFieldPayload) => {
        setLoading(true);
        try {
            const newField = await postField(payload);
            setError(null);
            return newField;
        } catch (err) {
            console.error("Error creating field:", err);
            setError("خطا در ایجاد فیلد");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, createField };
}
