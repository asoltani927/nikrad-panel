'use server'

import { backendRequest } from "@/clients/backend";
import { Product } from "@/types";

export interface GetPersonalProductsParams {
  page?: number;
  limit?: number;
}

export const getPersonalProducts = async (
  params: GetPersonalProductsParams = {}
): Promise<Product[]> => {
  try {
    const queryString = new URLSearchParams(Object.entries(params))
      .toString();

    const url = `/products/personal${queryString ? `?${queryString}` : ''}`;

    const { products } = await backendRequest<{ products: Product[] }>({
      method: "GET",
      url,
    });

    return products;
  } catch (error) {
    console.error('Error fetching personal products:', error);
    return [];
  }
};
