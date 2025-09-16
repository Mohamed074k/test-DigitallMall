import React, { createContext, useContext, useState } from "react";

const DesignerProfileContext = createContext();

export function DesignerProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    name: "Mohamed Elsayed", 
    avatar: null,
    bio: "Experienced designer with a passion for creative solutions.",
    skills: "Skills List",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  });

  const updateProfile = async (newProfile) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Simulate backend validation (e.g., password match)
          if (newProfile.newPassword !== newProfile.confirmPassword && newProfile.newPassword) {
            throw new Error("Passwords do not match");
          }
          // Update profile with new data
          setProfile((prev) => ({
            ...prev,
            ...newProfile,
            avatar: newProfile.avatar instanceof File ? URL.createObjectURL(newProfile.avatar) : newProfile.avatar,
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
    <DesignerProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </DesignerProfileContext.Provider>
  );
}

export const useDesignerProfile = () => {
  const context = useContext(DesignerProfileContext);
  if (!context) {
    throw new Error("useDesignerProfile must be used within a DesignerProfileProvider");
  }
  return context;
};

export default DesignerProfileContext;