import { useState, useEffect, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useBrandProducts } from "../../../context/brandContext/BrandProductsContext"; 
import { CheckCircle } from "lucide-react";

export default function EditReelModal({ isOpen, onClose, onSave, reelData }) {
  const { products } = useBrandProducts();
  const [search, setSearch] = useState("");
  const [reel, setReel] = useState({
    id: "",
    videoUrl: "",
    thumbnail: "",
    description: "",
    hashtags: "",
    linkedProducts: [],
    status: "Active",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const videoRef = useRef(null);

  // Debug logging
  console.log("reelData:", reelData);
  console.log(
    "products (active brands):",
    products.filter((p) => p.brand?.status === "Active")
  );

  useEffect(() => {
    if (reelData) {
      setReel({
        id: reelData.id || "",
        videoUrl: reelData.videoUrl || "",
        thumbnail: reelData.thumbnail || "",
        description: reelData.description || "",
        hashtags: reelData.hashtags?.join(", ") || "",
        linkedProducts:
          reelData.linkedProducts?.map((p) =>
            typeof p === "object" ? p.id : String(p)
          ) || [],
        status: reelData.status || "Active",
      });
      setVideoFile(null);
      setThumbnailFile(null);
    }
    return () => {
      if (videoFile && reel.videoUrl) {
        URL.revokeObjectURL(reel.videoUrl);
      }
      if (thumbnailFile && reel.thumbnail) {
        URL.revokeObjectURL(reel.thumbnail);
      }
    };
  }, [reelData]);

  const handleFileChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "video" && file.type.startsWith("video/")) {
        if (videoFile && reel.videoUrl) {
          URL.revokeObjectURL(reel.videoUrl);
        }
        const url = URL.createObjectURL(file);
        setVideoFile(file);
        setReel({ ...reel, videoUrl: url });
      } else if (type === "thumbnail" && file.type.startsWith("image/")) {
        if (thumbnailFile && reel.thumbnail) {
          URL.revokeObjectURL(reel.thumbnail);
        }
        const url = URL.createObjectURL(file);
        setThumbnailFile(file);
        setReel({ ...reel, thumbnail: url });
      } else {
        alert(`Please upload a valid ${type} file`);
      }
    }
  };

  const generateAutoThumbnail = () => {
    if (videoRef.current && (videoFile || reel.videoUrl)) {
      videoRef.current.currentTime = 0;
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
      const url = canvas.toDataURL("image/png");
      setReel({ ...reel, thumbnail: url });
      setThumbnailFile(null);
    }
  };

  const filteredProducts = products
.filter((p) => p.status?.toLowerCase() === "active")
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reel.videoUrl) {
      alert("Please provide a video URL or upload a video file");
      return;
    }
    if (!reel.thumbnail) {
      alert("Please upload a thumbnail or generate one automatically");
      return;
    }
    const updatedReel = {
      id: reel.id,
      video: videoFile,
      videoUrl: reel.videoUrl,
      thumbnail: thumbnailFile || reel.thumbnail,
      description: reel.description,
      hashtags: reel.hashtags
        .split(",")
        .map((h) => h.trim())
        .filter((h) => h),
      linkedProducts: reel.linkedProducts,
      status: reel.status,
      analytics: reelData.analytics || { views: 0, likes: 0, shares: 0 },
    };
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
            <Form.Label className="text-gray-600 font-bold font-[poppins] text-sm">
              Video
            </Form.Label>
            <div className="relative border-2 border-gray-300 border-dashed rounded-lg text-center hover:border-gray-800/30 transition-colors">
              <Form.Control
                type="file"
                accept="video/*"
                className="!hidden"
                id="video-upload"
                onChange={(e) => handleFileChange(e, "video")}
              />
              <label
                htmlFor="video-upload"
                className="cursor-pointer w-full flex flex-col items-center justify-center space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="text-center">
                  <p className="text-gray-700 font-medium">Upload new video</p>
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
            {reel.videoUrl && (
              <div className="mt-3">
                <video
                  ref={videoRef}
                  src={reel.videoUrl}
                  controls
                  className="w-full h-full object-cover rounded-lg"
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
                  accept="image/*"
                  className="!hidden"
                  id="thumbnail-upload"
                  onChange={(e) => handleFileChange(e, "thumbnail")}
                />
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer w-full flex flex-col items-center justify-center space-y-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-300"
                >
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">
                      Upload new thumbnail
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
                disabled={!reel.videoUrl}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
              >
                Auto Thumbnail
              </button> */}
            </div>
            {reel.thumbnail && (
              <div className="mt-3 border border-black h-full w-full ">
                <img
                  src={reel.thumbnail}
                  alt="Thumbnail preview"
                  className="h-full w-full object-cover mx-auto "
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
                const isSelected = reel.linkedProducts.includes(p.id);
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
            {filteredProducts.length === 0 && (
              <p className="text-gray-500 text-sm">No active brand products found.</p>
            )}
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