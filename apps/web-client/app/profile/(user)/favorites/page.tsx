import BaseContainer from "@/components/base/BaseContainer";
import { FavoriteCard } from "./components/FavoriteCard";
import { FavoriteType } from "./components/typings/favorite.types";


export default function ProfileFavoritesPage() {
  const favoritesData: FavoriteType[] = [
    {
      id: 1,
      slug: "4564561234156",
      name: 'پروفیل',
      price: 656000,
      image: "/img/home/blog1.png",
    },
    {
      id: 2,
      slug: "4564561234156",
      name: "ورق استیل",
      price: 656000,
      image: "/img/home/blog2.png",
    },
    {
      id: 3,
      slug: "4564561234156",
      name: "تیرآهن 3",
      price: 656000,
      image: "/img/home/blog2.png",
    },
    {
      id: 4,
      slug: "4564561234156",
      name: "تیرآهن 3",
      price: 656000,
      image: "/img/home/blog1.png",
    },
  ];
  return (
    <div>
      {/* title  */}
      <div className="bg-gray-100 py-4 mb-10 text-sm font-medium">
        <BaseContainer className="px-6 lg:px-16">
          علاقه‌مندی‌ها
        </BaseContainer>
      </div>
      <BaseContainer className="px-6 lg:px-16">
        <div className="grid lg:grid-cols-3 gap-4 mt-12">
          {favoritesData.map((favoriteItem) => (
            <div key={favoriteItem.id}>
              <FavoriteCard favoriteItem={favoriteItem} />
            </div>
          ))}
        </div>
      </BaseContainer >
    </div >

  );
}
