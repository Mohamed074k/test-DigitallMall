// src/components/reelsComponents/ReelItem.jsx - Animation scoped to video + buttons only
import React from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useReelsFeed } from "../../../context/AppContext/ReelsFeedContext";
import ReelVideoPlayer from "./ReelVideoPlayer";
import { useNavigate } from "react-router-dom";

const ReelItem = ({ reel, videoRef, onNext, onPrev, isAnimating = false, animationDirection = "none" }) => {
  const { toggleLike, addToCartFromReel } = useReelsFeed();
  const isLiked = useReelsFeed().likedReels.includes(reel?.id);
  const navigate = useNavigate();

  const handleLike = () => toggleLike(reel?.id);
  
  const handleCart = () => {
    if (!reel || !reel.linkedProducts || reel.linkedProducts.length === 0) {
      alert("No products available for this reel");
      return;
    }
    
    try {
      const validProductIds = reel.linkedProducts.filter(id => id && typeof id === 'string');
      if (validProductIds.length === 0) {
        alert("No valid product IDs found");
        return;
      }
      const productIds = validProductIds.join(',');
      const encodedProductIds = encodeURIComponent(productIds);
      const url = `/products?reelId=${encodeURIComponent(reel.id)}&productIds=${encodedProductIds}`;
      navigate(url, { replace: false });
      console.log('Navigating to:', url);
    } catch (error) {
      console.error('Error in handleCart:', error);
      alert("Failed to navigate to products page");
    }
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Reel link copied to clipboard!");
  };

  if (!reel) {
    return <div>Loading...</div>;
  }

  // Determine transform for video + buttons container
  let transformClass = "";
  if (isAnimating) {
    if (animationDirection === "down") {
      transformClass = "translate-y-full";
    } else if (animationDirection === "up") {
      transformClass = "-translate-y-full";
    }
  }

  return (
    <div className="relative flex w-full h-screen items-center justify-center bg-black">
      {/* Main Animated Container — ONLY this moves */}
      <div 
        className={`w-full h-full flex flex-col items-center justify-center px-0 md:px-8 transition-transform duration-300 ease-in-out ${isAnimating ? transformClass : 'translate-y-0'}`}
        style={{ willChange: 'transform' }}
      >
        {/* Video Player + Buttons */}
        <div className="w-full h-full max-w-[520px] flex items-center justify-center relative">
          <ReelVideoPlayer reel={reel} videoRef={videoRef} />

          {/* Right-side Actions Panel (inside video) */}
          <div className="absolute right-4 top-3/5 transform -translate-y-1/2 flex flex-col items-center space-y-6 z-20">
            <button
              onClick={handleLike}
              className="flex flex-col items-center space-y-1"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? (
                <Heart size={26} color="#ff0000" />
              ) : (
                <Heart size={26} color="white" />
              )}
              <span className="text-xs text-white font-medium mb-3">
                {reel.analytics?.likes || 0}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center space-y-1"
              aria-label="Share reel"
            >
              <Share2 size={26} color="white" />
              <span className="text-xs text-white font-medium mb-3">
                {reel.analytics?.shares || 0}
              </span>
            </button>

            <button
              onClick={handleCart}
              className="flex flex-col items-center space-y-1"
              aria-label={`Add ${reel.productName} to cart`}
            >
              <ShoppingCart size={26} color="white" />
              <span className="text-xs text-white font-medium mb-4">Buy</span>
            </button>

            <div className="flex flex-col items-center space-y-3 md:hidden">
              <button
                onClick={onPrev}
                className="flex items-center justify-center w-10 h-10 bg-transparent text-white"
                aria-label="Previous reel"
              >
                <ChevronUp size={30} />
              </button>
              <button
                onClick={onNext}
                className="flex items-center justify-center w-10 h-10 bg-transparent text-white"
                aria-label="Next reel"
              >
                <ChevronDown size={30} />
              </button>
            </div>
          </div>

          {/* Bottom Info Overlay (Desktop Only) */}
          <div className="hidden md:block absolute bottom-8 left-0 right-0 flex flex-col items-center space-y-1 px-4 pointer-events-none z-20">
            <p className="text-sm text-gray-300 max-w-[500px] text-center line-clamp-2">
              {reel.description}
            </p>
          </div>

          {/* Mobile Bottom Info */}
          <div className="md:hidden absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-1 px-4 pointer-events-none z-20">
            <p className="text-xs text-gray-300 text-center line-clamp-2">
              {reel.description}
            </p>
          </div>
        </div>
      </div>

      {/* Prev + Next (DESKTOP ONLY, OUTSIDE ANIMATED AREA — STICKY) */}
      <div className="hidden md:flex flex-col items-center space-y-4 absolute right-6 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={onPrev}
          className="flex items-center my-2 justify-center w-12 h-12 bg-gray-700/60 hover:bg-gray-700 !rounded-full text-white"
          aria-label="Previous reel"
        >
          <ChevronUp size={28} />
        </button>
        <button
          onClick={onNext}
          className="flex items-center justify-center w-12 h-12 bg-gray-700/60 hover:bg-gray-700 !rounded-full text-white"
          aria-label="Next reel"
        >
          <ChevronDown size={28} />
        </button>
      </div>
    </div>
  );
};

export default ReelItem;