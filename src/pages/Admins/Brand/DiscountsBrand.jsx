// src/pages/AdminDiscounts.jsx
import { useBrandDiscountContext } from "../../../context/BrandContext/BrandDiscountsContext";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";
import AddDiscount from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/AddDiscount";
import AddPromo from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/AddPromo";
import EditDiscount from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/EditDiscount";
import EditPromo from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/EditPromo";
import DiscountsList from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/DiscountsList";
import PromoCodeList from "../../../components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/PromosList";

import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Tags } from "lucide-react";
function DiscountsBrand() {
  const {
    discounts,
    promoCodes,
    addDiscount,
    addPromoCode,
    discountStats,
    promoStats,
    editDiscount,
    editPromoCode,
    deleteDiscount,
    deletePromoCode,
  } = useBrandDiscountContext();

  const handleDeleteDiscount = (id) => {
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

  const handleDeletePromo = (id) => {
    const promo = promoCodes.find((p) => p.id === id);
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
        deletePromoCode(id);
        toast.success(`${promo?.code} deleted successfully!`);
      } else {
        toast.warning("Deletion cancelled!");
      }
    });
  };

  return (
    <div className="p-2">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 text-center">
        <StatsCards title="Total Discounts" stats={discountStats.total} />
        <StatsCards title="Active Discounts" stats={discountStats.active} />
        <StatsCards title="Inactive Discounts" stats={discountStats.inactive} />
        <StatsCards title="Promo Codes" stats={promoStats.total} />
      </div>
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row  justify-between mb-6">
        <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
          <Tags size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Discounts</span>&nbsp;Overview
        </p>

        <AddDiscount onAdd={addDiscount} />
      </div>
      <DiscountsList
        discounts={discounts}
        onDelete={handleDeleteDiscount}
        onUpdate={editDiscount}
      />
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <div className="flex flex-col gap-2 md:gap-0 md:flex-row  justify-between mb-6">
        <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
          <Tags size={22} className="text-gray-900/30 mt-1 animate-bounce" />
          <span className="text-gray-900 pl-4">Promo Codes</span>&nbsp;Overview
        </p>

        <AddPromo onAdd={addPromoCode} />
      </div>
      <PromoCodeList
        promoCodes={promoCodes}
        onDelete={handleDeletePromo}
        onUpdate={editPromoCode}
      />{" "}
    </div>
  );
}

export default DiscountsBrand;

