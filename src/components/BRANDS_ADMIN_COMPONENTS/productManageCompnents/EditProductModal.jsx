import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";

export default function EditReelModal({ isOpen, onClose, onSave, reelData }) {
  const { products } = useBrandProducts();
  const [reel, setReel] = useState({
    id: "",
    videoUrl: "",
    description: "",
    hashtags: "",
    linkedProduct: "", // Changed to single product ID
    status: "Active",
  });

  useEffect(() => {
    if (reelData) {
      setReel({
        id: reelData.id || "",
        videoUrl: reelData.videoUrl || "",
        description: reelData.description || "",
        hashtags: reelData.hashtags?.join(", ") || "",
        linkedProduct: reelData.linkedProducts?.[0] || "", // Take first product or empty string
        status: reelData.status || "Active",
      });
    }
  }, [reelData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReel = {
      id: reel.id,
      videoUrl: reel.videoUrl,
      description: reel.description,
      hashtags: reel.hashtags
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
      linkedProducts: reel.linkedProduct ? [reel.linkedProduct] : [], // Convert to array for consistency
      status: reel.status,
      analytics: reelData.analytics, // Preserve analytics
      thumbnail: reelData.thumbnail, // Preserve thumbnail
    };
    onSave(updatedReel);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold font-[poppins]">
          Edit Reel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Video URL */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-700">Video URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Video URL"
              value={reel.videoUrl}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setReel({ ...reel, videoUrl: e.target.value })
              }
              required
            />
          </div>

          {/* Description */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-700">Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={reel.description}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setReel({ ...reel, description: e.target.value })
              }
              rows="4"
              required
            />
          </div>

          {/* Hashtags */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-700">Hashtags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Hashtags (comma separated, e.g., #tag1, #tag2)"
              value={reel.hashtags}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setReel({ ...reel, hashtags: e.target.value })
              }
            />
          </div>

          {/* Linked Product */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-700">Linked Product</Form.Label>
            <Form.Select
              value={reel.linkedProduct}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setReel({ ...reel, linkedProduct: e.target.value })
              }
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4 font-[poppins]">
            <label className="text-gray-700">Active</label>
            <button
              type="button"
              onClick={() =>
                setReel({
                  ...reel,
                  status: reel.status === "Active" ? "Inactive" : "Active",
                })
              }
              className={`relative inline-flex h-6 w-11 items-center !rounded-full transition-colors duration-300 ${
                reel.status === "Active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform !rounded-full bg-white transition-transform duration-300 ${
                  reel.status === "Active" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button
            type="submit"
            className="w-full p-2 !font-[poppins] !bg-black duration-300"
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}