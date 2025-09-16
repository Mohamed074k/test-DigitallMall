import React, { useState } from "react";
import {
  FaBan,
  FaUnlock,
  FaTrash,
  FaEye,
  FaKey,
  FaEllipsisV,
  FaTimes,
} from "react-icons/fa";

const UserList = ({
  users,
  handleBlockUser,
  handleUnblockUser,
  handleDeleteUser,
  handleResetPassword,
  handleViewDetails,
}) => {
  const [expandedActions, setExpandedActions] = useState({});

  const toggleActions = (userId) => {
    setExpandedActions((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Blocked":
        return "bg-red-100 text-red-800";
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
              {[
                "User",
                "Status",
                "Orders Count",
                "Total Spent",
                "Join Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium bg-gray-200 text-black uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* User */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                    <div className="text-sm text-gray-400">{user.location}</div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {user.ordersCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${user.totalSpent.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.joinDate}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="relative">
                    <button
                      onClick={() => toggleActions(user.id)}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      {expandedActions[user.id] ? (
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
                    {expandedActions[user.id] && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                        <div className="py-1">
                          {user.status === "Active" ? (
                            <button
                              onClick={() => handleBlockUser(user)}
                              className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                            >
                              <FaBan className="w-4 h-4 mr-2" />
                              Block User
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUnblockUser(user)}
                              className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                            >
                              <FaUnlock className="w-4 h-4 mr-2" />
                              Unblock User
                            </button>
                          )}
                          <button
                            onClick={() => handleResetPassword(user)}
                            className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                          >
                            <FaKey className="w-4 h-4 mr-2" />
                            Reset Password
                          </button>
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                          >
                            <FaEye className="w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                          >
                            <FaTrash className="w-4 h-4 mr-2" />
                            Delete User
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

      {/* ✅ Mobile Cards */}
      <div className="lg:hidden divide-y font-[poppins]">
        {users.map((user) => (
          <div key={user.id} className="p-4 space-y-4 relative">
            {/* زرار الأكشنز فوق يمين */}
            <div className="absolute top-4 right-2">
              <button
                onClick={() => toggleActions(user.id)}
                className="p-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                {expandedActions[user.id] ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaEllipsisV className="w-5 h-5" />
                )}
              </button>

              {expandedActions[user.id] && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                  <div className="py-1">
                    {user.status === "Active" ? (
                      <button
                        onClick={() => handleBlockUser(user)}
                        className="w-full text-left px-4 py-2 text-sm text-yellow-700 hover:bg-yellow-50 flex items-center"
                      >
                        <FaBan className="w-4 h-4 mr-2" />
                        Block User
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUnblockUser(user)}
                        className="w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50 flex items-center"
                      >
                        <FaUnlock className="w-4 h-4 mr-2" />
                        Unblock User
                      </button>
                    )}
                    <button
                      onClick={() => handleResetPassword(user)}
                      className="w-full text-left px-4 py-2 text-sm text-blue-700 hover:bg-blue-50 flex items-center"
                    >
                      <FaKey className="w-4 h-4 mr-2" />
                      Reset Password
                    </button>
                    <button
                      onClick={() => handleViewDetails(user)}
                      className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center"
                    >
                      <FaEye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center"
                    >
                      <FaTrash className="w-4 h-4 mr-2" />
                      Delete User
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* باقي بيانات الكارد */}
            <div className="flex flex-col ">
              <p className="font-medium text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <p className="text-sm text-gray-400">{user.location}</p>
            </div>

            <div>
              <span className="font-semibold text-gray-600">Status: </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                  user.status
                )}`}
              >
                {user.status}
              </span>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Orders: </span>
              {user.ordersCount}
            </div>
            <div>
              <span className="font-semibold text-gray-600">Spent: </span>$
              {user.totalSpent.toFixed(2)}
            </div>
            <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
          </div>
        ))}
      </div>

      {/* ✅ Empty State */}
      {users.length === 0 && (
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
            No users found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserList;
