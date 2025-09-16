import React, { useEffect, useState } from "react";
import { useModelReels } from "../../../context/modelContext/ModelReelsContext";

const SharesEngagement = () => {
  const { reels } = useModelReels();

  const totalShares = reels.reduce(
    (acc, reel) => acc + (reel.analytics?.shares || 0),
    0
  );

  const [displayedShares, setDisplayedShares] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; 
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setDisplayedShares(Math.floor(progress * totalShares));
        requestAnimationFrame(animate);
      } else {
        setDisplayedShares(totalShares);
      }
    };

    requestAnimationFrame(animate);
  }, [totalShares]);

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Total Shares{" "}
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono] flex items-center justify-center gap-1">
            {displayedShares}{" "}
            <span className="text-[13px] text-gray-300/90 ">shares</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SharesEngagement;
