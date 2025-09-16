import React, { useEffect, useState } from "react";
import { useModelReels } from "../../../context/modelContext/ModelReelsContext";

const LikesEngagement = () => {
  const { reels } = useModelReels();

  const totalLikes = reels.reduce(
    (acc, reel) => acc + (reel.analytics?.likes || 0),
    0
  );

  const [displayedLikes, setDisplayedLikes] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; 
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        setDisplayedLikes(Math.floor(progress * totalLikes));
        requestAnimationFrame(animate);
      } else {
        setDisplayedLikes(totalLikes);
      }
    };

    requestAnimationFrame(animate);
  }, [totalLikes]);

  return (
    <div className="bg-black rounded-2xl shadow-md border border-gray-800 p-8 text-white relative overflow-hidden pb-8">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 text-center">
        <div>
          <p className="text-2xl md:text-3xl font-semibold font-[poppins]">
            Total Likes{" "}
          </p>
          <span className="text-2xl text-gray-300 font-[google_sans_mono] flex items-center justify-center gap-1">
            {displayedLikes}{" "}
            <span className="text-[13px] text-gray-300/90 ">likes</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LikesEngagement;
