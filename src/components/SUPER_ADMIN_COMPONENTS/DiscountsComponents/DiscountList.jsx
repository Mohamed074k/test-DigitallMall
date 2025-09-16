import React from "react";

export default function DiscountList({ discounts, onDelete, onEdit }) {
  return (
    <div className="mt-6">
      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-5 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
        <div>ID</div>
        <div>Discount</div>
        <div>Status</div>
        <div>Dates</div>
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
            <div className="hidden md:block text-center font-medium">
              {d.id}
            </div>
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
              {d.startDate || "--"}{" "}
              <span className="text-gray-400 text-[13px]">to</span>{" "}
              {d.endDate || "--"}
            </div>
            <div className="hidden md:flex justify-center gap-2">
              <button
                onClick={() => onEdit(d.id)}
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
            <div className="md:hidden space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-600">ID:</span> {d.id}
              </div>
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
                <span className="text-gray-500">
                  {d.startDate || "--"} → {d.endDate || "--"}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onEdit(d.id)}
                  className="flex-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white !rounded-full text-sm shadow-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(d.id)}
                  className="flex-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
