// src/components/reelsComponents/ReelsPage.jsx - Updated without product details route
import React from "react";
import ReelsToggleBar from "./ReelsToggleBar";
import ReelsFeed from "./ReelsFeed";

const ReelsPage = () => {
  return (
    <div className="bg-white md:bg-white text-black h-screen overflow-hidden">
      {/* Reels Feed with integrated toggle */}
      <ReelsFeed />
    </div>
  );
};

export default ReelsPage;
