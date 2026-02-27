'use server'
import { backendRequest } from "@/clients/backend";
import { Brand } from "@/types";

export async function getBrands(): Promise<Brand[]> {
  try {
    const data = await backendRequest<{ brands: Brand[] }>({
      method: "GET",
      url: "/brands",
    });
    console.log(data)
    return data.brands;
  } catch (err) {
    console.error("Error fetching Brands:", err);
    return [];
  }
}
