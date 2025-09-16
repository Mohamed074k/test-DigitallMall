import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ActiveDiscounts() {
  const navigate = useNavigate();

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden pb-12 lg:pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Active Discounts{" "}
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono]">
            18
            <span className="text-[11px] text-gray-300/90 pl-1">discount</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1 right-4 font-[monospace] tracking-wider animate-pulse text-[11px] lg:text-[16px]">
        <button onClick={() => navigate("/branddash/discounts")}>
          Tap to See Discounts{" "}
        </button>
      </div>
    </div>
  );
}

export default ActiveDiscounts;
