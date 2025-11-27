"use client";

import { useState, useEffect } from "react";
import { getFields } from "../actions/get-fields.action";
import { Field } from "@/types/fields.type";

export function useFields() {
  const [fields, setFields] = useState<Field["data"]>([]);
  const [meta, setMeta] = useState<Field["meta"] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFields = async () => {
    setLoading(true);
    try {
      const data = await getFields();
      setFields(data.data);
      setMeta(data.meta);
      setError(null);
    } catch (err) {
      console.error("Error fetching fields:", err);
      setError("خطا در دریافت فیلدها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  return { fields, meta, loading, error, fieldsRefetch: fetchFields };
}
