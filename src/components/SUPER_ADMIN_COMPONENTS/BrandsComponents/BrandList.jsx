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

const BrandList = ({
  brands,
  handleApproveBrand,
  handleRejectBrand,
  handleSuspendBrand,
  handleUnsuspendBrand,
  handleDeleteBrand,
  handleEditCommission,
  handleViewDetails,
}) => {
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (brandId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [brandId]: !prev[brandId],
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
    <div className="bg-white rounded-lg shadow overflow-hidden font-[poppins]">
      {/* ✅ Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Commission
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Joined Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.map((brand) => (
              <tr key={brand.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {brand.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {brand.info?.description?.substring(0, 50)}...
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      brand.status
                    )}`}
                  >
                    {brand.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {brand.commissionRate || 0}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {brand.joinedDate || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleActions(brand.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {expandedActions[brand.id] ? (
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
                    {expandedActions[brand.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {brand.status === "Pending" && (
                            <>
                              <button
                                onClick={() => handleApproveBrand(brand)}
                                className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                              >
                                <FaCheck className="w-4 h-4 mr-2" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleRejectBrand(brand)}
                                className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                              >
                                <FaBan className="w-4 h-4 mr-2" />
                                Reject
                              </button>
                            </>
                          )}
                          {brand.status !== "Suspended" &&
                            brand.status !== "Rejected" && (
                              <button
                                onClick={() => handleSuspendBrand(brand)}
                                className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                              >
                                <FaBan className="w-4 h-4 mr-2" />
                                Suspend
                              </button>
                            )}
                          {brand.status === "Suspended" && (
                            <button
                              onClick={() => handleUnsuspendBrand(brand)}
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <FaCheck className="w-4 h-4 mr-2" />
                              Unsuspend
                            </button>
                          )}
                          <button
                            onClick={() => handleEditCommission(brand)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <FaEdit className="w-4 h-4 mr-2" />
                            Edit Commission
                          </button>
                          <button
                            onClick={() => handleViewDetails(brand)}
                            className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            <FaEye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteBrand(brand)}
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

      {/* ✅ Mobile Card Layout */}
      <div className="lg:hidden divide-y font-[poppins]">
        {brands.map((brand) => (
          <div key={brand.id} className="p-4 space-y-4 relative">
            {/* زرار الأكشنز فوق يمين */}
            <div className="absolute top-2 right-2">
              <button
                onClick={() => toggleActions(brand.id)}
                className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {expandedActions[brand.id] ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaEllipsisV className="w-5 h-5" />
                )}
              </button>

              {expandedActions[brand.id] && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {brand.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleApproveBrand(brand)}
                          className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                        >
                          <FaCheck className="w-4 h-4 mr-2" /> Approve
                        </button>
                        <button
                          onClick={() => handleRejectBrand(brand)}
                          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                        >
                          <FaBan className="w-4 h-4 mr-2" /> Reject
                        </button>
                      </>
                    )}
                    {brand.status !== "Suspended" &&
                      brand.status !== "Rejected" && (
                        <button
                          onClick={() => handleSuspendBrand(brand)}
                          className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                        >
                          <FaBan className="w-4 h-4 mr-2" /> Suspend
                        </button>
                      )}
                    {brand.status === "Suspended" && (
                      <button
                        onClick={() => handleUnsuspendBrand(brand)}
                        className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                      >
                        <FaCheck className="w-4 h-4 mr-2" /> Unsuspend
                      </button>
                    )}
                    <button
                      onClick={() => handleEditCommission(brand)}
                      className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                    >
                      <FaEdit className="w-4 h-4 mr-2" /> Edit Commission
                    </button>
                    <button
                      onClick={() => handleViewDetails(brand)}
                      className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                    >
                      <FaEye className="w-4 h-4 mr-2" /> View Details
                    </button>
                    <button
                      onClick={() => handleDeleteBrand(brand)}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                    >
                      <FaTrash className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* باقي بيانات البراند */}
            <div className="flex items-center gap-3">
              <div>
                <div className="font-medium text-gray-900">{brand.name}</div>
                <div className="text-sm text-gray-500 w-[250px]">
                  {brand.info?.description}
                </div>
              </div>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Status: </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                  brand.status
                )}`}
              >
                {brand.status}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Commission: </span>
              {brand.commissionRate || 0}%
            </div>
            <div>
              <span className="font-semibold text-gray-600">Joined: </span>
              {brand.joinedDate || "N/A"}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {brands.length === 0 && (
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
            No brands found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandList;
