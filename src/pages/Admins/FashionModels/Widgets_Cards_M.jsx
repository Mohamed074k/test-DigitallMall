import React from "react";
import TotalReelsUploaded from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/TotalReelsUploaded";
import ViewsEngagement from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/ViewsEngagement";
import LikesEngagement from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/LikesEngagement";
import SharesEngagement from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/SharesEngagement";
import Earnings from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/Earnings";
import PendingPayoutRequests from "../../../components/Fashion_Model_Components/WidgetsCardsComponents/PendingPayoutRequests";

const Widgets_Cards_M = () => {
  return (
    <>
      <div className="flex flex-col gap-4">
        <TotalReelsUploaded />
        <div className="flex flex-col lg:flex-row gap-3">
          <div className="lg:w-1/3">
            <ViewsEngagement />
          </div>

          <div className="lg:w-1/3">
            <LikesEngagement />
          </div>

          <div className="lg:w-1/3">
            <SharesEngagement />
          </div>
        </div>
        <Earnings />
      </div>
    </>
  );
};

export default Widgets_Cards_M;
