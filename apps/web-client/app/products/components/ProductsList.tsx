import { products } from "../../components/products/products.data";
import { ProductCard } from "./ProductCard";


export function ProductsList() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3  lg:gap-4 lg:gap-y-6 w-full">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}