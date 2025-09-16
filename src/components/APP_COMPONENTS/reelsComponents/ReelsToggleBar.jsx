import React from "react";
import { useReelsFeed } from "../../../context/AppContext/ReelsFeedContext";

const ReelsToggleBar = () => {
  const { filterMode, setFilterMode } = useReelsFeed();

  return (
    <div className="flex justify-center">
      <div className="flex bg-transparent  rounded-full p-1 px-4">
        <button
          onClick={() => setFilterMode("you")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            filterMode === "you"
              ? "text-white"
              : "text-gray-500"
          }`}
        >
          You
        </button>
        <span className="text-gray-300 text-2xl  md:text-3xl">|</span>
        <button
          onClick={() => setFilterMode("following")}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
            filterMode === "following"
              ? "text-white"
              : "text-gray-500"
          }`}
        >
          Following
        </button>
      </div>
    </div>
  );
};

export default ReelsToggleBar;