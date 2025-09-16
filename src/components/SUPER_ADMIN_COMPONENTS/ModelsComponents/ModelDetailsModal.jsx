import React from "react";
import Modal from "../../Modal";

const ModelDetailsModal = ({ model, onClose }) => {
  if (!model) return null;

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
    <Modal
      isOpen={!!model}
      onClose={onClose}
      title={`${model.name} Details`}
      footer={
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Close
        </button>
      }
    >
      <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
        {/* Left Column - Model Data */}
        <div className="space-y-4">
          {/* Model Profile */}
          <div className="flex items-center space-x-3">
            <img
              className="h-16 w-16 rounded-full object-cover"
              src={model.profilePic}
              alt={model.name}
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-900">{model.name}</h4>
              <p className="text-sm text-gray-600">{model.location}</p>
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  model.status
                )}`}
              >
                {model.status}
              </span>
            </div>
          </div>

          {/* Model Information */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <h5 className="font-semibold text-gray-900 mb-1 text-sm">Personal Details</h5>
              <p className="text-gray-700 text-xs mb-1">
                <span className="font-medium">Age:</span> {model.age} years
              </p>
              <p className="text-gray-700 text-xs mb-1">
                <span className="font-medium">Height:</span> {model.height}
              </p>
              <p className="text-gray-700 text-xs">
                <span className="font-medium">Measurements:</span> {model.measurements}
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-gray-900 mb-1 text-sm">Account Details</h5>
              <p className="text-gray-700 text-xs mb-1">
                <span className="font-medium">Join Date:</span> {model.joinDate}
              </p>
              <p className="text-gray-700 text-xs mb-1">
                <span className="font-medium">Commission:</span> {model.commissionRate}%
              </p>
              <p className="text-gray-700 text-xs">
                <span className="font-medium">Total Earnings:</span> ${model.earnings.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-1 text-sm">Bio</h5>
            <p className="text-gray-700 text-xs">{model.bio}</p>
          </div>
        </div>

        {/* Right Column - Performance & Reels */}
        <div className="space-y-4">
          {/* Performance Statistics */}
          <div>
            <h5 className="font-semibold text-gray-900 mb-2 text-sm">Performance Overview</h5>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-lg font-bold text-blue-600">
                  {model.performance.totalViews.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total Views</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-lg font-bold text-green-600">
                  {model.performance.totalClicks.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">Total Clicks</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-lg font-bold text-purple-600">
                  {model.performance.avgSalesConversion.toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500">Avg. Conversion</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded">
                <p className="text-lg font-bold text-orange-600">
                  {model.performance.totalReels}
                </p>
                <p className="text-xs text-gray-500">Total Reels</p>
              </div>
            </div>
          </div>

          {/* Reels */}
          {model.reels && model.reels.length > 0 && (
            <div>
              <h5 className="font-semibold text-gray-900 mb-2 text-sm">Reels & Performance</h5>
              <div className="space-y-2">
                {model.reels.map((reel) => (
                  <div
                    key={reel.id}
                    className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
                  >
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-12 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h6 className="font-medium text-gray-900 text-xs">{reel.title}</h6>
                      <div className="grid grid-cols-3 gap-1 mt-1 text-xs">
                        <div>
                          <span className="text-gray-500 text-xs">Views:</span>
                          <p className="font-medium text-gray-900 text-xs">
                            {reel.views.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Clicks:</span>
                          <p className="font-medium text-gray-900 text-xs">
                            {reel.clicks.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-500 text-xs">Conversion:</span>
                          <p className="font-medium text-gray-900 text-xs">
                            {reel.salesConversion}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModelDetailsModal;
