import { useState, useEffect, useRef } from "react";
import { useBrandProfile } from "../../../context/brandContext/BrandProfileContext";
import {
  Store,
  Image as ImageIcon,
  Mail,
  Info,
  Truck,
  Shield,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";

function BrandProfile() {
  const { profile, updateProfile } = useBrandProfile();
  const [formData, setFormData] = useState(profile);
  const [isChanged, setIsChanged] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(profile));
    // Cleanup temporary URLs on unmount
    return () => {
      if (formData.logo instanceof File) {
        URL.revokeObjectURL(formData.logo);
      }
    };
  }, [formData, profile]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData)
      .then(() => {
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        toast.error(`Failed to update profile: ${error.message}`);
      });
  };

  return (
    <div className="max-w-5xl p-6 pl-4 sm:pl-6 md:pl-8 space-y-8">
      {/* Title */}
      <div className="flex items-center text-3xl font-semibold text-gray-900/70 font-[poppins]">
        <Store size={28} className="text-gray-900/40 mr-3 animate-bounce" />
        <span className="text-gray-900"> Profile</span> & Settings
      </div>

      {/* Form */}
      <form className="space-y-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Brand Info</h3>
          {/* Name */}
          <div>
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Store size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Brand Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your brand name"
            />
          </div>
          {/* Logo */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <ImageIcon size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Logo</label>
            </div>
            <div
              onClick={handleClick}
              className="w-64 h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 cursor-pointer hover:border-black transition overflow-hidden"
            >
              <input
                type="file"
                name="logo"
                accept="image/*"
                onChange={handleChange}
                className="hidden shadow-md"
                id="logo-upload"
                ref={fileInputRef}
              />
              <label
                htmlFor="logo-upload"
                className="w-full h-full cursor-pointer rounded-lg"
              >
                {formData.logo ? (
                  <img
                    src={formData.logo instanceof File ? URL.createObjectURL(formData.logo) : formData.logo}
                    alt="Logo Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm opacity-50">
                    <ImageIcon size={32} className="mb-2 text-gray-400" />
                    <span className="font-[poppins]">Upload Logo</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          {/* Contact */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Mail size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Contact</label>
            </div>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter contact email or phone"
            />
          </div>
          {/* About Us */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Info size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">About Us</label>
            </div>
            <textarea
              name="aboutUs"
              value={formData.aboutUs}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none"
              placeholder="Write about your brand..."
            />
          </div>
        </div>

        {/* Store Policies */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Store Policies</h3>
          {/* Return Policy */}
          <div>
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Truck size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Return Policy</label>
            </div>
            <textarea
              name="returnPolicy"
              value={formData.returnPolicy}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none"
              placeholder="Enter your return policy..."
            />
          </div>
          {/* Shipping Info */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Truck size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Shipping Info</label>
            </div>
            <textarea
              name="shippingInfo"
              value={formData.shippingInfo}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none"
              placeholder="Enter your shipping information..."
            />
          </div>
        </div>

        {/* Security */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Security</h3>
          {/* Change Password */}
          <div>
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Lock size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Change Password</label>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4">
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="New password"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Confirm password"
              />
            </div>
          </div>
          {/* 2FA */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <Shield size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="twoFactorEnabled"
                checked={formData.twoFactorEnabled}
                onChange={handleChange}
                className="h-5 w-5 text-black focus:ring-2 focus:ring-black"
              />
              <span className="text-sm text-gray-700">Enable 2FA</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 flex justify-end font-[poppins]">
          <button
            onClick={handleSave}
            disabled={!isChanged}
            className={`px-4 py-2 !rounded-md text-white transition ${
              isChanged
                ? "!bg-black hover:!bg-gray-800 duration-300 animate-bounce"
                : "bg-gray-400 opacity-50 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default BrandProfile;