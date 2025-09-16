import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import {
  Tags,
  Users,
  Ruler,
  Percent,
  DollarSign,
  SlidersHorizontal,
} from "lucide-react";

export default function FiltersSidebar({ setIsFilterOpen }) {
  const { products, filterProducts, filters } = useBrandProducts();

  const [selectedCategory, setSelectedCategory] = useState(filters.category);
  const [selectedGender, setSelectedGender] = useState(filters.gender);
  const [selectedSizes, setSelectedSizes] = useState(filters.sizes);
  const [minPrice, setMinPrice] = useState(filters.priceRange[0]);
  const [maxPrice, setMaxPrice] = useState(filters.priceRange[1]);
  const [discountOnly, setDiscountOnly] = useState(filters.discountOnly);

  const categories = [...new Set(products.map((p) => p.category))];
  const genders = [...new Set(products.map((p) => p.gender))];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const applyFilters = () => {
    filterProducts({
      category: selectedCategory,
      gender: selectedGender,
      sizes: selectedSizes,
      priceRange: [minPrice, maxPrice],
      discountOnly,
    });

    if (setIsFilterOpen) setIsFilterOpen(false);
  };

  return (
    <div className="bg-gray-100 p-4  space-y-12">
      <h2 className="text-base font-semibold flex items-center gap-2 mb-5">
        <SlidersHorizontal className="w-4 h-4" /> Filters
      </h2>

      {/* Category */}
      <div>
        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
          <Tags size={15} className="text-gray-500" />
          <label className="text-md font-medium text-gray-700">Category</label>
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-black"
        >
          <option value="all">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Gender */}
      <div>
        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
          <Users size={15} className="text-gray-500" />
          <label className="text-md font-medium text-gray-700">Gender</label>
        </div>
        <div className="flex gap-1.5 lg:gap-3 flex-wrap">
          <button
            onClick={() => setSelectedGender("all")}
            className={`px-3 py-1 rounded-full border ${
              selectedGender === "all" ? "bg-black text-white" : "bg-white"
            }`}
          >
            All
          </button>
          {genders.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`px-3 py-1 rounded-full border ${
                selectedGender === g ? "bg-black text-white" : "bg-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
          <Ruler size={15} className="text-gray-500" />
          <label className="text-md font-medium text-gray-700">Size</label>
        </div>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 rounded-lg border ${
                selectedSizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-200"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Discounts */}
      {/* <div>
        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
          <Percent size={15} className="text-gray-500" />
          <label className="text-md font-medium text-gray-700">Discounts</label>
        </div>
        <button
          onClick={() => setDiscountOnly(!discountOnly)}
          className={`px-4 py-2 rounded-lg ${
            discountOnly
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {discountOnly ? "Showing Discounted" : "Show Discounted"}
        </button>
      </div> */}

      {/* Price Range */}
      {/* Price Range */}
      <div>
        <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
          <DollarSign size={15} className="text-gray-500" />
          <label className="text-md font-medium text-gray-700">
            Price Range
          </label>
        </div>

        <div className="space-y-4">
          {/* Min & Max Labels */}
          <div className="flex items-center justify-between text-sm font-medium text-gray-700">
            <span>${minPrice}</span>
            <span>${maxPrice}</span>
          </div>

          {/* Range Slider */}
          <Slider
            range
            min={0}
            max={500}
            step={5}
            value={[minPrice, maxPrice]}
            onChange={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            className="price-slider"
          />
        </div>
      </div>

      {/* Apply */}
      <div className="pt-4">
        <button
          onClick={applyFilters}
          className="bg-black text-white w-full py-2 rounded-lg hover:bg-gray-800"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
