import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SearchTypeDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);

  const options = [
    { value: "products", label: "Products" },
    { value: "brands", label: "Brands" },
    { value: "models", label: "Models" },
  ];

  const selectedLabel =
    options.find((o) => o.value === value)?.label || "Select Type";

  return (
    <div className="relative w-40 md:w-48">
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

      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                value === opt.value ? "bg-gray-200 font-medium" : ""
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
