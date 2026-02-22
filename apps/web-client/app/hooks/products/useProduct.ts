import { getProduct } from "@/actions/products/get-product.action";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string | number) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => {
      if (!id) throw new Error("Product id is required");
      return getProduct(id);
    },
    enabled: !!id,
  });
