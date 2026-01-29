import { HeroCarousel } from "./components/hero-carousel/HeroCarousel";
import { MainCategories } from "./components/MainCategories";
import { MaterialCatalog } from "./components/material-catalog/MaterialCatalog";
import { SellerShowcase } from "./components/sellers/SellersShowcase";
import { ProductsShowcase } from "./components/products/ProductsShowcase";
import { BlogsShowcase } from "./components/blogs/BlogsShowcase";

export default function Home() {
  return (
    <div className="w-full min-h-screen items-center justify-center bg-white  font-sans dark:bg-black">
      {/* 👉 Hero Carousel  */}
      <HeroCarousel />

      {/* 👉 Main Categories  */}
      <MainCategories />

      {/* 👉 Material Catalog  */}
      <MaterialCatalog />

      {/* 👉 Sellers */}
      <SellerShowcase />

      {/* 👉 Products   */}
      <ProductsShowcase />

      {/* 👉 Blogs   */}
      <BlogsShowcase />
    </div>
  );
}
