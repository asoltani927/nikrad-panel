import { backendRequest } from "@/clients/backend";
import { BlogResponse } from "@/types";

export async function getBlogs(): Promise<BlogResponse> {
  try {
    const data = await backendRequest<BlogResponse>({
      method: "GET",
      url: "/blogs",
    });

    return data;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return { blogs: [],  pagination: { limit: 10, page: 1, total: 0, totalPages: 1 } };
  }
}
