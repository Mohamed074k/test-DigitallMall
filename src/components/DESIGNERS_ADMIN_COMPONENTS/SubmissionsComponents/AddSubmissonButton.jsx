import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { PenTool, ImageIcon, FileQuestionMark } from "lucide-react";
import { toast } from "react-toastify";

export default function AddSubmissionModal({
  show,
  onClose,
  onSave,
  requests,
}) {
  const [selectedRequest, setSelectedRequest] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) {
      toast.error("Please select a request before submitting!");
      return;
    }
    onSave({
      requestId: selectedRequest,
      description,
      images,
    });
    toast.success("Submission added successfully!");

    // reset form
    setSelectedRequest("");
    setDescription("");
    setImages([]);
    onClose();
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size="lg"
      className="font-[poppins]"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold font-[poppins]">
          Add New Submission
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Requests Dropdown */}
          <div className="mb-4">
            <Form.Label className="font-[poppins] text-gray-700 ">
              <div className="flex justify-start items-center gap-1.5">
                <FileQuestionMark size={16} className="text-gray-500" />
                Select Request
              </div>
            </Form.Label>
            <Form.Select
              value={selectedRequest}
              onChange={(e) => setSelectedRequest(e.target.value)}
              className="!p-3 !outline-none shadow-md !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 cursor-pointer"
              required
            >
              <option className="!p-2" value="">
                Choose a request...
              </option>
              {requests.map((req) => (
                <option
                  className="!p-2"
                  key={req.requestId}
                  value={req.requestId}
                >
                  {req.requestId} - {req.customerName}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <PenTool size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none"
              placeholder="Write a short description..."
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <ImageIcon size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">
                Upload Designs
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Uploaded images */}
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-full h-48 flex items-center justify-center rounded-lg border border-gray-300 overflow-hidden relative"
                >
                  <img
                    src={img instanceof File ? URL.createObjectURL(img) : img}
                    alt={`design-${idx}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}

              {/* Upload Box */}
              <div className="w-full h-48 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 cursor-pointer hover:border-black transition overflow-hidden">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  id="design-upload"
                />
                <label
                  htmlFor="design-upload"
                  className="w-full h-full cursor-pointer rounded-lg"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm opacity-50">
                    <ImageIcon size={32} className="mb-2 text-gray-400" />
                    <span className="font-[poppins]">Upload Avatar</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-full lg:w-[400px]  p-2 mt-2 !font-[poppins] !bg-black hover:!bg-black/80 duration-300 rounded-lg"
            >
              Add Submission
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
