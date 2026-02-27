"use client";

import { getBrands } from "@/actions/brands/get-brands.action";
import { useQuery } from "@tanstack/react-query";

export const useBrands = () =>
  useQuery({
    queryKey: ["Brands"],
    queryFn: () => {
      return getBrands();
    },
  });