import React from "react";
import StatsCards from "../../SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";
import { useModelEarnings } from "../../../context/modelContext/ModelEarningsContext";

const PendingAndPaidAmounts = () => {
  const { totalCommissions, pendingAmounts, paidAmounts } = useModelEarnings();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <StatsCards title="Total Commissions" stats={`${totalCommissions.toFixed(2)} LE`} />
      <StatsCards title="Pending Amounts" stats={`${pendingAmounts.toFixed(2)} LE`} />
      <StatsCards title="Paid Amounts" stats={`${paidAmounts.toFixed(2)} LE`} />
    </div>
  );
};

export default PendingAndPaidAmounts;