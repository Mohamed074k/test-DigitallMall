import React from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { useModelEarnings } from "../../../context/modelContext/ModelEarningsContext";

const PayoutHistory = () => {
  const { requestedPayouts, deletePayout } = useModelEarnings();

  // Debug logging to check requestedPayouts
  console.log("requestedPayouts:", requestedPayouts);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleDeletePayout = async (payout) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This payout will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const success = await deletePayout(payout);
        if (success) {
          toast.success("Payout deleted successfully");
        } else {
          toast.error("Failed to delete payout");
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="font-[poppins]">
      <div className="rounded-t-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <div className="hidden md:grid grid-cols-6 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>ID</div>
            <div>Request Date</div>
            <div>Amount</div>
            <div>Method</div>
            <div>Status</div>
            <div>Actions</div>
          </div>
          <div className="divide-y border rounded-b-lg">
            {requestedPayouts.length > 0 ? (
              requestedPayouts.map((payout) => (
                <div
                  key={payout.id}
                  className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
                >
                  <div className="text-center text-sm text-gray-900">{payout.id}</div>
                  <div className="text-center text-sm text-gray-900">{payout.requestDate}</div>
                  <div className="text-center text-sm text-gray-900">{payout.amount.toFixed(2)} LE</div>
                  <div className="text-center text-sm text-gray-900">{payout.method}</div>
                  <div className="text-center">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        payout.status
                      )}`}
                    >
                      {payout.status}
                    </span>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleDeletePayout(payout)}
                      className="text-red-500 hover:text-red-700 transition"
                      aria-label="Delete payout"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No payouts found
                </h3>
                <p className="text-gray-500">
                  No payout requests have been made yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y rounded rounded-b-lg">
          {requestedPayouts.length > 0 ? (
            requestedPayouts.map((payout) => (
              <div key={payout.id} className="p-4 space-y-2">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      Payout {payout.id}
                    </div>
                  </div>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Request Date:{" "}
                  </span>
                  {payout.requestDate}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Amount:{" "}
                  </span>
                  {payout.amount.toFixed(2)} LE
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Method:{" "}
                  </span>
                  {payout.method}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Status:{" "}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                      payout.status
                    )}`}
                  >
                    {payout.status}
                  </span>
                </div>
                <div className="flex justify-end items-center gap-3 pt-2">
                  <button
                    onClick={() => handleDeletePayout(payout)}
                    className="text-red-500 hover:text-red-700 transition "
                    aria-label="Delete payout"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No payouts found
              </h3>
              <p className="text-gray-500">
                No payout requests have been made yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PayoutHistory;