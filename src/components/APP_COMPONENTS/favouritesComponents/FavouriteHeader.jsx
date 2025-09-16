import { useSearchParams } from "react-router-dom";
import SearchTypeDropdown from "../searhResultsComponents/SearchTypeDropdown";
import { useFavourite } from "../../../context/AppContext/FavouriteContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { toast } from "react-toastify";

export default function FavouriteHeader({ favouritesCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { clearFavourites } = useFavourite();
  const currentType = searchParams.get("type") || "products";

  if (!searchParams.get("type")) {
    searchParams.set("type", "products");
    setSearchParams(searchParams, { replace: true });
  }

  const handleTypeChange = (newType) => {
    searchParams.set("type", newType);
    setSearchParams(searchParams);
  };

  const handleClear = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove all your favourites!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear them!",
    }).then((result) => {
      if (result.isConfirmed) {
        clearFavourites();
        toast.success("All favourites have been removed");
      }
    });
  };

  const label =
    currentType === "products"
      ? "Products"
      : currentType === "brands"
      ? "Brands"
      : "Models";

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-6 mb-10 font-[poppins]">
      {/* العنوان */}
      <h1 className="!text-[18px] md:!text-4xl !font-bold">
        Favourites {label}{" "}
        <span className="font-['Google_Sans_Mono'] text-gray-500 md:text-[25px]">
          "{favouritesCount}"
        </span>
      </h1>

      {/* الأدوات */}
      <div className="flex items-center justify-evenly gap-2">
        <SearchTypeDropdown value={currentType} onChange={handleTypeChange} />
        <button
          onClick={handleClear}
          className="px-3 py-2 text-sm md:text-base whitespace-nowrap 
             !bg-black hover:!bg-black/80 text-white duration-300 shadow transition-colors"
        >
          Clear Favourites
        </button>
      </div>
    </div>
  );
}
