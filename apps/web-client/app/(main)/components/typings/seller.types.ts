export interface sellerType {
    id: number;
    name: string;
    owner: string;
    avatar: string;
    city: string;
    rate: number;
    comments: number;
    productsCount: number;
    storeLink: string;
    social?: {
        instagram?: string;
        whatsapp?: string;
        telegram?: string;
        phone?: string;
    };
}
