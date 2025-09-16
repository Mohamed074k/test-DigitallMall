import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaMoneyCheckAlt, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";
import StatsCards from "../../../components/SUPER_ADMIN_COMPONENTS/DiscountsComponents/StatsCards";
import { useBrandEarnings } from "../../../context/brandContext/BrandEarningsContext";

const FinancialEarnings = () => {
  const {
    totalRevenue,
    pendingPayments,
    commissionDeductions,
    earningsBreakdown,
    requestedPayouts,
    requestPayout,
    deletePayout,
    filterEarnings,
  } = useBrandEarnings();

  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("");
  const [expandedActions, setExpandedActions] = useState({});
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filteredEarnings, setFilteredEarnings] = useState(earningsBreakdown);

  useEffect(() => {
    const applyFilters = async () => {
      const filtered = await filterEarnings(filterMonth, filterYear);
      setFilteredEarnings(filtered);
    };
    applyFilters();
  }, [filterMonth, filterYear, earningsBreakdown, filterEarnings]);

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
    if (!payoutMethod) {
      toast.error("Please select a payout method.");
      return;
    }
    const success = await requestPayout(parseFloat(payoutAmount), payoutMethod);
    if (success) {
      toast.success("Payout request submitted successfully!");
      setPayoutAmount("");
      setPayoutMethod("");
      setShowPayoutModal(false);
      closeAllActions();
    } else {
      toast.error("Failed to submit payout request.");
    }
  };

  const handleDeletePayout = async (payout) => {
    const result = await Swal.fire({
      title: "Delete Payout",
      text: "Are you sure you want to delete this payout? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const success = await deletePayout(payout);
        if (success) {
          toast.success("Payout deleted!");
        } else {
          toast.error("Failed to delete payout");
        }
      } catch (err) {
        toast.error(`Error: ${err.message}`);
      }
    }
    closeAllActions();
  };

  const months = [
    { value: "", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const years = [
    { value: "", label: "All Years" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
    { value: "2025", label: "2025" },
  ];

  const payoutMethods = [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Wallet", label: "Wallet" },
    { value: "PayPal", label: "PayPal" },
  ];

  return (
    <div className="font-[poppins]">
      {/* Title */}
      <div className="mb-6">
        <p className="flex items-center text-3xl font-semibold text-gray-900/50">
          <ShieldCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Financial</span>&nbsp;Earnings
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatsCards
          title="Total Revenue"
          stats={`${totalRevenue.toFixed(2)} LE`}
        />
        <StatsCards
          title="Pending Payments"
          stats={`${pendingPayments.toFixed(2)} LE`}
        />
        <StatsCards
          title="Commission Deductions"
          stats={`${commissionDeductions.toFixed(2)} LE`}
        />
      </div>

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Earnings Reports */}
      <div className="rounded-lg mb-6 bg-gray-50 p-4 shadow-sm">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
            <ShieldCheck
              size={22}
              className="text-gray-900/30 mt-1 animate-bounce"
            />
            <span className="text-gray-900 pl-4">Earnings</span>&nbsp;Reports
          </p>
          <div className="flex w-full md:w-128 flex-col md:flex-row gap-4">
            <Form.Select
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="p-2 border-gray-300 rounded-lg min-w-[220px] cursor-pointer shadow-md"
            >
              {months.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </Form.Select>
            <Form.Select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="p-2 border-gray-300 rounded-lg min-w-[220px] cursor-pointer shadow-md"
            >
              {years.map((year) => (
                <option key={year.value} value={year.value}>
                  {year.label}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto rounded-t-lg">
          <div className="hidden md:grid grid-cols-4 gap-4 font-semibold bg-gray-100 p-4 rounded-t-lg text-center text-gray-700">
            <div>ID</div>
            <div>Submission Date</div>
            <div>Name</div>
            <div>Amount</div>
          </div>
          <div className="divide-y border rounded-b-lg">
            {filteredEarnings.length > 0 ? (
              filteredEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
                >
                  <div className="text-center text-md text-gray-900">{earning.id}</div>
                  <div className="text-center text-md text-gray-900">{earning.submissionDate}</div>
                  <div className="text-center text-md text-gray-900">{earning.name}</div>
                  <div className="text-center text-md text-gray-900">{earning.amount.toFixed(2)} LE</div>
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
                  No earnings have been recorded for the selected period.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {filteredEarnings.length > 0 ? (
            filteredEarnings.map((earning) => (
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
                  <span className="font-semibold text-gray-600">Amount: </span>
                  {earning.amount.toFixed(2)} LE
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
                No earnings have been recorded for the selected period.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Requested Payouts */}
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
            onClick={() => {
              setShowPayoutModal(true);
              closeAllActions();
            }}
            className="w-full md:w-48 p-2 font-[poppins] text-white !rounded-lg !bg-black shadow-md duration-300 flex justify-center items-center"
          >
            <FaMoneyCheckAlt className="w-6 md:w-4 md:h-4 mr-2" />
            New Payout
          </button>
        </div>
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
                    <div className="flex justify-center gap-3 relative">
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
                            <button
                              onClick={() => handleDeletePayout(payout)}
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

          {/* Mobile Cards */}
          <div className="md:hidden divide-y rounded rounded-b-lg">
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
                          <button
                            onClick={() => handleDeletePayout(payout)}
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
          onHide={() => {
            setShowPayoutModal(false);
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
              <div className="font-[poppins] mb-3">
                <Form.Select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value)}
                  className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
                  required
                >
                  <option value="">Select Payout Method</option>
                  {payoutMethods.map((method) => (
                    <option key={method.value} value={method.value}>
                      {method.label}
                    </option>
                  ))}
                </Form.Select>
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

export default FinancialEarnings;