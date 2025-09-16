import React, { createContext, useState, useEffect } from "react";
import { mockBrands } from "../../data/mockBrands";

export const BrandContext = createContext();

export const BrandProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setBrands(mockBrands);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Approve brand
  const approveBrand = async (id) => {
    if (window.confirm("Approve this brand?")) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBrands(
          brands.map((brand) =>
            brand.id === id ? { ...brand, status: "Active" } : brand
          )
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Reject brand
  const rejectBrand = async (id) => {
    if (window.confirm("Reject this brand?")) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBrands(
          brands.map((brand) =>
            brand.id === id ? { ...brand, status: "Rejected" } : brand
          )
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Suspend brand
  const suspendBrand = async (id) => {
    if (window.confirm("Suspend this brand?")) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBrands(
          brands.map((brand) =>
            brand.id === id ? { ...brand, status: "Suspended" } : brand
          )
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Unsuspend brand
  const unsuspendBrand = async (id) => {
    if (window.confirm("Unsuspend this brand?")) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBrands(
          brands.map((brand) =>
            brand.id === id ? { ...brand, status: "Active" } : brand
          )
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Delete brand
  const deleteBrand = async (id) => {
    if (window.confirm("Delete this brand? This action cannot be undone.")) {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        setBrands(brands.filter((brand) => brand.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Edit commission
  const editCommission = async (id, commissionRate) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setBrands(
        brands.map((brand) =>
          brand.id === id ? { ...brand, commissionRate } : brand
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch brands on mount
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <BrandContext.Provider
      value={{
        brands,
        loading,
        error,
        fetchBrands,
        approveBrand,
        rejectBrand,
        suspendBrand,
        unsuspendBrand,
        deleteBrand,
        editCommission,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};
