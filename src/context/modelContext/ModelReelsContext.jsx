import { createContext, useContext, useState } from "react";

const ModelReelsContext = createContext();

export function ModelReelsProvider({ children }) {
  const [reels, setReels] = useState([
    {
      id: "1",
      videoUrl: "https://example.com/video1.mp4",
      thumbnail: "https://example.com/thumb1.png",
      description: "Summer fashion reel",
      hashtags: ["#fashion", "#summer"],
      linkedProducts: ["prod_001", "prod_002"],
      status: "Active",
      analytics: { views: 1000, likes: 200, shares: 50 },
    },
    {
      id: "2",
      videoUrl: "https://example.com/video2.mp4",
      thumbnail: "https://example.com/thumb2.png",
      description: "Winter outfit showcase",
      hashtags: ["#winter", "#style"],
      linkedProducts: ["prod_003"],
      status: "Inactive",
      analytics: { views: 500, likes: 100, shares: 20 },
    },
    {
      id: "3",
      videoUrl: "https://example.com/video3.mp4",
      thumbnail: "https://example.com/thumb3.png",
      description: "Casual streetwear vibes",
      hashtags: ["#streetwear", "#casual"],
      linkedProducts: ["prod_004"],
      status: "Active",
      analytics: { views: 750, likes: 150, shares: 30 },
    },
    {
      id: "4",
      videoUrl: "https://example.com/video4.mp4",
      thumbnail: "https://example.com/thumb4.png",
      description: "Elegant evening dresses",
      hashtags: ["#evening", "#elegance"],
      linkedProducts: ["prod_005"],
      status: "Inactive",
      analytics: { views: 1200, likes: 300, shares: 70 },
    },
    {
      id: "5",
      videoUrl: "https://example.com/video5.mp4",
      thumbnail: "https://example.com/thumb5.png",
      description: "Sporty activewear collection",
      hashtags: ["#sports", "#activewear"],
      linkedProducts: ["prod_006"],
      status: "Active",
      analytics: { views: 900, likes: 220, shares: 40 },
    },
    {
      id: "6",
      videoUrl: "https://example.com/video6.mp4",
      thumbnail: "https://example.com/thumb6.png",
      description: "Beachwear essentials",
      hashtags: ["#beach", "#summerstyle"],
      linkedProducts: ["prod_007"],
      status: "Inactive",
      analytics: { views: 400, likes: 80, shares: 10 },
    },
    {
      id: "7",
      videoUrl: "https://example.com/video7.mp4",
      thumbnail: "https://example.com/thumb7.png",
      description: "Office formal looks",
      hashtags: ["#office", "#formal"],
      linkedProducts: ["prod_008"],
      status: "Active",
      analytics: { views: 1100, likes: 260, shares: 55 },
    },
    {
      id: "8",
      videoUrl: "https://example.com/video8.mp4",
      thumbnail: "https://example.com/thumb8.png",
      description: "Trendy autumn outfits",
      hashtags: ["#autumn", "#trendy"],
      linkedProducts: ["prod_009"],
      status: "Inactive",
      analytics: { views: 600, likes: 130, shares: 25 },
    },
    {
      id: "9",
      videoUrl: "https://example.com/video9.mp4",
      thumbnail: "https://example.com/thumb9.png",
      description: "Minimalist daily wear",
      hashtags: ["#minimal", "#dailylook"],
      linkedProducts: ["prod_010"],
      status: "Active",
      analytics: { views: 800, likes: 170, shares: 35 },
    },
    {
      id: "10",
      videoUrl: "https://example.com/video10.mp4",
      thumbnail: "https://example.com/thumb10.png",
      description: "Festival fashion inspiration",
      hashtags: ["#festival", "#boho"],
      linkedProducts: ["prod_001", "prod_010"],
      status: "Inactive",
      analytics: { views: 1500, likes: 350, shares: 90 },
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const paginate = (page) => {
    if (page >= 1 && page <= Math.ceil(reels.length / 10)) {
      setCurrentPage(page);
    }
  };

  const filterReels = ({ searchTerm, status }) => {
    return reels.filter((reel) => {
      const matchesSearch =
        reel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reel.hashtags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus = status === "all" || reel.status === status;
      return matchesSearch && matchesStatus;
    });
  };

  const addReel = async (reel) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      setReels((prev) => [...prev, { ...reel, id: String(prev.length + 1) }]);
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return false;
    }
  };

  const updateReel = async (id, reel) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      setReels((prev) =>
        prev.map((r) => (r.id === id ? { ...r, ...reel } : r))
      );
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return false;
    }
  };

  const deleteReel = async (id) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      setReels((prev) => prev.filter((r) => r.id !== id));
      setLoading(false);
      return true;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return false;
    }
  };

  return (
    <ModelReelsContext.Provider
      value={{
        reels,
        loading,
        error,
        currentReels: reels.slice((currentPage - 1) * 10, currentPage * 10),
        currentPage,
        totalPages: Math.ceil(reels.length / 10),
        paginate,
        filterReels,
        addReel,
        updateReel,
        deleteReel,
      }}
    >
      {children}
    </ModelReelsContext.Provider>
  );
}

export const useModelReels = () => useContext(ModelReelsContext);
