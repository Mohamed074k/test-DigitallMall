import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg shadow-sm bg-white ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-4 text-left font-semibold text-gray-700 hover:bg-gray-100 "
      >
        <span className="font-[fira_code]">{title}</span>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      <div
        className={`transition-all duration-300 overflow-hidden ${
          open ? "max-h-[1000px] p-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
