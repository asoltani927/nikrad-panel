export interface BlogAuthor {
  id: number;
  fullName: string;
}

export interface BlogCategory {
  id: number;
  name: string;
}

export interface Blog {
  id: number;
  cuid: string;
  title: string;
  slug: string;
  status: string;
  excerpt: string;
  image: string;
  views: number;
  readingTime: number;
  publishedAt: string;
  author: BlogAuthor;
  categories: BlogCategory[];
}

export interface BlogResponse {
  blogs: Blog[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
