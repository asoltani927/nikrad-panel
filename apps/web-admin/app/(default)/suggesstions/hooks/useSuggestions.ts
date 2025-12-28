import { Suggestion } from "@/types";
import { useEffect, useState } from "react";
import { getSuggestions } from "../actions/get-suggestions.action";

export function useSuggestions() {
    const [suggestions, setsuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [total, setTotal] = useState<number>(0);

    const fetchSuggestions = async (customPage = page, customLimit = limit) => {
        setLoading(true);
        try {
            const data = await getSuggestions(customPage, customLimit);

            setsuggestions(data.suggestions);
            setTotal(data.total);
            setPage(data.page);
            setLimit(data.limit);

            setError(null);
        } catch (err) {
            console.error("Error fetching suggestions:", err);
            setError("خطا در دریافت پیشنهادات");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuggestions(page, limit);
    }, [page, limit]);

    return {
        suggestions,
        loading,
        error,

        page,
        limit,
        total,

        setPage,
        setLimit,

        suggestionsRefetch: fetchSuggestions,
    };
}
