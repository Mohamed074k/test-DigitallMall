import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import { CheckCircle } from "lucide-react";

export default function AddReelModal({ isOpen, onClose, onSave }) {
  const { products } = useBrandProducts();
  const [search, setSearch] = useState("");

  const [newReel, setNewReel] = useState({
    videoUrl: "",
    description: "",
    hashtags: "",
    linkedProducts: [],
    status: "Active",
  });
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setNewReel({ ...newReel, videoUrl: url });
      } else {
        alert("Please upload a valid video file");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setNewReel({ ...newReel, videoUrl: url });
      } else {
        alert("Please upload a valid video file");
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReel.videoUrl) {
      alert("Please upload a video file");
      return;
    }
    const reel = {
      ...newReel,
      hashtags: newReel.hashtags
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
    };
    onSave(reel);
    setNewReel({
      videoUrl: "",
      description: "",
      hashtags: "",
      linkedProducts: [],
      status: "Active",
    });
    setVideoFile(null);
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold font-[poppins]">
          Add New Reel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Video Upload
            </Form.Label>
            <div
              className={`relative border-2 ${
                dragActive ? "border-blue-500" : "border-gray-300"
              } border-dashed rounded-lg text-center hover:border-gray-800/30 transition-colors`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <Form.Control
                type="file"
                accept="video/*"
                className="!hidden"
                id="video-upload"
                onChange={handleFileChange}
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer w-full flex flex-col items-center justify-center space-y-3 p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="flex items-center justify-center mx-auto w-16 h-16 rounded-full bg-gray-200">
                  <svg
                    className="w-8 h-8 text-gray-500 animate-bounce"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V8m0 0L3 12m4-4l4 4m6 0V8m0 0l-4 4m4-4l4 4"
                    />
                  </svg>
                </div>

                <div className="text-center">
                  <p className="text-gray-700 font-medium">Upload your video</p>
                  <p className="text-gray-500 text-sm">
                    Drag & Drop or{" "}
                    <span className="text-blue-600 underline">browse</span>
                  </p>
                  <small className="text-gray-400">
                    Supported: MP4, WebM, AVI
                  </small>
                </div>
              </label>
            </div>
            {videoFile && (
              <div className="mt-3">
                <p className="text-sm text-gray-700">
                  Selected: {videoFile.name}
                </p>
                <video
                  src={newReel.videoUrl}
                  controls
                  className="w-full h-full object-cover rounded mt-2"
                />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Add your Description"
              value={newReel.description}
              className="!p-3 !outline-none !resize-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewReel({ ...newReel, description: e.target.value })
              }
              rows="4"
              required
            />
          </div>

          {/* Hashtags */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Hashtags
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="#tag1, #tag2, #tag3"
              value={newReel.hashtags}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) =>
                setNewReel({ ...newReel, hashtags: e.target.value })
              }
            />
          </div>

          {/* Linked Products */}
          <div className="font-[poppins] mb-3">
            <label className="text-gray-600 font-bold font-[poppins] text-sm">
              Select Products
            </label>

            {/* search bar */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-800/40 shadow-md"
            />

            {/* products grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
              {filteredProducts.map((p) => {
                const isSelected = newReel.linkedProducts.includes(p.id);
                return (
                  <div
                    key={p.id}
                    onClick={() =>
                      setNewReel((prev) => ({
                        ...prev,
                        linkedProducts: prev.linkedProducts.includes(p.id)
                          ? prev.linkedProducts.filter((pid) => pid !== p.id)
                          : [...prev.linkedProducts, p.id],
                      }))
                    }
                    className={`relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 !border-3 shadow-md ${
                      isSelected
                        ? "!border-green-500"
                        : "!border-gray-300 hover:!border-gray-500"
                    }`}
                  >
                    <span className="text-sm text-center font-medium">
                      {p.name}
                    </span>

                    {/* أيقونة الصح */}
                    {isSelected && (
                      <CheckCircle
                        className="absolute bottom-2 right-2 text-green-500 transition-transform duration-300 scale-110"
                        size={15}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between mb-4 font-[poppins]">
            <label className="text-gray-700">Active</label>
            <button
              type="button"
              onClick={() =>
                setNewReel({
                  ...newReel,
                  status: newReel.status === "Active" ? "Inactive" : "Active",
                })
              }
              className={`relative inline-flex h-6 w-11 items-center !rounded-full transition-colors duration-300 ${
                newReel.status === "Active" ? "bg-green-500" : "bg-gray-400"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform !rounded-full bg-white transition-transform duration-300 ${
                  newReel.status === "Active"
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button
            type="submit"
            className="w-full p-2 !font-[poppins] !bg-black duration-300"
          >
            Add Reel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
