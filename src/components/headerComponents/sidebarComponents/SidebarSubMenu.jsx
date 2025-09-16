import React from "react";
import { useNavigate } from "react-router-dom";

const SidebarSubmenu = ({ label, path, icon: Icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="pl-9 py-3 hover:bg-gray-200 duration-300 cursor-pointer flex items-center gap-2 font-[Poppins] text-gray-700 text-sm"
    >
      {Icon && <Icon size={16} className="text-gray-600" />}
      {label}
    </div>
  );
};

export default SidebarSubmenu;
