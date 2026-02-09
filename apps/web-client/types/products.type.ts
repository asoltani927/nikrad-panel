export interface Product {
  id: string;
  name: string;
  slug: string;
  code: string;
  price: number;
  active: boolean;
  inventory: string;
  featured: boolean;
  todayDeal: boolean;
  soldCount: number;
  views: number;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  content: string;
  warrantyDescription: string;
  warrantyTime: string;
  warrantyType: string;
  maxOrderQty: boolean;
  minOrderQty: boolean;
  metaTitle: boolean;
  metaDescription: boolean;
  metaKeywords: boolean;
  brand: {
    id: string;
    name: string;
    slug: string;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  variants: {
    id: string;
    price: number;
    stock: number;
  }[];
  thumbnail: {
    id: string;
    url: string;
  };
  files: {
    id: string;
    url: string;
  }[];
  seller: {
    id: string;
    name: string;
  };
}
