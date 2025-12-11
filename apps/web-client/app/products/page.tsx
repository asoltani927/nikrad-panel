import { HeroCarousel } from "./components/hero-carousel/HeroCarousel";
import { ProductsBreadcrumb } from "./components/ProductsBreadcrumb";



export default function ProductsPage() {
  return (
    <div className="w-full min-h-screen items-center justify-center bg-white  font-sans dark:bg-black">

      {/* 👉 Hero Carousel  */}
      <HeroCarousel />

      <ProductsBreadcrumb />

    </div>
  );
}
