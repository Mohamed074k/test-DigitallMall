// // src/pages/App/Reels.jsx
// import React from "react";
// import ReelsPage from "../../components/APP_COMPONENTS/reelsComponents/ReelsPage";
// import { ReelsFeedProvider } from "../../context/AppContext/ReelsFeedContext";

// const Reels = () => {
//   const handleScrollPrevention = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   return (
//     <ReelsFeedProvider>
//       <div
//         onWheel={handleScrollPrevention}
//         onTouchMove={handleScrollPrevention}
//         style={{ overflow: 'hidden', height: '100vh', width: '100vw' }}
//         className="h-screen w-screen"
//       >
//         <ReelsPage />
//       </div>
//     </ReelsFeedProvider>
//   );
// };

// export default Reels;


// src/pages/App/Reels.jsx
import React from "react";
import ReelsPage from "../../components/APP_COMPONENTS/reelsComponents/ReelsPage";
import { ReelsFeedProvider } from "../../context/AppContext/ReelsFeedContext";

const Reels = () => {
  return (
    <ReelsFeedProvider>
      <div className="h-screen w-screen">
        <ReelsPage />
      </div>
    </ReelsFeedProvider>
  );
};

export default Reels;