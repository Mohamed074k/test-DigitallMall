// import React from "react";
// import ReelsToggleBar from "./ReelsToggleBar";
// import ReelsFeed from "./ReelsFeed";

// const ReelsPage = () => {
//   return (
//     <div className="bg-white md:bg-white text-black h-screen overflow-hidden">
//       {/* Reels Feed with integrated toggle */}
//       <ReelsFeed />
//     </div>
//   );
// };

// export default ReelsPage;




// src/components/reelsComponents/ReelsPage.jsx - Updated with proper route handling
import React from "react";
import ReelsToggleBar from "./ReelsToggleBar";
import ReelsFeed from "./ReelsFeed";
import { Routes, Route } from "react-router-dom";
import ReelsProductDetails from "./ReelsProductDetails";

const ReelsPage = () => {
  return (
    <div className="bg-white md:bg-white text-black h-screen overflow-hidden">
      {/* Reels Feed with integrated toggle */}
      <ReelsFeed />
      
      {/* Product Details route - will be rendered in the same layout */}
      <Routes>
        <Route path="/products" element={<ReelsProductDetails />} />
      </Routes>
    </div>
  );
};

export default ReelsPage;