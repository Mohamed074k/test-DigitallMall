import React from "react";
import RevenueCard from "../../../components/SUPER_ADMIN_COMPONENTS/KPIsComponents/RevenueCard";
import OrdersCard from "../../../components/SUPER_ADMIN_COMPONENTS/KPIsComponents/OrdersCard";
import UsersCard from "../../../components/SUPER_ADMIN_COMPONENTS/KPIsComponents/UsersCard";
import BrandsCard from "../../../components/SUPER_ADMIN_COMPONENTS/KPIsComponents/BrandsCard";
import ModelsCard from "../../../components/SUPER_ADMIN_COMPONENTS/KPIsComponents/ModelsCard";

const Widgets_KPIs = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <RevenueCard />
        </div>
        <div className="w-full md:w-1/2">
          <OrdersCard />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly gap-4">
        <div className="w-full md:w-1/4">
          <UsersCard />
        </div>
        <div className="w-full md:w-1/2">
          <BrandsCard />
        </div>
        <div className="w-full md:w-1/4">
          <ModelsCard />
        </div>
      </div>
    </>
  );
};

export default Widgets_KPIs;
