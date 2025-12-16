import { ProductType } from "./typings/product.type";

export const product: ProductType = {
    id: "PRD-45821",
    name: "نام محصول",
    price: "12,500,000 تومان",
    description:
        "این محصول از بهترین متریال ساخته شده و مناسب استفاده در پروژه‌های معماری و دکوراسیون داخلی می‌باشد.این محصول از بهترین متریال ساخته شده و مناسب استفاده در پروژه‌های معماری و دکوراسیون داخلی می‌باشد.",
    rating: 3,
    reviewsCount: 245,
    colors: [
        { hex: "#94999F" },
        { hex: "#C2B1A5" },
        { hex: "#F1AB90", selected: true },
        { hex: "#997979" },
        { hex: "#050505" },
    ],
    images: [
        { src: "/img/product-image.png", alt: "تصویر محصول 1" },
        { src: "/img/product-image.png", alt: "تصویر محصول 2" },
        { src: "/img/product-image.png", alt: "تصویر محصول 3" },
        { src: "/img/product-image.png", alt: "تصویر محصول 4" },
        { src: "/img/product-image.png", alt: "تصویر محصول 5" },
        { src: "/img/product-image.png", alt: "تصویر محصول 6" },
        { src: "/img/product-image.png", alt: "تصویر محصول 7" },
        { src: "/img/product-image.png", alt: "تصویر محصول 8" },
    ],
    seller: "فروشگاه نیکراد استیل",
    stock: 3,
};
