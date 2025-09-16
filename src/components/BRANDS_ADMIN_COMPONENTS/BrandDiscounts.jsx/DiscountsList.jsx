import React, { useState } from "react";
import EditDiscount from "./EditDiscount";
import { useBrandProducts } from "../../../context/BrandContext/BrandProductsContext";
import { useBrandDiscountContext } from "../../../context/BrandContext/BrandDiscountsContext";

export default function DiscountsList({ discounts, onDelete, onUpdate }) {
  const { products } = useBrandProducts();
  const { getDiscountProducts } = useBrandDiscountContext();

  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const handleEdit = (discount) => {
    setSelectedDiscount(discount);
  };

  const handleSave = (id, updatedDiscount) => {
    onUpdate(id, updatedDiscount);
    setSelectedDiscount(null);
  };

  return (
    <div className="mt-6">
      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-5 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
        <div>Discount</div>
        <div>Status</div>
        <div>Dates</div>
        <div>Products</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y border rounded-b-lg font-[poppins]">
        {discounts.map((d) => (
          <div
            key={d.id}
            className="grid md:grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
          >
            {/* Desktop layout */}
            <div className="hidden md:block text-center font-semibold text-gray-600">
              {d.discount}
            </div>
            <div className="hidden md:block text-center">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  d.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {d.status}
              </span>
            </div>
            <div className="hidden md:block text-center text-gray-600 text-[15px]">
              <span className="text-gray-400 text-[13px]">from</span>{" "}
              {d.startDate || "--"} <br />
              <span className="text-gray-400 text-[13px]">to</span>{" "}
              {d.endDate || "--"}
            </div>
            <div className="hidden md:block text-center text-sm text-gray-600">
              {(() => {
                const result = getDiscountProducts(d.id);

                if (result.type === "all") {
                  return (
                    <span className="text-green-500 font-bold">
                      All products
                    </span>
                  );
                }
                if (result.type === "none") {
                  return (
                    <span className="text-red-400 font-bold">No products</span>
                  );
                }
                return (
                  <span>{result.items.map((p) => p.name).join(", ")}</span>
                );
              })()}
            </div>

            <div className="hidden md:flex justify-center gap-2">
              <button
                onClick={() => handleEdit(d)}
                className="px-3 py-1 !bg-yellow-400 hover:!bg-yellow-500 duration-300 text-white !rounded-md text-sm shadow-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(d.id)}
                className="px-3 py-1 !bg-red-500 hover:!bg-red-600 duration-300 text-white !rounded-md text-sm shadow-sm"
              >
                Delete
              </button>
            </div>

            {/* Mobile layout (Card style) */}
            <div className="md:hidden space-y-3.5 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Discount:</span>{" "}
                <span className="text-gray-600/70 font-semibold">
                  {d.discount}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    d.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {d.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Dates:</span>{" "}
                <span className="text-gray-400 font-semibold">
                  {d.startDate || "--"} → {d.endDate || "--"}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Products:</span>{" "}
                <span className="text-gray-600/70 font-semibold">
                  {(() => {
                    const result = getDiscountProducts(d.id);

                    if (result.type === "all") return "All products";
                    if (result.type === "none") return "No products";
                    return result.items.map((p) => p.name).join(", ");
                  })()}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(d)}
                  className="flex-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white !rounded-md text-sm shadow-sm duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(d.id)}
                  className="flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white !rounded-md text-sm shadow-sm duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Edit Modal */}
      {selectedDiscount && (
        <EditDiscount
          discountData={selectedDiscount}
          onSave={handleSave}
          onClose={() => setSelectedDiscount(null)}
        />
      )}
    </div>
  );
}
