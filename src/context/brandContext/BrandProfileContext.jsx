import React, { createContext, useContext, useState } from "react";

const BrandProfileContext = createContext();

export function BrandProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "My Brand",
    logo: null,
    contact: "contact@mybrand.com",
    aboutUs: "We are a passionate brand delivering quality products.",
    returnPolicy: "30-day return policy for unused items.",
    shippingInfo: "Free shipping on orders over $50.",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const updateProfile = async (newProfile) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Validate password match
          if (newProfile.newPassword !== newProfile.confirmPassword && newProfile.newPassword) {
            throw new Error("Passwords do not match");
          }
          // Update profile with new data
          setProfile((prev) => ({
            ...prev,
            ...newProfile,
            logo: newProfile.logo instanceof File ? URL.createObjectURL(newProfile.logo) : newProfile.logo,
            newPassword: "",
            confirmPassword: "",
          }));
          console.log("Profile updated:", newProfile);
          resolve(true);
        } catch (error) {
          console.error("Update failed:", error.message);
          reject(error);
        }
      }, 500); // Simulate API delay
    });
  };

  return (
    <BrandProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </BrandProfileContext.Provider>
  );
}

export const useBrandProfile = () => {
  const context = useContext(BrandProfileContext);
  if (!context) {
    throw new Error("useBrandProfile must be used within a BrandProfileProvider");
  }
  return context;
};

export default BrandProfileContext;