import { ProductGallery } from "./_components/ProductGallery";
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb";
import BaseContainer from "@/components/base/BaseContainer";
import { ProductInfo } from "./_components/ProductInfo";
import { ProductTabs } from "./_components/tabs/ProductTabs";
import { RelatedProducts } from "./_components/related-products/page";

export default function ProductDetailsPage() {
    return (
        <div className="mt-14">
            <ProductBreadcrumb />
            <BaseContainer className="w-full flex flex-col items-center mt-16">
                <div className="w-full lg:px-[184px] grid grid-cols-1 lg:grid-cols-12 gap-5">

                    <div className="col-span-7">
                        <ProductGallery />
                    </div>

                    <div className="col-span-5">
                        <ProductInfo />
                    </div>

                </div>
                <div className="w-full  lg:px-[184px] mb-1">
                    <ProductTabs />
                    <RelatedProducts />
                </div>

            </BaseContainer>


        </div>
    );
}
