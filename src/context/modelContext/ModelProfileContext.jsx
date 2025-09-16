 import { createContext, useContext, useState } from "react";

// Create the context
const ModelProfileContext = createContext();

// Initial profile state
const initialProfile = {
  name: "",
  profilePicture: null,
  bio: "",
  instagram: "",
  twitter: "",
  otherSocial: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false,
};

// Context provider
export function ModelProfileProvider({ children }) {
  const [profile, setProfile] = useState(initialProfile);

  // Function to update profile
  const updateProfile = async (updatedProfile) => {
    try {
      // Simulate API call to update profile
       await new Promise((resolve) => setTimeout(resolve, 500)); // Mock delay
      setProfile((prev) => ({
        ...prev,
        ...updatedProfile,
        // Only update passwords if they are valid and match
        newPassword: updatedProfile.newPassword && updatedProfile.newPassword === updatedProfile.confirmPassword ? updatedProfile.newPassword : prev.newPassword,
        confirmPassword: updatedProfile.newPassword && updatedProfile.newPassword === updatedProfile.confirmPassword ? updatedProfile.confirmPassword : prev.confirmPassword,
      }));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return (
    <ModelProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ModelProfileContext.Provider>
  );
}

// Custom hook to use the context
export function useModelProfile() {
  const context = useContext(ModelProfileContext);
  if (!context) {
    throw new Error("useModelProfile must be used within a ModelProfileProvider");
  }
  return context;
}
