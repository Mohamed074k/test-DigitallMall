import React, {useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { useFavourite } from "../../context/AppContext/FavouriteContext";
import FavouriteHeader from "../../components/APP_COMPONENTS/favouritesComponents/FavouriteHeader";
import FavouriteList from "../../components/APP_COMPONENTS/favouritesComponents/FavouriteList";
import EmptyFavPage from "../../components/APP_COMPONENTS/favouritesComponents/EmptyFavPage";

const Favourites = () => {
  const { favourites } = useFavourite();
  const [searchParams] = useSearchParams();
  const currentType = searchParams.get("type") || "products";

    // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);


  // Helper لتحديد النوع
  const getType = (item) => {
    if (!item.type) return "products";
    const t = item.type.toLowerCase();
    if (t.startsWith("prod")) return "products";
    if (t.startsWith("brand")) return "brands";
    if (t.startsWith("model")) return "models";
    return "products";
  };

  // تقسيم البيانات
  const productFavs = favourites.filter((item) => getType(item) === "products");
  const brandFavs = favourites.filter((item) => getType(item) === "brands");
  const modelFavs = favourites.filter((item) => getType(item) === "models");

  const currentItems =
    currentType === "products"
      ? productFavs
      : currentType === "brands"
      ? brandFavs
      : modelFavs;

  // 🟢 هنا بنحسب عدد النوع الحالي فقط
  const currentCount = currentItems.length;

  // 🟥 الحالة: مفيش أي حاجة خالص
  if (!productFavs.length && !brandFavs.length && !modelFavs.length) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center">
        <EmptyFavPage />
      </div>
    );
  }

  // 🟧 الحالة: النوع الحالي فاضي
  if (!currentItems.length) {
    return (
      <div className="container mx-auto px-4 py-6">
        <FavouriteHeader favouritesCount={currentCount} />
        <div className="flex flex-col items-center mt-10 text-gray-500">
          <p className="text-lg font-semibold">
            No {currentType} in your favourites yet.
          </p>
        </div>
      </div>
    );
  }

  // 🟩 الحالة الطبيعية
  return (
    <div className="container mx-auto px-4 py-6">
      <FavouriteHeader favouritesCount={currentCount} />
      <FavouriteList type={currentType} items={currentItems} />
    </div>
  );
};

export default Favourites;
