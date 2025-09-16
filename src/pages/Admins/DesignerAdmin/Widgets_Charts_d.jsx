import React from "react";
import RequestsChart from "../../../components/DESIGNERS_ADMIN_COMPONENTS/ChartsComponents/RequestsChart";
import EarningsChart from "../../../components/DESIGNERS_ADMIN_COMPONENTS/ChartsComponents/EarningsChart";

const Widgets_Charts_d = () => {
  return (
    <div className="mt-5 min-h-screen">
      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <RequestsChart />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-6"></div>
      <EarningsChart />
    </div>
  );
};

export default Widgets_Charts_d;
