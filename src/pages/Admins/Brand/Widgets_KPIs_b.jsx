import React from "react";
import ActiveDiscounts from "../../../components/BRANDS_ADMIN_COMPONENTS/KPIsComponents/ActiveDiscounts";
import AverageOrderPrice from "../../../components/BRANDS_ADMIN_COMPONENTS/KPIsComponents/AverageOrderPrice";
import TotalProducts from "../../../components/BRANDS_ADMIN_COMPONENTS/KPIsComponents/TotalProducts";
import BrandRevenue from "../../../components/BRANDS_ADMIN_COMPONENTS/KPIsComponents/BrandRevenue";
import TotalOrders from "../../../components/BRANDS_ADMIN_COMPONENTS/KPIsComponents/TotalOrders";

const Widgets_KPIs_b = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly gap-1.5 mb-4">
        <div className="w-full lg:w-1/4">
          <TotalProducts />
        </div>
        <div className="w-full lg:w-1/4">
          <TotalOrders />
        </div>
        <div className="w-full lg:w-1/2">
          <BrandRevenue />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-evenly gap-2">
        <div className="w-full lg:w-1/2">
          <ActiveDiscounts />
        </div>
        <div className="w-full lg:w-1/2">
          <AverageOrderPrice />
        </div>
      </div>
    </>
  );
};

export default Widgets_KPIs_b;
