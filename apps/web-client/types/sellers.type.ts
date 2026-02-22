export interface Sellers {
  cuid: string;
  slug: string;
  name: string;
  about: string;
  aboutSeller: string;
  successDeals: number;
  failedDeals: number;
  thumbnailImage: string;
  productsCount: number;

  owner: {
    id: number;
    name: string;
    fullName: string;
    location: string;
  };

  category: {
    id: number;
    name: string;
  };

  galleryImages: string[];

  shopReviews: {
    rating: number;
    comment: string;
    user: {
      fullName: string;
    };
  }[];
}
export interface SellersResponse {
  shops: Sellers[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
