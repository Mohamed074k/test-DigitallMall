import { useState, useEffect } from "react";
import { usePlatformSettings } from "../../../context/superAdminContext/PlatformSettingsContext";
import {
  Settings,
  Image as ImageIcon,
  Globe,
  FileText,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "react-toastify";

function PlatformSettings() {
  const { settings, updateSettings } = usePlatformSettings();

  const [formData, setFormData] = useState(settings);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(JSON.stringify(formData) !== JSON.stringify(settings));
  }, [formData, settings]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-5xl p-6 pl-4 sm:pl-6 md:pl-8 space-y-8">
      {/* Title */}
      <div className="flex items-center text-3xl font-semibold text-gray-900/70 font-[poppins]">
        <Settings size={28} className="text-gray-900/40 mr-3 animate-bounce" />
        <span className="text-gray-900">Platform</span> Settings
      </div>

      {/* Form */}
      <form className="space-y-8">
        {/* Site Name */}
        <div>
          <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
            <Globe className="w-4 h-4  text-gray-500" />
            <label className=" text-sm font-medium text-gray-700">
              Site Name
            </label>
          </div>
          <div className="font-[poppins]">
            <input
              type="text"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Enter site name"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
            <ImageIcon size={16} className="text-gray-500" />
            <label className=" text-sm font-medium text-gray-700">Logo</label>
          </div>

          <div className="w-64 h-64 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-400 cursor-pointer hover:border-black transition overflow-hidden">
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="hidden shadow-md"
              id="logo-upload"
            />
            <label
              htmlFor="logo-upload"
              className="w-full h-full cursor-pointer 
              rounded-lg"
            >
              {formData.logo ? (
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="Logo Preview"
                  className="w-full h-full object-cover rounded-lg"
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

        {/* Description */}
        <div>
          <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
            <FileText size={16} className="text-gray-500" />
            <label className=" text-sm font-medium text-gray-700">
              Description
            </label>
          </div>

          <div className="font-[poppins]">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black !resize-none "
              placeholder="Write a short description..."
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
            <Phone size={16} className="text-gray-500" />
            <label className=" text-sm font-medium text-gray-700">
              Phone Number
            </label>
          </div>
          <div className="font-[poppins]">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="+20 123 456 7890"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="flex flex-row justify-start items-center gap-1.5 mb-2">
            <Mail size={16} className="text-gray-500" />
            <label className=" text-sm font-medium text-gray-700">Email</label>
          </div>
          <div className="font-[poppins]">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full shadow-md rounded-lg border border-gray-400 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="your@email.com"
            />
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

export default PlatformSettings;
