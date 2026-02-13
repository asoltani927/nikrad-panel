import { getProducts } from "@/actions/products/get-products.action";
import { Product } from "@/types";
import { useEffect, useState } from "react";

/**
 * @deprecated
 * TODO: I think not necessary, use tanstack @reza
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("خطا در دریافت محصولات");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, productsRefetch: fetchProducts };
}
