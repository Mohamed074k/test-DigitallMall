// src/context/brandContext/BrandPublicProfileContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { mockBrands } from "../../data/mockAppProducts"; // ✅ Import generated brands

const AppBrandProfileContext = createContext();

export function AppBrandProfileProvider({ children, brandSlug }) {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // ✅ Find brand by slug
        const foundBrand = mockBrands.find(
          (b) => b.slug === brandSlug
        );

        if (!foundBrand) {
          throw new Error("Brand not found");
        }

        setBrand(foundBrand);
      } catch (error) {
        console.error("Failed to load brand:", error);
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };

    if (brandSlug) {
      fetchBrand();
    }
  }, [brandSlug]);

  const toggleFollow = () => {
    setBrand((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isFollowing: !prev.isFollowing,
        followers: prev.isFollowing ? prev.followers - 1 : prev.followers + 1,
      };
    });
  };

  const toggleFavorite = () => {
    setBrand((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isFavorited: !prev.isFavorited,
      };
    });
  };

  return (
    <AppBrandProfileContext.Provider value={{ brand, loading, toggleFollow, toggleFavorite }}>
      {children}
    </AppBrandProfileContext.Provider>
  );
}

export const useBrandProfile = () => {
  const context = useContext(AppBrandProfileContext);
  if (!context) {
    throw new Error("useBrandProfile must be used within a AppBrandProfileProvider");
  }
  return context;
};

export default AppBrandProfileContext;