export interface Shop {
  cuid: string;
  slug: string;
  name: string;
  about: string;
  aboutSeller: string;
  status: string;
  successDeals: number;
  failedDeals: number;
  productsCount: number;

  thumbnailImage: string;

  daysOfActivity: string[];

  workingHours: {
    from: string; // HH:mm
    to: string; // HH:mm
  };

  responseHours: {
    from: string; // HH:mm
    to: string; // HH:mm
  };

  socialMedia: {
    instagram?: string;
    telegram?: string;
    website?: string;
    whatsapp?: string;
  };

  owner: {
    id: number;
    name: string;
    fullName: string;
    location?: string;
  };

  category: {
    id: number;
    name: string;
  };

  galleryImages: string[];

  shopReviews: {
    rating: number; // 1..5
    comment: string;
    user: {
      fullName: string;
    };
  }[];
}

export interface ShopsResponse {
  shops: Shop[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
