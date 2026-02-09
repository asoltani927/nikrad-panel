import { getProduct } from "@/app/actions/products/get-product.action";
import { Product } from "@/types";
import { useEffect, useState } from "react";

export function useProductById(id: string | number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!id) return;

    setLoading(true);
    try {
      const data = await getProduct(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching product:", err);
      setError("خطا در دریافت محصول");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return {
    product,
    loading,
    error,
    productRefetch: fetchProduct,
  };
}
