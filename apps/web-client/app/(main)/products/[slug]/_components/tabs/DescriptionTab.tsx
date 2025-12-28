import { product } from "../product.data";

export const DescriptionTab = () => {
    return (
        <div className="text-[11px] text-[#333741] font-normal leading-7">
            {product.description}
        </div>
    );
};
