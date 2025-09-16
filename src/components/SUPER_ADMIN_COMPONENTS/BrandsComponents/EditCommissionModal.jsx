import React, { useState, useEffect } from "react";
import Modal from "../../Modal";

const EditCommissionModal = ({ brand, onSave, onClose }) => {
  const [commission, setCommission] = useState(0);

  useEffect(() => {
    if (brand) {
      setCommission(brand.commissionRate || 0);
    }
  }, [brand]);

  if (!brand) return null;

  const handleSave = () => {
    onSave(brand.id, commission);
    onClose();
  };

  return (
    <Modal
      isOpen={!!brand}
      onClose={onClose}
      title={`Edit Commission for ${brand.name}`}
      footer={
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      }
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Commission Rate (%)
          </label>
          <input
            type="number"
            value={commission}
            onChange={(e) => setCommission(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
            step="0.1"
          />
        </div>
        <p className="text-sm text-gray-600">
          Enter a commission rate between 0% and 100%.
        </p>
      </div>
    </Modal>
  );
};

export default EditCommissionModal;
