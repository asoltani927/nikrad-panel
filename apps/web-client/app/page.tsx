import { HeroCarousel } from "./components/hero-carousel/HeroCarousel";
import { MainCategories } from "./components/main-categories/MainCategories";
import { MaterialCatalog } from "./components/material-catalog/MaterialCatalog";
import { SellerShowcase } from "./components/sellers/SellersShowcase";
import { ProductsShowcase } from "./components/products/ProductsShowcase";
import { BlogsShowcase } from "./components/blogs/BlogsShowcase";
import LayoutFooter from "@/components/layout/Footer";
import Header from "@/components/layout/Header";



export default function Home() {
  return (
    <div className="w-full min-h-screen items-center justify-center bg-white  font-sans dark:bg-black">

      {/* 👉 Header  */}
      <Header />

      <main className="w-full  ">

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

      </main>

      {/* 👉 Footer  */}
      <LayoutFooter />

    </div>
  );
}
