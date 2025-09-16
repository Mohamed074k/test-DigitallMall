import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddPromo({ onAdd }) {
  const [show, setShow] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [totalLimit, setTotalLimit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!code.trim() || !discount.trim()) return;

    onAdd({
      id: Date.now(),
      code,
      discount,
      status: "active",
      userLimit: parseInt(userLimit, 10) || 1,
      totalLimit: parseInt(totalLimit, 10) || 100,
      usedCount: 0,
      startDate: startDate || null,
      endDate: endDate || null,
    });

    toast.success("Promo added successfully!");

    setCode("");
    setDiscount("");
    setUserLimit("");
    setTotalLimit("");
    setStartDate("");
    setEndDate("");
    handleClose();
  };

  return (
    <>
      <Button
        className="w-full sm:w-[250px] p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
        onClick={handleShow}
      >
        Add Promo
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Promo Code</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <Form onSubmit={handleSubmit}>
            {/* code */}
            <div className="lg:flex lg:gap-2">
              <div className="font-[poppins] mb-3 lg:w-1/3">
                <Form.Control
                  type="text"
                  placeholder="Promo Code"
                  value={code}
                  className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </div>

              {/* discount */}
              <div className="font-[poppins] mb-3 lg:w-2/3">
                <Form.Control
                  type="text"
                  placeholder="Discount"
                  value={discount}
                  className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
                  onChange={(e) => setDiscount(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* user limit */}
            <div className="font-[poppins] mb-3">
              <Form.Control
                type="number"
                placeholder="User Limit (per user)"
                value={userLimit}
                min="1"
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
                onChange={(e) => setUserLimit(e.target.value)}
                required
              />
            </div>

            {/* total limit */}
            <div className="font-[poppins] mb-3">
              <Form.Control
                type="number"
                placeholder="Total Limit"
                value={totalLimit}
                min="1"
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
                onChange={(e) => setTotalLimit(e.target.value)}
                required
              />
            </div>

            {/* start date */}
            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                value={startDate}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md"
                onChange={(e) => setStartDate(e.target.value)}
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>

            {/* end date */}
            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Date
              </label>
              <Form.Control
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
