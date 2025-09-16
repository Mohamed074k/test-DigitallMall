import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import SortingFilters from "./SortingFilters";
import ProductsGrid from "./ProductsGrid";
import Pagination from "../../Pagination";

export default function MainPage() {
  const { filters, currentProducts, page, paginate, totalPages } =
    useBrandProducts();

  const getTitle = () => {
    const { category, gender, sizes, discountOnly } = filters;
    let title = "All Products";

    if (
      (category && category !== "all") ||
      (gender && gender !== "all") ||
      (sizes && sizes.length > 0) ||
      discountOnly
    ) {
      title = "Filtered Products";
      if (category && category !== "all") {
        title = `${category} Products`;
      }
      if (gender && gender !== "all") {
        title = `${gender}'s ${category !== "all" ? category : ""} Products`;
      }
      if (sizes && sizes.length > 0) {
        title += ` "Size ${sizes.join(", ")}"`;
      }
      if (discountOnly) {
        title = "Discounted " + title;
      }
    }

    return title;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <h1 className="text-lg lg:text-xl font-bold truncate max-w-[70%]">
          {getTitle()}
        </h1>
        <SortingFilters />
      </div>

      <ProductsGrid products={currentProducts} />

      {totalPages > 1 && (
        <Pagination page={page} setPage={paginate} totalPages={totalPages} />
      )}
    </div>
  );
}
