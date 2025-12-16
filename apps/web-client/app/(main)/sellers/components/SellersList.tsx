import { SellerCard } from "./SellerCard";
import { sellers } from "./sellers.data";


export function SellersList() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3  lg:gap-4 lg:gap-y-6 w-full">
            {sellers.map((seller) => (
                <SellerCard key={seller.id} seller={seller} />
            ))}
        </div>
    );
}