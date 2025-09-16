import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditDiscount({ discountData, onSave, onClose }) {
  const [discount, setDiscount] = useState(discountData.discount);
  const [startDate, setStartDate] = useState(discountData.startDate || "");
  const [endDate, setEndDate] = useState(discountData.endDate || "");
  const [status, setStatus] = useState(discountData.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(discountData.id, {
      discount,
      startDate,
      endDate,
      status,
    });
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Discount</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Discount */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Description"
              value={discount}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setDiscount(e.target.value)}
              required
            />
          </div>

          {/* Start Date */}
          <div className="font-[poppins] mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Start Date
            </label>
            <Form.Control
              type="date"
              value={startDate}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="font-[poppins] mb-3">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              End Date
            </label>
            <Form.Control
              type="date"
              value={endDate}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
              onFocus={(e) => e.target.showPicker && e.target.showPicker()}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Switch status */}
          {/* Switch status (Tailwind style) */}
          <div className="flex items-center justify-between mb-4">
            <label className="text-gray-700 font-[poppins]">Active</label>
            <button
              type="button"
              onClick={() =>
                setStatus(status === "active" ? "inactive" : "active")
              }
              className={`relative inline-flex h-6 w-11 items-center !rounded-full transition-colors duration-300 ${
                status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform !rounded-full bg-white transition-transform duration-300 ${
                  status === "active" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button
            type="submit"
            className="w-full p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
