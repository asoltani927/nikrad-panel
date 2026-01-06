import BaseContainer from "@/components/base/BaseContainer";
import { SellerInfo } from "./_components/SellerInfo";
import { SellerOverview } from "./_components/SellerOverview";
import { SellerAbout } from "./_components/SellerAbout";
import { SellerToolbar } from "./_components/SellerToolbar";
import { SellerBestSellingProducts } from "./_components/SellerBestSellingProducts";
import { SellerRecentProducts } from "./_components/SellerRecentProducts";
import { SellerReviews } from "./_components/SellerReviews";
import { SellerGallery } from "./_components/SellerGallery";


export default function SellerDetailsPage() {
  return (
    <div className="w-full bg-white  font-sans dark:bg-black pb-16">

      <SellerInfo />

      <div className="block lg:hidden px-4">  <SellerToolbar /></div>

      <BaseContainer className="w-full flex flex-col items-center mt-2 lg:mt-24 pt-1">
        <div className="w-full lg:ps-14 flex flex-col lg:flex-row gap-4">
          <div className=" w-full lg:w-[28%] ">
            <SellerOverview />
            <SellerAbout />
          </div>
          <div className=" w-full lg:w-[72%]">
            <div className="hidden lg:block">
              <SellerToolbar />
            </div>
            <SellerBestSellingProducts />
            <SellerRecentProducts />
            <SellerGallery
              images={[
                "/img/sellers/gallery1.png",
                "/img/sellers/gallery2.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery4.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery6.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery5.png",
                "/img/sellers/gallery4.png",
                "/img/sellers/gallery5.png",
              ]}
            />

            <SellerReviews />
          </div>
        </div>
      </BaseContainer>

    </div>
  );
}
