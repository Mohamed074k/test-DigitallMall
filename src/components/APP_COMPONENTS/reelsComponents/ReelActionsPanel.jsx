// import React from "react";
// import { Heart, Share2, ShoppingCart, HeartFilled } from "lucide-react";
// import { useReelsFeed } from "../../context/reelsContext/ReelsFeedContext";

// const ReelActionsPanel = ({ reel, onLike, onFavorite, onCart }) => {
//   const isLiked = useReelsFeed().likedReels.includes(reel.id);
//   const isFavorited = useReelsFeed().favoritedReels.includes(reel.id);

//   const handleLike = () => onLike(reel.id);
//   const handleFavorite = () => onFavorite(reel.id);
//   const handleCart = () => onCart(reel);

//   return (
//     <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-end space-y-4 z-10">
//       {/* Like */}
//       <button
//         onClick={handleLike}
//         className="flex flex-col items-center space-y-1"
//       >
//         {isLiked ? (
//           <HeartFilled size={24} color="#ff0000" />
//         ) : (
//           <Heart size={24} color="white" />
//         )}
//         <span className="text-xs text-white font-medium">{reel.likes}</span>
//       </button>

//       {/* Share */}
//       <button
//         onClick={() => {
//           navigator.clipboard.writeText(window.location.href);
//           alert("Reel link copied!");
//         }}
//         className="flex flex-col items-center space-y-1"
//       >
//         <Share2 size={24} color="white" />
//         <span className="text-xs text-white font-medium">{reel.shares}</span>
//       </button>

//       {/* Cart (Add Product) */}
//       <button
//         onClick={handleCart}
//         className="flex flex-col items-center space-y-1"
//       >
//         <ShoppingCart size={24} color="white" />
//         <span className="text-xs text-white font-medium">Buy</span>
//       </button>
//     </div>
//   );
// };

// export default ReelActionsPanel;