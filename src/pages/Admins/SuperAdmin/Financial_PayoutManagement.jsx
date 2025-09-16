import React, { useContext, useMemo } from "react";
import { PayoutContext } from "../../../context/superAdminContext/PayoutContext";
import Swal from "sweetalert2";
import PendingPayoutsList from "../../../components/SUPER_ADMIN_COMPONENTS/PayoutsComponents/PendingPayoutsList";
import ApprovedPayoutsList from "../../../components/SUPER_ADMIN_COMPONENTS/PayoutsComponents/ApprovedPayoutsList";
import PayoutHistoryList from "../../../components/SUPER_ADMIN_COMPONENTS/PayoutsComponents/PayoutHistoryList";
import RejectedPayoutsList from "../../../components/SUPER_ADMIN_COMPONENTS/PayoutsComponents/RejectedPayoutsList";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";

const Management_Payouts = () => {
  const {
    payouts,
    loading,
    error,
    approvePayout,
    rejectPayout,
    markAsPaidPayout,
    deletePayout,
  } = useContext(PayoutContext);

  const stats = useMemo(() => {
    const total = payouts.length;
    const pendingCount = payouts.filter((p) => p.status === "Pending").length;
    const approvedCount = payouts.filter((p) => p.status === "Approved").length;
    const paid = payouts.filter((p) => p.status === "Paid").length;
    const rejected = payouts.filter((p) => p.status === "Rejected").length;
    return {
      total,
      pending: pendingCount,
      approved: approvedCount,
      paid,
      rejected,
    };
  }, [payouts]);

  const filteredPendingPayouts = payouts.filter(
    (payout) => payout.status === "Pending"
  );

  const approvedPayouts = payouts.filter(
    (payout) => payout.status === "Approved"
  );

  const historyPayouts = payouts.filter((payout) => payout.status === "Paid");

  const rejectedPayouts = payouts.filter(
    (payout) => payout.status === "Rejected"
  );

  const handleAction = async (action, payout) => {
    const result = await Swal.fire({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} Payout?`,
      text: `Are you sure you want to ${action} ${payout.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action} it!`,
    });

    if (result.isConfirmed) {
      try {
        switch (action) {
          case "approve":
            await approvePayout(payout.id);
            break;
          case "reject":
            await rejectPayout(payout.id);
            break;
          case "mark as paid":
            await markAsPaidPayout(payout.id);
            break;
          case "delete":
            await deletePayout(payout.id);
            break;
          default:
            break;
        }
        Swal.fire("Success!", `Payout has been ${action}ed.`, "success");
      } catch (error) {
        Swal.fire("Error!", `Failed to ${action} payout.`, "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <strong className="font-bold">Error: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  return (
    <div className="p-2 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <StatsCards title="Total Payouts" stats={stats.total} />
        <StatsCards title="Pending Payouts" stats={stats.pending} />
        <StatsCards title="Approved Payouts" stats={stats.approved} />
        <StatsCards title="Paid Payouts" stats={stats.paid} />
        <StatsCards title="Rejected Payouts" stats={stats.rejected} />
      </div>

      <PendingPayoutsList
        payouts={filteredPendingPayouts}
        handleApprovePayout={(payout) => handleAction("approve", payout)}
        handleRejectPayout={(payout) => handleAction("reject", payout)}
      />

      <PayoutHistoryList
        payouts={historyPayouts}
        handleApprovePayout={(payout) => handleAction("approve", payout)}
        handleRejectPayout={(payout) => handleAction("reject", payout)}
        handleMarkAsPaidPayout={(payout) =>
          handleAction("mark as paid", payout)
        }
        handleDeletePayout={(payout) => handleAction("delete", payout)}
      />

      <ApprovedPayoutsList
        payouts={approvedPayouts}
        handleMarkAsPaidPayout={(payout) =>
          handleAction("mark as paid", payout)
        }
        handleDeletePayout={(payout) => handleAction("delete", payout)}
      />

      <RejectedPayoutsList
        payouts={rejectedPayouts}
        handleApprovePayout={(payout) => handleAction("approve", payout)}
        handleRejectPayout={(payout) => handleAction("reject", payout)}
        handleMarkAsPaidPayout={(payout) =>
          handleAction("mark as paid", payout)
        }
        handleDeletePayout={(payout) => handleAction("delete", payout)}
      />
    </div>
  );
};

export default Management_Payouts;
