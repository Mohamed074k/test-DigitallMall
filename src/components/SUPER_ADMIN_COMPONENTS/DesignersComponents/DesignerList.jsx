import React, { useState } from "react";
import {
  FaCheck,
  FaTimes,
  FaBan,
  FaTrash,
  FaEye,
  FaEllipsisV,
} from "react-icons/fa";

const DesignerList = ({
  designers,
  handleApproveDesigner,
  handleRejectDesigner,
  handleSuspendDesigner,
  handleDeleteDesigner,
  handleViewDetails,
}) => {
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (designerId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [designerId]: !prev[designerId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Suspended":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden font-[poppins]">
      {/* ✅ Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Designer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Assigned Requests
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Earnings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {designers.map((designer) => (
              <tr key={designer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {designer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {designer.email}
                    </div>
                    <div className="text-sm text-gray-400">
                      {designer.location}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      designer.status
                    )}`}
                  >
                    {designer.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {designer.assignedRequests}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${designer.earnings.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleActions(designer.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {expandedActions[designer.id] ? (
                        <>
                          <FaTimes className="w-4 h-4 mr-2" /> Close
                        </>
                      ) : (
                        <>
                          <FaEllipsisV className="w-4 h-4 mr-2" /> Actions
                        </>
                      )}
                    </button>

                    {expandedActions[designer.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {designer.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApproveDesigner(designer)}
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                              >
                                <FaCheck className="w-4 h-4 mr-2" /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectDesigner(designer)}
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                              >
                                <FaTimes className="w-4 h-4 mr-2" /> Reject
                              </button>
                            </>
                          )}
                          {designer.status === "Active" && (
                            <button
                              onClick={() => handleSuspendDesigner(designer)}
                              className="w-full text-left px-4 py-2 text-sm text-orange-700 hover:bg-orange-50 flex items-center"
                            >
                              <FaBan className="w-4 h-4 mr-2" /> Suspend
                            </button>
                          )}
                          <button
                            onClick={() => handleViewDetails(designer)}
                            className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            <FaEye className="w-4 h-4 mr-2" /> View Details
                          </button>
                          <button
                            onClick={() => handleDeleteDesigner(designer)}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                          >
                            <FaTrash className="w-4 h-4 mr-2" /> Delete
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

      {/* ✅ Mobile Card Layout */}
      <div className="lg:hidden divide-y font-[poppins]">
        {designers.map((designer) => (
          <div key={designer.id} className="p-4 space-y-4 relative">
            {/* Mobile Actions */}
            <div className="absolute top-4 right-2">
              <button
                onClick={() => toggleActions(designer.id)}
                className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {expandedActions[designer.id] ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaEllipsisV className="w-5 h-5" />
                )}
              </button>

              {expandedActions[designer.id] && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {designer.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleApproveDesigner(designer)}
                          className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                        >
                          <FaCheck className="w-4 h-4 mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectDesigner(designer)}
                          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                        >
                          <FaTimes className="w-4 h-4 mr-2" /> Reject
                        </button>
                      </>
                    )}
                    {designer.status === "Active" && (
                      <button
                        onClick={() => handleSuspendDesigner(designer)}
                        className="w-full text-left px-4 py-2 text-sm text-orange-700 hover:bg-orange-50 flex items-center"
                      >
                        <FaBan className="w-4 h-4 mr-2" /> Suspend
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(designer)}
                      className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                    >
                      <FaEye className="w-4 h-4 mr-2" /> View Details
                    </button>
                    <button
                      onClick={() => handleDeleteDesigner(designer)}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                    >
                      <FaTrash className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-gray-900">{designer.name}</div>
                <div className="text-sm text-gray-500">{designer.email}</div>
                <div className="text-sm text-gray-400">{designer.location}</div>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Status: </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                  designer.status
                )}`}
              >
                {designer.status}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Requests: </span>
              {designer.assignedRequests}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Earnings: </span>$
              {designer.earnings.toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {designers.length === 0 && (
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No designers found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DesignerList;
