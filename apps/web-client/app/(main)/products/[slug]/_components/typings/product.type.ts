export interface ProductColor {
    hex: string;
    selected?: boolean;
}

export interface ProductImage {
    src: string;
    alt?: string;
}

export interface ProductType {
    id: string;
    name: string;
    price: string;
    description: string;
    rating: number;
    reviewsCount: number;
    colors: ProductColor[];
    images: ProductImage[];
    seller: string;
    stock: number;
}
