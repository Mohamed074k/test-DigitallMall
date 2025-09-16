import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { ShieldCheck } from "lucide-react";
import { FaMoneyCheckAlt } from "react-icons/fa";
import PendingAndPaidAmounts from "../../../components/Fashion_Model_Components/modelEarningsComponents/PendingAndPaidAmounts";
import PayoutHistory from "../../../components/Fashion_Model_Components/modelEarningsComponents/PayoutHistory";
import RequestPayout from "../../../components/Fashion_Model_Components/modelEarningsComponents/RequestPayout";
import { useModelEarnings } from "../../../context/modelContext/ModelEarningsContext";

const ModelEarnings = () => {
  const { earningsBreakdown, filterEarnings } = useModelEarnings();
  const [showPayoutModal, setShowPayoutModal] = useState(false);
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

  return (
    <div className="font-[poppins]">
      {/* Title */}
      <div className="mb-6">
        <p className="flex items-center text-3xl font-semibold text-gray-900/50">
          <ShieldCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Model</span>&nbsp;Earnings
        </p>
      </div>

      {/* Overview Cards */}
      <PendingAndPaidAmounts />

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Earnings Reports */}
      <div className="rounded-lg mb-6 bg-gray-50 p-4 shadow-sm">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
            <ShieldCheck
              size={22}
              className="text-gray-900/30 mt-1 animate-bounce"
            />
            <span className="text-gray-900 pl-4">Commissions</span>&nbsp;Reports
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
            <div>Type</div>
            <div>Amount</div>
          </div>
          <div className="divide-y border rounded-b-lg">
            {filteredEarnings.length > 0 ? (
              filteredEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50 transition-all"
                >
                  <div className="text-center text-md text-gray-900">
                    {earning.id}
                  </div>
                  <div className="text-center text-md text-gray-900">
                    {earning.submissionDate}
                  </div>
                  <div className="text-center text-md text-gray-900">
                    {earning.type}
                  </div>
                  <div className="text-center text-md text-gray-900">
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
                  No commissions found
                </h3>
                <p className="text-gray-500">
                  No commissions have been recorded for the selected period.
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
                  <span className="font-semibold text-gray-600">Type: </span>
                  {earning.type}
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
                ></svg>

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No commissions found
              </h3>
              <p className="text-gray-500">
                No commissions have been recorded for the selected period.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="w-2/3 mx-auto border-t border-gray-400/30 my-12"></div>

      {/* Requested Payouts */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="flex items-center text-xl lg:text-3xl font-semibold text-gray-900/50">
          <ShieldCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Requested</span>&nbsp;Payouts
        </p>
        <button
          onClick={() => setShowPayoutModal(true)}
          className="w-full md:w-48 p-2 font-[poppins] text-white !rounded-lg !bg-black shadow-md duration-300 flex justify-center items-center"
        >
          <FaMoneyCheckAlt className="w-6 md:w-4 md:h-4 mr-2" />
          New Payout
        </button>
      </div>
      <PayoutHistory />

      {/* Payout Request Modal */}
      <RequestPayout
        show={showPayoutModal}
        onHide={() => setShowPayoutModal(false)}
      />
    </div>
  );
};

export default ModelEarnings;
