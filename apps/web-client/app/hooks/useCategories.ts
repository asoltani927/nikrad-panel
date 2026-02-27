"use client";

import { getCategories } from "@/actions/categories/get-categories.action";
import { getProductCategories } from "@/actions/categories/get-product-categories.action";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      return getCategories();
    },
  });
  
export const useProductCategories = () =>
  useQuery({
    queryKey: ["product-categories"],
    queryFn: () => {
      return getProductCategories();
    },
  });

