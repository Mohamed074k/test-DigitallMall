import React from "react";
import TotalRequestsCard from "../../../components/DESIGNERS_ADMIN_COMPONENTS/CardsComponents/TotalRequestsCard";
import PendingRequestsCard from "../../../components/DESIGNERS_ADMIN_COMPONENTS/CardsComponents/PendingRequestsCard";
import CompletedDesignsCard from "../../../components/DESIGNERS_ADMIN_COMPONENTS/CardsComponents/CompletedDesignsCard";
import EarningsCard from "../../../components/DESIGNERS_ADMIN_COMPONENTS/CardsComponents/EarningsCard";

const Widgets_KPIs = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly gap-4 mb-4">
        <div className="w-full lg:w-1/3">
          <TotalRequestsCard />
        </div>
        <div className="w-full lg:w-1/3">
          <PendingRequestsCard />
        </div>
        <div className="w-full lg:w-1/3">
          <CompletedDesignsCard />
        </div>
      </div>

      <div className="lg:w-[1200px] mx-auto">
        <EarningsCard />
      </div>
    </>
  );
};

export default Widgets_KPIs;
