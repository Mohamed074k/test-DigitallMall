import { useState, useEffect } from "react";
import { useDesignerProfile } from "../../../context/designerContext/DesignerProfileContext";
import {
  User,
  Image as ImageIcon,
  PenTool,
  Lock,
  Shield,
} from "lucide-react";
import { toast } from "react-toastify";

function DesignerProfile() {
  const { profile, updateProfile } = useDesignerProfile();

  const [formData, setFormData] = useState(profile);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(profile));
  }, [formData, profile]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData).then(() => {
      toast.success("Profile updated successfully!");
    }).catch((error) => {
      toast.error(`Failed to update profile: ${error.message}`);
    });
  };

  return (
    <div className="max-w-5xl p-6 pl-4 sm:pl-6 md:pl-8 space-y-8">
      {/* Title */}
      <div className="flex items-center text-3xl font-semibold text-gray-900/70 font-[poppins]">
        <User size={28} className="text-gray-900/40 mr-3 animate-bounce" />
        <span className="text-gray-900">Profile</span> & Settings
      </div>

      {/* Form */}
      <form className="space-y-8">
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Personal Details</h3>
          {/* Name */}
          <div>
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <User size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Name</label>
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter your name"
            />
          </div>
          {/* Avatar */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <ImageIcon size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Avatar</label>
            </div>
            <div className="w-64 h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 cursor-pointer hover:border-black transition overflow-hidden">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="hidden shadow-md"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="w-full h-full cursor-pointer rounded-lg"
              >
                {formData.avatar ? (
                  <img
                    src={formData.avatar instanceof File ? URL.createObjectURL(formData.avatar) : formData.avatar}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 text-sm opacity-50">
                    <ImageIcon size={32} className="mb-2 text-gray-400" />
                    <span className="font-[poppins]">Upload Avatar</span>
                  </div>
                )}
              </label>
            </div>
          </div>
          {/* Bio */}
          <div className="mt-6">
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <PenTool size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Bio</label>
            </div>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none"
              placeholder="Write a short bio..."
            />
          </div>
        </div>

        {/* Skills / Specializations */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-4">Skills / Specializations</h3>
          <div>
            <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
              <PenTool size={16} className="text-gray-500" />
              <label className="text-sm font-medium text-gray-700">Skills</label>
            </div>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="e.g."
            />
            <p className="text-xs text-gray-500 mt-1">Optional - Add your skills or specializations.</p>
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

export default DesignerProfile;