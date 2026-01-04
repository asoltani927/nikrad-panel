import BaseContainer from "@/components/base/BaseContainer";
import { SellersBreadcrumb } from "./components/SellersBreadcrumb";
import { SellersTitle } from "./components/SellersTitle";
import { SellersList } from "./components/SellersList";
import { SellersFilters } from "./components/SellersFilters";
import { SellersPagination } from "./components/SellersPagination";
import { SellersToolbar } from "./components/SellersToolbar";


export default function ProductsPage() {
  return (
    <div className="w-full bg-white  font-sans dark:bg-black">

      <img
        src="/img/sellers-bg.png"
        alt="img"
        className="hidden lg:block w-full  block h-auto "
      />

      <SellersBreadcrumb />

      <SellersTitle />

      <BaseContainer className="w-full flex flex-col items-center mt-0 lg:mt-4">
        <div className="w-full px-4 sm:px-10 lg:px-14 lg:grid grid-cols-4 gap-4">
          <div className=" hidden lg:block col-span-1">
            <SellersFilters />
          </div>
          <div className="col-span-3">
            <SellersToolbar />
            <SellersList />
          </div>
        </div>
        <div className="w-full px-4 lg:px-14 ">
          <SellersPagination />
        </div>
      </BaseContainer>

    </div>
  );
}
