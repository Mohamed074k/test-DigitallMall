import React, { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCheck,
  FaBan,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";

const ModelList = ({
  models,
  handleApproveModel,
  handleRejectModel,
  handleSuspendModel,
  handleUnsuspendModel,
  handleDeleteModel,
  handleEditCommission,
  handleViewDetails,
}) => {
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (modelId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [modelId]: !prev[modelId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      case "Rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 hidden lg:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Commission Rate
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Earnings
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {models.map((model) => (
              <tr key={model.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {model.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {model.location}
                      </div>
                      <div className="text-sm text-gray-400">
                        {model.age} years • {model.height}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      model.status
                    )}`}
                  >
                    {model.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {model.commissionRate}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${model.earnings.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    <div className="font-medium">
                      {model.performance.totalViews.toLocaleString()}
                    </div>
                    <div className="text-gray-500">views</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleActions(model.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {expandedActions[model.id] ? (
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
                    {expandedActions[model.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {model.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApproveModel(model)}
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                              >
                                <FaCheck className="w-4 h-4 mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectModel(model)}
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                              >
                                <FaBan className="w-4 h-4 mr-2" />
                                Reject
                              </button>
                            </>
                          )}
                          {model.status !== "Suspended" &&
                            model.status !== "Rejected" && (
                              <button
                                onClick={() => handleSuspendModel(model)}
                                className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                              >
                                <FaBan className="w-4 h-4 mr-2" />
                                Suspend
                              </button>
                            )}
                          {model.status === "Suspended" && (
                            <button
                              onClick={() => handleUnsuspendModel(model)}
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <FaCheck className="w-4 h-4 mr-2" />
                              Unsuspend
                            </button>
                          )}
                          <button
                            onClick={() => handleEditCommission(model)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <FaEdit className="w-4 h-4 mr-2" />
                            Edit Commission
                          </button>
                          <button
                            onClick={() => handleViewDetails(model)}
                            className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            <FaEye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteModel(model)}
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

        {/* Mobile View */}
        <div className="space-y-6 font-[poppins] lg:hidden p-4">
          {models.map((model) => (
            <div
              key={model.id}
              className="bg-white border rounded-lg shadow p-4 relative"
            >
              {/* زرار الأكشنز فوق يمين */}
              <div className="absolute top-4 right-2">
                <button
                  onClick={() => toggleActions(model.id)}
                  className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  {expandedActions[model.id] ? (
                    <FaTimes className="w-5 h-5" />
                  ) : (
                    <FaEllipsisV className="w-5 h-5" />
                  )}
                </button>

                {expandedActions[model.id] && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                    <div className="py-1">
                      {model.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleApproveModel(model)}
                            className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                          >
                            <FaCheck className="w-4 h-4 mr-2" /> Approve
                          </button>
                          <button
                            onClick={() => handleRejectModel(model)}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                          >
                            <FaBan className="w-4 h-4 mr-2" /> Reject
                          </button>
                        </>
                      )}
                      {model.status !== "Suspended" &&
                        model.status !== "Rejected" && (
                          <button
                            onClick={() => handleSuspendModel(model)}
                            className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                          >
                            <FaBan className="w-4 h-4 mr-2" /> Suspend
                          </button>
                        )}
                      {model.status === "Suspended" && (
                        <button
                          onClick={() => handleUnsuspendModel(model)}
                          className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                        >
                          <FaCheck className="w-4 h-4 mr-2" /> Unsuspend
                        </button>
                      )}
                      <button
                        onClick={() => handleEditCommission(model)}
                        className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                      >
                        <FaEdit className="w-4 h-4 mr-2" /> Edit Commission
                      </button>
                      <button
                        onClick={() => handleViewDetails(model)}
                        className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                      >
                        <FaEye className="w-4 h-4 mr-2" /> View Details
                      </button>
                      <button
                        onClick={() => handleDeleteModel(model)}
                        className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                      >
                        <FaTrash className="w-4 h-4 mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* باقي بيانات الكارد */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-gray-900">
                  {model.name}
                </div>
                <div className="text-sm text-gray-500">{model.location}</div>
                <div className="text-sm text-gray-400">
                  {model.age} years • {model.height}
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <span className="font-semibold text-gray-600">Status: </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                    model.status
                  )}`}
                >
                  {model.status}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-600">
                <p>
                  <strong>Commission:</strong> {model.commissionRate}%
                </p>
                <p>
                  <strong>Earnings:</strong> ${model.earnings.toFixed(2)}
                </p>
                <p>
                  <strong>Performance:</strong>{" "}
                  {model.performance.totalViews.toLocaleString()} views
                </p>
              </div>
            </div>
          ))}
        </div>

        {models.length === 0 && (
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No models found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelList;
