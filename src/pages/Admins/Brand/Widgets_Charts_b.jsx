import React from "react";
import BrandSalesChart from "../../../components/BRANDS_ADMIN_COMPONENTS/ChartsComponents/BrandSalesChart";
import TopSellingProducts from "../../../components/BRANDS_ADMIN_COMPONENTS/ChartsComponents/TopSellingProducts";

const Widgets_Charts_b = () => {
  return (
    <div className="mt-5 min-h-screen">
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <BrandSalesChart />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <TopSellingProducts />
      
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
    </div>
  );
};

export default Widgets_Charts_b;
