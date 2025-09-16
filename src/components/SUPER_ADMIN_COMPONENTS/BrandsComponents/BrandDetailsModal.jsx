import React from "react";
import Modal from "../../Modal";

const BrandDetailsModal = ({ brand, onClose }) => {
  if (!brand) return null;

  return (
    <Modal
      isOpen={!!brand}
      onClose={onClose}
      title={`${brand.name} Details`}
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
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Brand Information</h4>
          <p className="text-gray-700">{brand.info?.description || "No description available"}</p>
          <p className="text-gray-700 mt-2">
            <span className="font-medium">Contact:</span> {brand.info?.contact || "N/A"}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Documents</h4>
          {brand.documents && brand.documents.length > 0 ? (
            <ul className="space-y-1">
              {brand.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={`#${doc}`}
                    className="text-blue-600 hover:text-blue-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No documents uploaded</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Sales Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-sm">Total Sales</p>
              <p className="text-gray-900 font-medium">${brand.salesStats?.totalSales || 0}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-gray-900 font-medium">{brand.salesStats?.orders || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BrandDetailsModal;
