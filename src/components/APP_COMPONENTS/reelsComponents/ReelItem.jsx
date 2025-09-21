// src/components/reelsComponents/ReelItem.jsx - Updated with Product Modal
import React, { useState } from "react";
import {
  Heart,
  Share2,
  ShoppingCart,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useReelsFeed } from "../../../context/AppContext/ReelsFeedContext";
import ReelVideoPlayer from "./ReelVideoPlayer";
import ReelsProductModal from "./ReelsProductModal";
import { useNavigate } from "react-router-dom";
import products from "../../../data/mockAppProducts";

const ReelItem = ({ reel, videoRef, onNext, onPrev, isAnimating = false, animationDirection = "none", showMobileControls = true }) => {
  const { toggleLike } = useReelsFeed();
  const isLiked = useReelsFeed().likedReels.includes(reel?.id);
  const navigate = useNavigate();
  
  // State for product modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleLike = () => toggleLike(reel?.id);
  
  const handleCart = () => {
    if (!reel || !reel.linkedProducts || reel.linkedProducts.length === 0) {
      alert("No products available for this reel");
      return;
    }
    
    // Open the modal instead of navigating
    setIsProductModalOpen(true);
  };
  
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Reel link copied to clipboard!");
  };

  if (!reel) {
    return <div>Loading...</div>;
  }

  // Get linked products for modal
  const linkedProducts = reel.linkedProducts
    ? reel.linkedProducts
        .map(productId => products.find(p => p.id === productId))
        .filter(product => product !== undefined)
    : [];

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
    <>
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
                aria-label={`View products from this reel`}
              >
                <ShoppingCart size={26} color="white" />
                <span className="text-xs text-white font-medium mb-4">Buy</span>
              </button>

              {/* Mobile Navigation - Only show if showMobileControls is true */}
              {showMobileControls && (
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
              )}
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

        {/* Desktop Navigation - Only show on desktop, removed from mobile */}
        {/* This section is now handled by ReelsFeed component */}
      </div>

      {/* Product Modal */}
      <ReelsProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        reel={reel}
        linkedProducts={linkedProducts}
        onProductClick={handleProductClick}
      />
    </>
  );
};

export default ReelItem;
