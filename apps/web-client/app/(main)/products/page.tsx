import BaseContainer from "@/components/base/BaseContainer";
import { HeroCarousel } from "./components/hero-carousel/HeroCarousel";
import { ProductsBreadcrumb } from "./components/ProductsBreadcrumb";
import { ProductsFilters } from "./components/ProductsFilters";
import { ProductsList } from "./components/ProductsList";
import { ProductsPagination } from "./components/ProductsPagination";
import { ProductsTitle } from "./components/ProductsTitle";
import { ProductsToolbar } from "./components/ProductsToolbar";


export default function ProductsPage() {
  return (

    <div className="w-full min-h-screen bg-white  font-sans dark:bg-black">

      {/* 👉 Hero Carousel  */}
      <HeroCarousel />

      <ProductsBreadcrumb />

      <ProductsTitle />

      <BaseContainer className="w-full flex flex-col items-center mt-2 lg:mt-10">
        <div className="w-full px-4 lg:px-[202px] lg:grid grid-cols-4 gap-4">
          <div className=" hidden lg:block col-span-1">
            <ProductsFilters />
          </div>
          <div className="col-span-3">
            <ProductsToolbar />
            <ProductsList />
          </div>
        </div>
        <div className="w-full px-4 lg:px-[202px] ">
          <ProductsPagination />
        </div>
      </BaseContainer>

    </div>
  );
}
