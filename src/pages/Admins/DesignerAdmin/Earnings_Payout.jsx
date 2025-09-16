import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaMoneyCheckAlt, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";
import { useEarnings } from "../../../context/designerContext/DesignerEarningsContext";

const Earnings_Payout = () => {
  const {
    totalEarnings,
    currentCommission,
    earningsBreakdown,
    requestedPayouts,
    requestPayout,
    markAsPaidPayout,
    deletePayout,
  } = useEarnings();

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (payoutId) => {
    setExpandedActions((prev) => {
      // Close all other menus when opening a new one
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
      
      return {
        ...newState,
        [payoutId]: !prev[payoutId],
      };
    });
  };

  const closeAllActions = () => {
    setExpandedActions({});
  };

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

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    const success = await requestPayout(parseFloat(payoutAmount));
    if (success) {
      toast.success("Payout request submitted successfully!");
      setPayoutAmount("");
      setShowPayoutModal(false);
      closeAllActions();
    } else {
      toast.error("Failed to submit payout request.");
    }
  };

  const handleAction = async (action, payout, actionName) => {
    const actionMessages = {
      markAsPaid: {
        title: "Mark as Paid",
        text: "Are you sure you want to mark this payout as paid?",
        confirmButtonText: "Yes, Mark as Paid",
        successMessage: "Payout marked as paid!",
      },
      delete: {
        title: "Delete Payout",
        text: "Are you sure you want to delete this payout? This action cannot be undone.",
        confirmButtonText: "Yes, Delete",
        successMessage: "Payout deleted!",
      },
    };

    const { title, text, confirmButtonText, successMessage } =
      actionMessages[actionName];

    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    });

    if (result.isConfirmed) {
      try {
        let success;
        switch (actionName) {
          case "markAsPaid":
            success = await markAsPaidPayout(payout);
            break;
          case "delete":
            success = await deletePayout(payout);
            break;
          default:
            return;
        }
        if (success) {
          toast.success(successMessage);
          closeAllActions();
        } else {
          toast.error(`Failed to ${actionName} payout`);
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
    toggleActions(payout.id);
  };

  return (
    <div className="font-[poppins]">
      {/* Title */}
      <div className="mb-6">
        <p className="flex items-center text-3xl font-semibold text-gray-900/50">
          <ShieldCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">My</span>&nbsp;Earnings
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 ">
        <StatsCards
          title={"Total Earnings"}
          stats={`${totalEarnings.toFixed(2)} LE`}
        />
        <StatsCards
          title={"Current Commission"}
          stats={`${currentCommission} %`}
        />
      </div>

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Earnings Breakdown */}
      <div className="rounded-lg mb-6 bg-gray-50 p-4 shadow-sm">
        <div className="mb-6">
          <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
            <ShieldCheck
              size={22}
              className="text-gray-900/30 mt-1 animate-bounce"
            />
            <span className="text-gray-900 pl-4">Earnings</span>&nbsp;Breakdown
          </p>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-lg ">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-sm rounded-lg">
            <thead className="bg-gray-100 ">
              <tr>
                {["ID", "Submission Date", "Name", "Price"].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-md font-bold bg-gray-200 text-black uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {earningsBreakdown.length > 0 ? (
                earningsBreakdown.map((earning) => (
                  <tr key={earning.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-md text-gray-900">
                      {earning.id}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      {earning.submissionDate}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      {earning.name}
                    </td>
                    <td className="px-6 py-4 text-md text-gray-900">
                      ${earning.price.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-12">
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
                      No earnings found
                    </h3>
                    <p className="text-gray-500">
                      No earnings have been recorded yet.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {earningsBreakdown.length > 0 ? (
            earningsBreakdown.map((earning) => (
              <div
                key={earning.id}
                className="p-4 space-y-4 bg-white rounded-lg shadow-lg mb-3"
              >
                <div>
                  <span className="font-semibold text-gray-600">ID: </span>
                  {earning.id}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">
                    Submission Date:{" "}
                  </span>
                  {earning.submissionDate}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Name: </span>
                  {earning.name}
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Price: </span>$
                  {earning.price.toFixed(2)}
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
                No earnings found
              </h3>
              <p className="text-gray-500">
                No earnings have been recorded yet.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Requested Payouts Table */}
      <div className="rounded-lg">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
            <ShieldCheck
              size={22}
              className="text-gray-900/30 mt-1 animate-bounce"
            />
            <span className="text-gray-900 pl-4">Requested</span>&nbsp;Payouts
          </p>
          <button
            onClick={() =>{
               setShowPayoutModal(true)
              closeAllActions();
            }}
            className="w-full md:w-48 p-2 font-[poppins] text-white !rounded-lg !bg-black hover:!bg-gray-900/80 duration-300 flex justify-center items-center"
          >
            <FaMoneyCheckAlt className="w-6 md:w-4 md:h-4 mr-2" /> New Payout
          </button>
        </div>
        <div className="rounded-lg shadow overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["ID", "Request Date", "Amount", "Status", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-6 py-3 text-left text-md font-bold bg-gray-200 text-black uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requestedPayouts.length > 0 ? (
                  requestedPayouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {payout.requestDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${payout.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                            payout.status
                          )}`}
                        >
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="relative">
                          <button
                            onClick={() => toggleActions(payout.id)}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                            aria-label="Toggle actions"
                          >
                            {expandedActions[payout.id] ? (
                              <>
                                <FaTimes className="w-4 h-4 mr-2" />
                                Close
                              </>
                            ) : (
                              <>
                                <FaEllipsisV className="w-4 h-4 mr-2" />
                                Actions
                              </>
                            )}
                          </button>
                          {expandedActions[payout.id] && (
                            <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                              <div className="py-1">
                                {/* {payout.status === "Approved" && (
                                  <button
                                    onClick={() => handleAction(markAsPaidPayout, payout, "markAsPaid")}
                                    className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                                  >
                                    <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
                                    Mark as Paid
                                  </button>
                                )} */}
                                <button
                                  onClick={() =>
                                    handleAction(deletePayout, payout, "delete")
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                                >
                                  <FaTrash className="w-4 h-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
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
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y">
            {requestedPayouts.length > 0 ? (
              requestedPayouts.map((payout) => (
                <div key={payout.id} className="p-4 space-y-2 relative">
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
                    ${payout.amount.toFixed(2)}
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
                  <div className="mt-3">
                    <button
                      onClick={() => toggleActions(payout.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      aria-label="Toggle actions"
                    >
                      {expandedActions[payout.id] ? (
                        <>
                          <FaTimes className="w-4 h-4 mr-2" />
                          Close
                        </>
                      ) : (
                        <>
                          <FaEllipsisV className="w-4 h-4 mr-2" />
                          Actions
                        </>
                      )}
                    </button>
                    {expandedActions[payout.id] && (
                      <div className="absolute left-4 bottom-[-2px] translate-y-[-100%] w-48 bg-white rounded-md shadow-lg z-20 border border-gray-200">
                        <div className="py-1">
                          {payout.status === "Approved" && (
                            <button
                              onClick={() =>
                                handleAction(
                                  markAsPaidPayout,
                                  payout,
                                  "markAsPaid"
                                )
                              }
                              className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                            >
                              <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
                              Mark as Paid
                            </button>
                          )}
                          <button
                            onClick={() =>
                              handleAction(deletePayout, payout, "delete")
                            }
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                          >
                            <FaTrash className="w-4 h-4 mr-2" />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
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

        {/* Payout Request Modal */}
        <Modal
          show={showPayoutModal}
          onHide={() =>{
          setShowPayoutModal(false)
          closeAllActions();
          }}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="fw-bold">Request New Payout</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white" }}>
            <Form onSubmit={handlePayoutRequest}>
              <div className="font-[poppins] mb-3">
                <Form.Control
                  type="number"
                  placeholder="Enter payout amount"
                  value={payoutAmount}
                  className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
                  onChange={(e) => setPayoutAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>
              <button
                type="submit"
                className="w-full p-2 font-[poppins] !rounded-lg text-white bg-black hover:bg-gray-900/80 duration-300 flex justify-center items-center"
              >
                <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
                Submit Request
              </button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Earnings_Payout;
