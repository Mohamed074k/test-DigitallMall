import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarItem = ({ label, path, icon: Icon }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(path);
  };

  return (
    <div
      onClick={handleClick}
      className="font-[Poppins] text-gray-700 px-4 py-3 hover:bg-gray-300 duration-300 cursor-pointer flex items-center gap-2"
    >
      {Icon && <Icon size={18} className="text-gray-600" />}
      <span>{label}</span>
    </div>
  );
};

export default SidebarItem;
