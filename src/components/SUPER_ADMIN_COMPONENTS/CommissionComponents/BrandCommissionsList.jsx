import React from "react";
import { Store } from "lucide-react";

export function BrandCommissionList({ brands, onEdit }) {


  return (
    <div className="mt-6">
      <div className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins] mb-4">
        <Store
          size={22}
          className="text-gray-900/30 mt-1 animate-bounce"
        />
        <span className="text-gray-900 pl-4">Brands</span>Commissions
      </div>
      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-4 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
        <div>ID</div>
        <div>Name</div>
        <div>Commission</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y border rounded-b-lg font-[poppins]">
        {brands.map((b) => (
          <div
            key={b.id}
            className="grid md:grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
          >
            {/* Desktop layout */}
            <div className="hidden md:block text-center font-medium">
              {b.id}
            </div>
            <div className="hidden md:block text-center font-semibold text-gray-600">
              {b.name}
            </div>
            <div className="hidden md:block text-center text-gray-700">
              {b.commission}%
            </div>
            <div className="hidden md:flex justify-center gap-2">
              <button
                onClick={() => onEdit(b.id)}
                className="flex items-center gap-1 px-3 py-1 !bg-yellow-400 hover:!bg-yellow-500 duration-300 text-white !rounded-md text-sm shadow-sm"
              >
                Edit
              </button>
            </div>

            {/* Mobile layout (Card style) */}
            <div className="md:hidden space-y-2 text-sm">
              <div>
                <span className="font-semibold text-gray-600">ID:</span> {b.id}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Name:</span>{" "}
                <span className="text-gray-600/70 font-semibold">{b.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Commission:</span>{" "}
                <span className="text-gray-700 font-semibold">
                  {b.commission}%
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => onEdit(b.id)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-1 !bg-yellow-400 hover:!bg-yellow-500 text-white !rounded-md text-sm shadow-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
