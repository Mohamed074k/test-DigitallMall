import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useModelReels } from "../../../context/modelContext/ModelReelsContext";

const TotalReelsUploaded = () => {
  const { reels } = useModelReels();
  const navigate = useNavigate();

  const reelsCount = reels.length;
  const label = reelsCount === 1 ? "reel" : "reels";

  const [displayedCount, setDisplayedCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; 
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setDisplayedCount(Math.floor(progress * reelsCount));
        requestAnimationFrame(animate);
      } else {
        setDisplayedCount(reelsCount);
      }
    };

    requestAnimationFrame(animate);
  }, [reelsCount]);

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden pb-12 lg:pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Total Reels Uploaded
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono] flex items-center justify-center gap-1">
            {displayedCount}{" "}
            <span className="text-[13px] text-gray-300/90 ">{label}</span>
          </span>
        </div>
      </div>

      <div className="absolute bottom-1 right-4 font-[monospace] tracking-wider animate-pulse text-[11px] lg:text-[16px]">
        <button onClick={() => navigate("/fashionmodeldash/management/reels")}>
          Tap to See Reels
        </button>
      </div>
    </div>
  );
};

export default TotalReelsUploaded;
