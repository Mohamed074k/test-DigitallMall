import React, { useState } from "react";
import EditPromo from "./EditPromo";

export default function PromoCodeList({ promoCodes, onDelete, onUpdate }) {
  const [selectedPromo, setSelectedPromo] = useState(null);

  const handleEdit = (promo) => {
    setSelectedPromo(promo);
  };

  const handleSave = (id, updatedPromo) => {
    onUpdate(id, updatedPromo);
    setSelectedPromo(null);
  };

  return (
    <div className="mt-6">
      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-6 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
        {/* <div>ID</div> */}
        <div>Code</div>
        <div>Discount</div>
        <div>Status</div>
        <div>Dates</div>
        <div>Limits</div>
        <div>Actions</div>
      </div>

      {/* Rows */}
      <div className="divide-y border rounded-b-lg font-[poppins]">
        {promoCodes.map((p) => (
          <div
            key={p.id}
            className="grid md:grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
          >
            {/* Desktop layout */}
            {/* <div className="hidden md:block text-center font-medium">
              {p.id}
            </div> */}
            <div className="hidden md:block text-center font-semibold text-gray-600">
              {p.code}
            </div>
            <div className="hidden md:block text-center text-gray-600">
              {p.discount}
            </div>
            <div className="hidden md:block text-center">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  p.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {p.status}
              </span>
            </div>
            <div className="hidden md:block text-center text-gray-600 text-[15px]">
              <span className="text-gray-400 text-[13px]">from</span>{" "}
              {p.startDate || "--"} <br />
              <span className="text-gray-400 text-[13px]">to</span>{" "}
              {p.endDate || "--"}
            </div>
            <div className="hidden md:block text-center text-gray-600">
              <span className="text-[14px] text-gray-400">User :</span>{" "}
              {p.userLimit}{" "}
              <span className="text-[14px] text-gray-400"> - </span>{" "}
              <span className="text-[14px] text-gray-400">Total :</span>{" "}
              {p.totalLimit} <br />
              <span className="text-gray-400 text-[13px] font-bold">
                used {p.usedCount}
              </span>
            </div>
            <div className="hidden md:flex justify-center gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 !bg-yellow-400 hover:!bg-yellow-500 duration-300 text-white !rounded-md text-sm shadow-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(p.id)}
                className="px-3 py-1 !bg-red-500 hover:!bg-red-600 duration-300 text-white !rounded-md text-sm shadow-sm"
              >
                Delete
              </button>
            </div>

            {/* Mobile layout (Card style) */}
            <div className="md:hidden space-y-3.5 text-sm">
              {/* <div>
                <span className="font-semibold text-gray-600">ID:</span> {p.id}
              </div> */}
              <div>
                <span className="font-semibold text-gray-600">Code:</span>{" "}
                <span className="text-gray-600/70 font-semibold">{p.code}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Discount:</span>{" "}
                <span className="text-gray-600/70 font-semibold">
                  {p.discount}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Status:</span>{" "}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    p.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Dates:</span>{" "}
                <span className="text-gray-400 font-semibold">
                  {p.startDate || "--"} → {p.endDate || "--"}
                </span>
              </div>

              <div>
                <span className="font-semibold text-gray-600">User Limit:</span>
                <span className="text-gray-600/70 font-semibold">
                  {" "}
                  {p.userLimit} times
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  Total Limit:
                </span>
                <span className="text-gray-600/70 font-semibold">
                  {" "}
                  {p.totalLimit} times
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Used:</span>
                <span className="text-gray-600/70 font-semibold">
                  {" "}
                  {p.usedCount} times
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="flex-1 px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white !rounded-md text-sm shadow-sm duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(p.id)}
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
      {selectedPromo && (
        <EditPromo
          promoData={selectedPromo}
          onSave={handleSave}
          onClose={() => setSelectedPromo(null)}
        />
      )}
    </div>
  );
}
