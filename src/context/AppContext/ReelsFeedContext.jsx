// import React, { createContext, useContext, useState, useEffect } from "react";
// import { mockReels, mockFollowing, mockUserFollows } from "../../data/mockReelsPage";

// const ReelsFeedContext = createContext();

// export const ReelsFeedProvider = ({ children }) => {
//   const [reels, setReels] = useState(mockReels);
//   const [filterMode, setFilterMode] = useState("you"); // "you" | "following"
//   const [likedReels, setLikedReels] = useState(
//     reels.filter((reel) => reel.isLiked).map((reel) => reel.id)
//   );
//   const [favoritedReels, setFavoritedReels] = useState(
//     reels.filter((reel) => reel.isFavorite).map((reel) => reel.id)
//   );

//   // Simulate initial following list
//   const followingIds = [
//     ...mockUserFollows.brandIds,
//     ...mockUserFollows.modelIds,
//   ];

//   // Filter reels based on mode
//   const filteredReels = filterMode === "following"
//     ? reels.filter((reel) => followingIds.includes(reel.userId))
//     : reels;

//   // Toggle like
//   const toggleLike = (reelId) => {
//     setLikedReels((prev) =>
//       prev.includes(reelId)
//         ? prev.filter((id) => id !== reelId)
//         : [...prev, reelId]
//     );
//     setReels((prev) =>
//       prev.map((reel) =>
//         reel.id === reelId
//           ? { ...reel, isLiked: !reel.isLiked }
//           : reel
//       )
//     );
//   };

//   // Toggle favorite
//   const toggleFavorite = (reelId) => {
//     setFavoritedReels((prev) =>
//       prev.includes(reelId)
//         ? prev.filter((id) => id !== reelId)
//         : [...prev, reelId]
//     );
//     setReels((prev) =>
//       prev.map((reel) =>
//         reel.id === reelId
//           ? { ...reel, isFavorite: !reel.isFavorite }
//           : reel
//       )
//     );
//   };

//   // Add product from reel to cart (triggered via cart button)
//   const addToCartFromReel = (reel) => {
//     console.log("Adding to cart:", reel.productName, "from reel", reel.id);
//     // This would call useCart().addToCart(reel.productId, reel)
//     // We'll implement this in CartContext later
//   };

//   const value = {
//     reels: filteredReels,
//     filterMode,
//     setFilterMode,
//     likedReels,
//     toggleLike,
//     favoritedReels,
//     toggleFavorite,
//     addToCartFromReel,
//     followingIds,
//   };

//   return (
//     <ReelsFeedContext.Provider value={value}>
//       {children}
//     </ReelsFeedContext.Provider>
//   );
// };

// export const useReelsFeed = () => {
//   const context = useContext(ReelsFeedContext);
//   if (!context) {
//     throw new Error("useReelsFeed must be used within ReelsFeedProvider");
//   }
//   return context;
// };

 // ReelsFeedContext.js
import React, { createContext, useContext, useState } from "react";
import { mockReels, mockUserFollows } from "../../data/mockReels";

const ReelsFeedContext = createContext();

export const ReelsFeedProvider = ({ children }) => {
  const [reels, setReels] = useState(mockReels);
  const [filterMode, setFilterMode] = useState("you"); // "you" | "following"
  const [likedReels, setLikedReels] = useState(
    mockReels.filter((reel) => reel.isLiked).map((reel) => reel.id)
  );
  const [favoritedReels, setFavoritedReels] = useState(
    mockReels.filter((reel) => reel.isFavorite).map((reel) => reel.id)
  );

  // Simulate initial following list
  const followingIds = [
    ...mockUserFollows.brandIds,
    ...mockUserFollows.modelIds,
  ];

  // Filter reels based on mode
  const filteredReels = filterMode === "following"
    ? reels.filter((reel) => followingIds.includes(reel.userId))
    : reels;

  // Toggle like - update both the liked state and the likes count
  const toggleLike = (reelId) => {
    setReels((prevReels) =>
      prevReels.map((reel) => {
        if (reel.id === reelId) {
          const isLiked = !reel.isLiked;
          return {
            ...reel,
            isLiked,
            likes: isLiked ? reel.likes + 1 : Math.max(0, reel.likes - 1)
          };
        }
        return reel;
      })
    );
    
    setLikedReels((prev) =>
      prev.includes(reelId)
        ? prev.filter((id) => id !== reelId)
        : [...prev, reelId]
    );
  };

  // Toggle favorite
  const toggleFavorite = (reelId) => {
    setFavoritedReels((prev) =>
      prev.includes(reelId)
        ? prev.filter((id) => id !== reelId)
        : [...prev, reelId]
    );
    setReels((prev) =>
      prev.map((reel) =>
        reel.id === reelId
          ? { ...reel, isFavorite: !reel.isFavorite }
          : reel
      )
    );
  };

  // Add product from reel to cart
  // const addToCartFromReel = (reel) => {
  //   console.log("Adding to cart:", reel.productName, "from reel", reel.id);
  // };

  const value = {
    reels: filteredReels,
    filterMode,
    setFilterMode,
    likedReels,
    toggleLike,
    favoritedReels,
    toggleFavorite,
    // addToCartFromReel,
    followingIds,
  };

  return (
    <ReelsFeedContext.Provider value={value}>
      {children}
    </ReelsFeedContext.Provider>
  );
};

export const useReelsFeed = () => {
  const context = useContext(ReelsFeedContext);
  if (!context) {
    throw new Error("useReelsFeed must be used within ReelsFeedProvider");
  }
  return context;
};