"use client";

import { useState } from "react";
import { Field } from "@/types";
import { updateField, UpdateFieldPayload } from "../actions/put-field.action";

export function useUpdateFields() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateFieldAction = async (payload: UpdateFieldPayload): Promise<Field> => {
        setLoading(true);
        try {
            const updatedField = await updateField(payload);
            setError(null);
            return updatedField;
        } catch (err) {
            console.error("Error updating field:", err);
            setError("خطا در بروزرسانی فیلد");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, updateField: updateFieldAction };
}
