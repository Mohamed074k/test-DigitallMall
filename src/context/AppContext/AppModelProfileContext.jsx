// src/context/AppContext/AppModelProfileContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Mock Models Data — replace with API later
export const mockModels = [
  {
    slug: "emma-stone",
    name: "Emma Stone",
    avatar: "/images/models/emma.jpg",
    bio: "Oscar-winning actress and fashion icon 🎬",
    followers: 1250000,
    videosCount: 47,
    likes: 8920000,
    isFollowing: false,
  },
  {
    slug: "ryan-gosling",
    name: "Ryan Gosling",
    avatar: "/images/models/ryan.jpg",
    bio: "Actor, musician, meme legend 🎸",
    followers: 980000,
    videosCount: 32,
    likes: 5430000,
    isFollowing: true,
  },
];

const AppModelProfileContext = createContext();

export function AppModelProfileProvider({ children, modelSlug }) {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModel = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API

        const foundModel = mockModels.find(
          (m) => m.slug === modelSlug
        );

        if (!foundModel) {
          throw new Error("Model not found");
        }

        setModel(foundModel);
      } catch (error) {
        console.error("Failed to load model:", error);
        setModel(null);
      } finally {
        setLoading(false);
      }
    };

    if (modelSlug) {
      fetchModel();
    }
  }, [modelSlug]);

  const toggleFollow = () => {
    setModel((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isFollowing: !prev.isFollowing,
        followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
      };
    });
  };

  return (
    <AppModelProfileContext.Provider value={{ model, loading, toggleFollow }}>
      {children}
    </AppModelProfileContext.Provider>
  );
}

export const useModelProfile = () => {
  const context = useContext(AppModelProfileContext);
  if (!context) {
    throw new Error("useModelProfile must be used within a AppModelProfileProvider");
  }
  return context;
};

export default AppModelProfileContext;