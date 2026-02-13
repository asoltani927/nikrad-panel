import BaseContainer from "@/components/base/BaseContainer";
import { HeroCarousel } from "./components/hero-carousel/HeroCarousel";
import { ProductsBreadcrumb } from "./components/ProductsBreadcrumb";
import { ProductsFilters } from "./components/ProductsFilters";
import { ProductsPagination } from "./components/ProductsPagination";
import { ProductsTitle } from "./components/ProductsTitle";
import { ProductsToolbar } from "./components/ProductsToolbar";
import { ProductCard } from "./components/ProductCard";
import { getProducts } from "@/actions/products/get-products.action";

export default async function ProductsPage() {
  const products = await getProducts(); // ✅ SERVER FETCH (SEO SAFE)

  return (
    <div className="w-full min-h-screen bg-white font-sans dark:bg-black">
      <HeroCarousel />
      <ProductsBreadcrumb />
      <ProductsTitle />

      <BaseContainer className="w-full flex flex-col items-center mt-2 lg:mt-4">
        <div className="w-full px-4 sm:px-10 lg:px-14 lg:grid grid-cols-4 gap-4">
          <div className="hidden lg:block col-span-1">
            <ProductsFilters />
          </div>

          <div className="col-span-3">
            <ProductsToolbar />

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4 lg:gap-y-6 w-full">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-full px-4 sm:px-10 lg:px-14">
          <ProductsPagination />
        </div>
      </BaseContainer>
    </div>
  );
}
