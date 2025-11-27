"use client";

import { useState } from "react";
import { deleteField } from "../actions/delete-field.action";

export function useDeleteFields() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const removeField = async (id: number) => {
        setLoading(true);
        try {
            await deleteField(id);
            setError(null);
        } catch (err) {
            console.error("Error deleting field:", err);
            setError("خطا در حذف فیلد");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, removeField };
}
