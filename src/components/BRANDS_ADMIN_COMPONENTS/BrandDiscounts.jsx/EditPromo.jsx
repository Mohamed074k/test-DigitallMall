// src/components/BRANDS_ADMIN_COMPONENTS/BrandDiscounts.jsx/EditPromo.jsx
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function EditPromo({ promoData, onSave, onClose }) {
  const [code, setCode] = useState(promoData.code);
  const [discount, setDiscount] = useState(promoData.discount);
  const [startDate, setStartDate] = useState(promoData.startDate || "");
  const [endDate, setEndDate] = useState(promoData.endDate || "");
  const [status, setStatus] = useState(promoData.status);

  // ✅ states بالأسامي من الموك داتا
  const [totalLimit, setTotalLimit] = useState(promoData.totalLimit || "");
  const [userLimit, setUserLimit] = useState(promoData.userLimit || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ لما تحفظ لازم تبعت بنفس الأسامي
    onSave(promoData.id, {
      code,
      discount,
      startDate,
      endDate,
      status,
      totalLimit,
      userLimit,
    });

    toast.success("Promo updated successfully!");

    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Promo Code</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Promo Code */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Promo Code"
              value={code}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>

          {/* Discount Value */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="text"
              placeholder="Discount %"
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

          <div className="flex justify-center gap-2.5">
            {/* ✅ Total Limit */}
            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Total Limit{" "}
              </label>
              <Form.Control
                type="number"
                placeholder="Total Limit"
                value={totalLimit}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
                onChange={(e) => setTotalLimit(e.target.value)}
              />
            </div>

            {/* ✅ User Limit */}
            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                User Limit{" "}
              </label>
              <Form.Control
                type="number"
                placeholder="User Limit"
                value={userLimit}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
                onChange={(e) => setUserLimit(e.target.value)}
              />
            </div>
          </div>

          {/* Switch status */}
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
