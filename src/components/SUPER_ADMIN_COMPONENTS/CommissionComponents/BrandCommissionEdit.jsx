import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

export default function BrandCommissionEdit({ brandData, onSave, onClose }) {
  const [commission, setCommission] = useState(brandData.commission);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`${brandData.name} Commission updated!`);
    onSave(brandData.id, { commission: Number(commission) });
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">Edit Commission</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Commission Field */}
          <div className="font-[poppins] mb-3">
            <Form.Control
              type="number"
              placeholder="Enter new commission"
              value={commission}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setCommission(e.target.value)}
              required
            />
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
