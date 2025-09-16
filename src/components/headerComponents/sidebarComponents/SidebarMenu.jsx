import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const SidebarMenu = ({ title, children, icon: Icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center px-4 py-3 text-left duration-300
          hover:bg-gray-300 ${open ? "bg-gray-300/70" : ""} `}
      >
        <div className="flex items-center gap-2 font-[Poppins] text-gray-700">
          {Icon && <Icon size={18} className="text-gray-600" />}
          <span>{title}</span>
        </div>
        {children && (
          <FaChevronDown
            className={`transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      {/* Submenu */}
      {children && (
        <div
          className={`overflow-hidden transition-all duration-500 ${
            open ? "max-h-60" : "max-h-0"
          } bg-gray-100/70`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
