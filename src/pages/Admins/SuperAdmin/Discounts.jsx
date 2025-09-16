// src/pages/AdminDiscounts.jsx
import { useDiscounts } from "../../../context/superAdminContext/DiscountContext";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";
import AddDiscount from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/AddDiscount";
import DiscountList from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/DiscountList";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useState } from "react";
import EditDiscount from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/EditDiscount";

export default function AdminDiscounts() {
  const { discounts, addDiscount, editDiscount, deleteDiscount, stats } =
    useDiscounts();

  const [editItem, setEditItem] = useState(null);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDiscount(id);
        toast.success("Discount deleted successfully!");
      } else {
        toast.warning("Deletion cancelled!");
      }
    });
  };

  return (
    <div className="p-2">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 text-center">
        <StatsCards title="Total Discounts" stats={stats.total} />
        <StatsCards title="Active Discounts" stats={stats.active} />
        <StatsCards title="Inactive Discounts" stats={stats.inactive} />
      </div>

            {/* Add */}
      <div className="flex justify-end">
        <AddDiscount onAdd={addDiscount} />
      </div>

      {/* List */}
      <DiscountList
        discounts={discounts}
        onToggle={(id) =>
          editDiscount(id, {
            status:
              discounts.find((d) => d.id === id).status === "active"
                ? "inactive"
                : "active",
          })
        }
        onDelete={handleDelete}
        onEdit={(id) => setEditItem(discounts.find((d) => d.id === id))}
      />

      {/* Edit */}
      {editItem && (
        <EditDiscount
          discountData={editItem}
          onClose={() => setEditItem(null)}
          onSave={(id, updated) => {
            editDiscount(id, updated);
            toast.success("Discount updated successfully!");
          }}
        />
      )}
    </div>
  );
}
