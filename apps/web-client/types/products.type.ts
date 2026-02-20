import { type Product as ProductBase, ProductFile, ProductSeller, ProductStatus, File, ProductType, ProductVariant, Category, Brand } from "@dokamerce/web-sdk";
export interface Product extends ProductBase {
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
  status: ProductStatus;
  type: ProductType;
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
  
  brand?: Brand;
  category?: Category;
  variants: ProductVariant[];
  thumbnail: File;
  files: ProductFile[];
  sellers: ProductSeller[];
}
