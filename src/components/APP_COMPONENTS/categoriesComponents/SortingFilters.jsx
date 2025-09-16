import { useState } from "react";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import { ChevronDown } from "lucide-react";

export default function SortingFilters() {
  const { sortOption, setSortOption } = useBrandProducts();
  const [open, setOpen] = useState(false);

  const options = [
    { value: "popular", label: "Most Popular" },
    { value: "priceHigh", label: "Price High to Low" },
    { value: "priceLow", label: "Price Low to High" },
  ];

  const handleSelect = (option) => {
    setSortOption(option); // يغير الاختيار
    setOpen(false); // ✅ يقفل الليست
  };

  const selectedLabel =
    options.find((o) => o.value === sortOption)?.label || "Sort By";

  return (
    <div className="relative w-full lg:w-68">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg bg-white shadow-sm hover:shadow-md transition"
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          className={`w-4 h-4 transform transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Options */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                sortOption === opt.value ? "bg-gray-200 font-medium" : ""
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
