import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, onClear, onSubmit }) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-500 ease-out
              peer-focus:scale-110 peer-focus:text-black"
          />

          <input
            value={value}
            onChange={onChange}
            placeholder="Search for models, brands, products..."
            className="peer w-full bg-gray-50 text-gray-700 placeholder-gray-400 rounded-2xl
                        py-4 pl-12 pr-12 shadow-md border border-gray-200
                        transform transition-transform duration-500 ease-out
                        focus:outline-none focus:ring-2 focus:ring-gray-300 !font-['JetBrains_Mono'] placeholder:text-[12px] sm:placeholder:text-sm 
                        md:placeholder:text-base"
          />

          {value && (
            <button
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 "
            >
              <X
                size={18}
                className="text-gray-600/80 hover:!text-gray-600/50 duration-300"
              />
            </button>
          )}
        </div>

        <button
          onClick={onSubmit}
          className="bg-black text-white px-6 py-4 !rounded-2xl font-semibold hover:!bg-gray-800 transition-all duration-300 w-full sm:w-auto !font-[poppins]"
        >
          Search
        </button>
      </div>
    </div>
  );
}
