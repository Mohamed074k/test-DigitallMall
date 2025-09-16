import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AddDiscount({ onAdd }) {
  const [show, setShow] = useState(false);
  const [discount, setDiscount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!discount.trim()) return;

    onAdd({
      id: Date.now(),
      discount,
      status: "active",
      startDate: startDate || null,
      endDate: endDate || null,
    });

    toast.success("Discount added successfully!");

    setDiscount("");
    setStartDate("");
    setEndDate("");
    handleClose();
  };

  return (
    <>
      <Button
        className="w-full sm:w-[250px] mt-4 p-2 !font-[poppins] !bg-gray-900 hover:!bg-gray-900/80 duration-300"
        onClick={handleShow}
      >
        Add Discount
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Discount</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white" }}>
          <Form onSubmit={handleSubmit}>
            {/* discount */}

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

            {/* start + end date */}
            {/* <div className="d-flex gap-3">
              <Form.Group className="mb-3 flex-fill">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 flex-fill">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Form.Group>
            </div> */}

            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <Form.Control
                type="date"
                placeholder="Start Date"
                value={startDate}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="font-[poppins] mb-3">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                End Date
              </label>
              <Form.Control
                type="date"
                placeholder="End Date"
                value={endDate}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 shadow-md cursor-pointer"
                onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                onChange={(e) => setEndDate(e.target.value)}
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
