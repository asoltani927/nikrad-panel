// import { Product } from "@dokamerce/web-sdk";
// import { useCallback } from "react";

// export default function EditProductThirdStep({
//     product,
//     setProduct,
// }: {
//     product: Product;
//     setProduct: (product: Product) => void;
// }) {
//     const [selectedOption, setSelectedOption] = useState<string | null>(
//         product.category
//     );
//     const handleOptionChange = useCallback(
//         (option: string) => {
//             setSelectedOption(option);
//             setProduct({ ...product, category: option });
//         },
//         [product, setProduct]
//     );

//     return (
//         <div className="flex flex-col gap-4">
//             <div className="flex flex-col md:flex-row gap-4">
//                 <h3 className="text-lg font-semibold">Выберите категорию</h3>
//                 <div className="flex flex-col gap-2">
//                     <CategorySelect
//                         selectedOption={selectedOption}
//                         onOptionChange={handleOptionChange}
//                     />
//                 </div>
//             </div>
//             <div className="flex flex-col gap-4">
//                 <h3 className="text-lg font-semibold">Добавьте фото</h3>
//                 <div className="flex flex-col gap-2">
//                     <ImageUpload
//                         setImages={(images) => setProduct({ ...product, images })}
//                         images={product.images}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }
