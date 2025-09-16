import React, { useState } from "react";
import { FaMoneyCheckAlt, FaEllipsisV, FaTimes, FaTrash } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";

const ApprovedPayoutsList = ({
  payouts,
  handleMarkAsPaidPayout,
  handleDeletePayout,
}) => {
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (payoutId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [payoutId]: !prev[payoutId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Paid":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="mt-20 font-[poppins]">
      {/* ✅ العنوان منفرد */}
      <div className="mb-6">
        <p className="flex items-center text-3xl font-semibold text-gray-900/50 font-[poppins]">
          <ShieldCheck
            size={22}
            className="text-gray-900/30 mt-1 animate-bounce"
          />
          <span className="text-gray-900 pl-4">Approved</span>&nbsp;Payouts
        </p>
      </div>

      <div className="rounded-lg shadow overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payouts.map((payout) => (
                <tr key={payout.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payout.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payout.type}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payout.requestDate}
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
                            <button
                              onClick={() => {
                                handleMarkAsPaidPayout(payout);
                                toggleActions(payout.id);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                            >
                              <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
                              Mark as Paid
                            </button>
                            <button
                              onClick={() => {
                                handleDeletePayout(payout);
                                toggleActions(payout.id);
                              }}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card Layout */}
        <div className="md:hidden divide-y">
          {payouts.map((payout) => (
            <div key={payout.id} className="p-4 space-y-2 relative">
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium text-gray-900">{payout.name}</div>
                </div>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Type: </span>
                {payout.type}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Amount: </span>$
                {payout.amount.toFixed(2)}
              </div>
              <div>
                <span className="font-semibold text-gray-600">Status: </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                    payout.status
                  )}`}
                >
                  {payout.status}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">
                  Request Date:{" "}
                </span>
                {payout.requestDate}
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
                        onClick={() => {
                          handleMarkAsPaidPayout(payout);
                          toggleActions(payout.id);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                      >
                        <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => {
                          handleDeletePayout(payout);
                          toggleActions(payout.id);
                        }}
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
          ))}
        </div>

        {/* Empty State */}
        {payouts.length === 0 && (
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
              No approved payouts found
            </h3>
            <p className="text-gray-500">No payouts have been approved yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovedPayoutsList;
