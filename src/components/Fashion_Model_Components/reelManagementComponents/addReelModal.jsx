import { useState, useEffect, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import { CheckCircle } from "lucide-react";

export default function AddReelModal({ isOpen, onClose, onSave }) {
  const { products } = useBrandProducts();
  const [search, setSearch] = useState("");
  const [newReel, setNewReel] = useState({
    videoUrl: "",
    thumbnail: "",
    description: "",
    hashtags: "",
    linkedProducts: [],
    status: "Active",
  });
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const videoRef = useRef(null);

  // Debug logging
  useEffect(() => {
    console.log("Products (all brands):", products);
    console.log(
      "Products (active brands):",
      products?.filter((p) => p.brand?.status?.toLowerCase() === "active") || []
    );
    console.log("Linked Products:", newReel.linkedProducts);
  }, [products, newReel.linkedProducts]);

  // Cleanup temporary URLs
  useEffect(() => {
    return () => {
      if (videoFile && newReel.videoUrl) {
        URL.revokeObjectURL(newReel.videoUrl);
      }
      if (thumbnailFile && newReel.thumbnail) {
        URL.revokeObjectURL(newReel.thumbnail);
      }
    };
  }, [videoFile, thumbnailFile, newReel.videoUrl, newReel.thumbnail]);

  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (type === "video" && (e.type === "dragenter" || e.type === "dragover")) {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (type === "video" && file.type.startsWith("video/")) {
        if (videoFile && newReel.videoUrl) {
          URL.revokeObjectURL(newReel.videoUrl);
        }
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setNewReel({ ...newReel, videoUrl: url });
      } else if (type === "thumbnail" && file.type.startsWith("image/")) {
        if (thumbnailFile && newReel.thumbnail) {
          URL.revokeObjectURL(newReel.thumbnail);
        }
        const url = URL.createObjectURL(file);
        setThumbnailFile(file);
        setNewReel({ ...newReel, thumbnail: url });
      } else {
        alert(
          `Please upload a valid ${type} file (video: MP4/WebM/AVI, image: PNG/JPG/JPEG)`
        );
      }
    }
  };

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "video" && file.type.startsWith("video/")) {
        if (videoFile && newReel.videoUrl) {
          URL.revokeObjectURL(newReel.videoUrl);
        }
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setNewReel({ ...newReel, videoUrl: url });
      } else if (type === "thumbnail" && file.type.startsWith("image/")) {
        if (thumbnailFile && newReel.thumbnail) {
          URL.revokeObjectURL(newReel.thumbnail);
        }
        const url = URL.createObjectURL(file);
        setThumbnailFile(file);
        setNewReel({ ...newReel, thumbnail: url });
      } else {
        alert(
          `Please upload a valid ${type} file (video: MP4/WebM/AVI, image: PNG/JPG/JPEG)`
        );
      }
    }
  };

  const generateAutoThumbnail = () => {
    if (videoRef.current && videoFile) {
      videoRef.current.currentTime = 0;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 320;
      canvas.height = videoRef.current.videoHeight || 180;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const url = canvas.toDataURL("image/png");
      setNewReel({ ...newReel, thumbnail: url });
      setThumbnailFile(null); // Clear manual thumbnail
      console.log("Generated thumbnail URL:", url);
    } else {
      alert("Please upload a video first to generate a thumbnail.");
    }
  };

  const filteredProducts = (products || [])
    .filter((p) => p.status?.toLowerCase() === "active")
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReel.videoUrl) {
      alert("Please upload a video file.");
      return;
    }
    if (!newReel.thumbnail) {
      alert("Please upload a thumbnail or generate one automatically.");
      return;
    }
    if (!newReel.description.trim()) {
      alert("Please provide a description.");
      return;
    }
    const reel = {
      ...newReel,
      video: videoFile,
      thumbnail: thumbnailFile || newReel.thumbnail, // Use file or data URL
      hashtags: newReel.hashtags
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
      analytics: { views: 0, likes: 0, shares: 0 }, // Initialize analytics
    };
    console.log("Submitting reel:", reel);
    onSave(reel);
    setNewReel({
      videoUrl: "",
      thumbnail: "",
      description: "",
      hashtags: "",
      linkedProducts: [],
      status: "Active",
    });
    setVideoFile(null);
    setThumbnailFile(null);
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
              onDragEnter={(e) => handleDrag(e, "video")}
              onDragOver={(e) => handleDrag(e, "video")}
              onDragLeave={(e) => handleDrag(e, "video")}
              onDrop={(e) => handleDrop(e, "video")}
            >
              <Form.Control
                type="file"
                accept="video/mp4,video/webm,video/avi"
                className="!hidden"
                id="video-upload"
                onChange={(e) => handleFileChange(e, "video")}
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
                  ref={videoRef}
                  src={newReel.videoUrl}
                  controls
                  className="w-full object-cover rounded mt-2"
                />
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Thumbnail
            </Form.Label>
            <div className="flex gap-4 items-center">
              <div
                className="relative border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-800/30 transition-colors flex-1"
                onDragEnter={(e) => handleDrag(e, "thumbnail")}
                onDragOver={(e) => handleDrag(e, "thumbnail")}
                onDragLeave={(e) => handleDrag(e, "thumbnail")}
                onDrop={(e) => handleDrop(e, "thumbnail")}
              >
                <Form.Control
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  className="!hidden"
                  id="thumbnail-upload"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer w-full flex flex-col items-center justify-center space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
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
                    <p className="text-gray-700 font-medium">
                      Upload thumbnail
                    </p>
                    <p className="text-gray-500 text-sm">
                      Drag & Drop or{" "}
                      <span className="text-blue-600 underline">browse</span>
                    </p>
                    <small className="text-gray-400">
                      Supported: PNG, JPG, JPEG
                    </small>
                  </div>
                </label>
              </div>
              {/* <button
                type="button"
                onClick={generateAutoThumbnail}
                disabled={!videoFile}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Auto Thumbnail
              </button> */}
            </div>
            {newReel.thumbnail && (
              <div className="mt-3 flex justify-center">
                <img
                  src={newReel.thumbnail}
                  alt="Thumbnail preview"
                  className="h-full w-full object-cover rounded"
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
              placeholder="Add your description"
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
              Select Products (Active Brands)
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mb-4 mt-2 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-800/40 shadow-md"
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
              {filteredProducts.map((p) => {
                const isSelected = newReel.linkedProducts.includes(
                  String(p.id)
                );
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setNewReel((prev) => {
                        const updated = {
                          ...prev,
                          linkedProducts: prev.linkedProducts.includes(
                            String(p.id)
                          )
                            ? prev.linkedProducts.filter(
                                (pid) => pid !== String(p.id)
                              )
                            : [...prev.linkedProducts, String(p.id)],
                        };
                        console.log(
                          "Updated linkedProducts:",
                          updated.linkedProducts
                        );
                        return updated;
                      });
                    }}
                    className={`relative cursor-pointer rounded-lg p-3 flex flex-col items-center justify-center transition-all duration-300 border-2 shadow-md ${
                      isSelected
                        ? "border-green-500 bg-green-50"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                  >
                    <span className="text-sm text-center font-medium">
                      {p.name || "Unnamed Product"}
                    </span>
                    {isSelected && (
                      <CheckCircle
                        className="absolute bottom-2 right-2 text-green-500"
                        size={18}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-sm mt-2">
                No active brand products found. Please ensure active brands have
                products available.
              </p>
            )}
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
            className="w-full p-2 !font-[poppins] !bg-black hover:!bg-gray-800 !duration-300"
          >
            Add Reel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
