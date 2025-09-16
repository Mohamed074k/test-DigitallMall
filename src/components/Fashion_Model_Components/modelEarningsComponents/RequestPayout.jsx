import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useModelEarnings } from "../../../context/modelContext/ModelEarningsContext";

const RequestPayout = ({ show, onHide }) => {
  const { requestPayout } = useModelEarnings();
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("");

  const payoutMethods = [
    { value: "Bank Transfer", label: "Bank Transfer" },
    { value: "Wallet", label: "Wallet" },
    { value: "PayPal", label: "PayPal" },
  ];

  const handlePayoutRequest = async (e) => {
    e.preventDefault();
    if (!payoutAmount || parseFloat(payoutAmount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }
    if (!payoutMethod) {
      toast.error("Please select a payout method.");
      return;
    }
    const success = await requestPayout(parseFloat(payoutAmount), payoutMethod);
    if (success) {
      toast.success("Payout request submitted successfully!");
      setPayoutAmount("");
      setPayoutMethod("");
      onHide();
    } else {
      toast.error("Failed to submit payout request.");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Request New Payout</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handlePayoutRequest}>
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="number"
              placeholder="Enter payout amount"
              value={payoutAmount}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setPayoutAmount(e.target.value)}
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="font-[poppins] mb-3">
            <Form.Select
              value={payoutMethod}
              onChange={(e) => setPayoutMethod(e.target.value)}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              required
            >
              <option value="">Select Payout Method</option>
              {payoutMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </Form.Select>
          </div>
          <button
            type="submit"
            className="w-full p-2 font-[poppins] !rounded-lg text-white bg-black hover:bg-gray-900/80 duration-300 flex justify-center items-center"
          >
            <FaMoneyCheckAlt className="w-4 h-4 mr-2" />
            Submit Request
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RequestPayout;