import React from "react";
import Modal from "../../Modal";

const DesignerDetailsModal = ({ designer, onClose }) => {
  if (!designer) return null;

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
    <Modal
      isOpen={!!designer}
      onClose={onClose}
      title={`${designer.name} Details`}
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
            src={designer.avatar}
            alt={designer.name}
          />
          <div>
            <h4 className="text-lg font-semibold text-gray-900">{designer.name}</h4>
            <p className="text-gray-600">{designer.email}</p>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                designer.status
              )}`}
            >
              {designer.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Contact Information</h5>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Location:</span> {designer.location}
            </p>
          </div>

          <div>
            <h5 className="font-semibold text-gray-900 mb-2">Account Details</h5>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Join Date:</span> {designer.joinDate}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Last Login:</span> {designer.lastLogin}
            </p>
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900 mb-2">Activity Statistics</h5>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{designer.requestsHandled}</p>
              <p className="text-xs text-gray-500">Requests Handled</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                ${designer.earnings.toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">Total Earnings</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {designer.customerRating.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500">Customer Rating</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DesignerDetailsModal;
