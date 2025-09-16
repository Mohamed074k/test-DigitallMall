import React from "react";
import Modal from "../../Modal";

const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

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
    <Modal
      isOpen={!!user}
      onClose={onClose}
      title={`${user.name} Details`}
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src={user.avatar}
            alt={user.name}
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{user.name}</h4>
            <p className="text-gray-600">{user.email}</p>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                user.status
              )}`}
            >
              {user.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Contact Information</h5>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Location:</span> {user.location}
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Account Details</h5>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Join Date:</span> {user.joinDate}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Last Login:</span> {user.lastLogin}
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-2">Activity Statistics</h5>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{user.ordersCount}</p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${user.totalSpent.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Total Spent</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {user.ordersCount > 0
                  ? (user.totalSpent / user.ordersCount).toFixed(2)
                  : 0}
              </p>
              <p className="text-xs text-gray-500">Avg. Order</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
