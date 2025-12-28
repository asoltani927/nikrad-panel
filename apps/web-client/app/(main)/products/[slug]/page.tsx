import { ProductGallery } from "./_components/ProductGallery";
import { ProductBreadcrumb } from "./_components/ProductBreadcrumb";
import BaseContainer from "@/components/base/BaseContainer";
import { ProductInfo } from "./_components/ProductInfo";
import { ProductTabs } from "./_components/tabs/ProductTabs";
import { RelatedProducts } from "./_components/related-products/page";

export default function ProductDetailsPage() {
    return (
        <div className="lg:mt-14">
            <ProductBreadcrumb />
            <BaseContainer className="w-full flex flex-col items-center mt-8 lg:mt-16">
                <div className="w-full lg:px-[184px] lg:grid grid-cols-1 lg:grid-cols-12 gap-5">

                    <div className="col-span-7">
                        <ProductGallery />
                    </div>

                    <div className="col-span-5 px-6 lg:px-0 mt-10 lg:mt-0">
                        <ProductInfo />
                    </div>

                </div>
                <div className="w-full  lg:px-[184px] mb-1">
                    <div className="px-4 lg:px-0">
                        <ProductTabs />
                    </div>

                    <RelatedProducts />
                </div>

            </BaseContainer>


        </div>
    );
}
