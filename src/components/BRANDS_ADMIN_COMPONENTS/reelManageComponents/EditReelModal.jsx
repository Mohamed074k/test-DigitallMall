import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext";
import { CheckCircle } from "lucide-react";

export default function EditReelModal({ isOpen, onClose, onSave, reelData }) {
  const { products } = useBrandProducts();
  const [search, setSearch] = useState("");

  const [reel, setReel] = useState({
    id: "",
    videoUrl: "",
    description: "",
    hashtags: "",
    linkedProducts: [],
    status: "Active",
  });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    console.log("👉 reelData.linkedProducts:", reelData?.linkedProducts);
    console.log("👉 products:", products);
    if (reelData) {
      setReel({
        id: reelData.id || "",
        videoUrl: reelData.videoUrl || "",
        description: reelData.description || "",
        hashtags: reelData.hashtags?.join(", ") || "",
        // ✅ دايمًا نخزن IDs بس (strings)
        linkedProducts:
          reelData.linkedProducts?.map((p) =>
            typeof p === "object" ? p.id : String(p)
          ) || [],
        status: reelData.status || "Active",
      });
      setVideoFile(null);
    }
    return () => {
      if (videoFile) {
        URL.revokeObjectURL(reel.videoUrl);
      }
    };
  }, [reelData, products]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleVideoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer?.files[0] || e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      // Revoke previous temporary URL if exists
      if (videoFile && reel.videoUrl) {
        URL.revokeObjectURL(reel.videoUrl);
      }
      setVideoFile(file);
      setReel({ ...reel, videoUrl: URL.createObjectURL(file) });
    } else {
      console.error("Invalid file: Must be a video");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedReel = {
      id: reel.id,
      video: videoFile, // Include video file if uploaded
      videoUrl: reel.videoUrl, // Retain original URL if no new file
      description: reel.description,
      hashtags: reel.hashtags
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
      linkedProducts: reel.linkedProducts,
      status: reel.status,
      analytics: reelData.analytics,
      thumbnail: reelData.thumbnail,
    };
    console.log(
      "Saving updated reel with linkedProducts:",
      updatedReel.linkedProducts
    );
    console.log("Saving updated reel with video:", updatedReel.video);
    onSave(updatedReel);
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold font-[poppins]">Edit Reel</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "white" }}>
        <Form onSubmit={handleSubmit}>
          {/* Video Upload and Preview */}
          <div className="font-[poppins] mb-3">
            {/* Video URL */}
            <div className="font-[poppins] mb-3">
              <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
                Video URL
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Video URL"
                value={reel.videoUrl}
                className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
                onChange={(e) => setReel({ ...reel, videoUrl: e.target.value })}
                required
              />
            </div>
            {reel.videoUrl ? (
              <div className="mt-2">
                <video
                  src={reel.videoUrl}
                  controls
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <p className="text-gray-500 text-center">No video available</p>
            )}
          </div>

          {/* Description */}
          <div className="font-[poppins] mb-3">
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Description
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Description"
              value={reel.description}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30 !resize-none"
              onChange={(e) =>
                setReel({ ...reel, description: e.target.value })
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
              placeholder="Hashtags (comma separated, e.g., #tag1, #tag2)"
              value={reel.hashtags}
              className="!p-3 !outline-none !ring-0 !border-gray-300 focus:!ring-0 focus:!border-gray-800/30"
              onChange={(e) => setReel({ ...reel, hashtags: e.target.value })}
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
              className="w-full mb-4 mt-2 p-2 border border-gray-300 rounded-md outline-none focus:border-gray-800/40 shadow-md"
            />

            {/* products grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 max-h-[300px] overflow-y-auto">
              {filteredProducts.map((p) => {
                const isSelected = reel.linkedProducts.includes(p.id); // مش محتاج String هنا لأن p.id أصلاً string
                return (
                  <div
                    key={p.id}
                    onClick={() =>
                      setReel((prev) => ({
                        ...prev,
                        linkedProducts: isSelected
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
