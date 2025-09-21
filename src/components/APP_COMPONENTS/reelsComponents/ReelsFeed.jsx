// src/components/reelsComponents/ReelsFeed.jsx - Updated with touch controls
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronUp, ChevronDown } from "lucide-react";
import ReelItem from "./ReelItem";
import ReelsToggleBar from "./ReelsToggleBar";
import { useReelsFeed } from "../../../context/AppContext/ReelsFeedContext";
import { useNavigate, useLocation } from "react-router-dom";

const ReelsFeed = () => {
  const { reels } = useReelsFeed();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("none");
  const [isAnimating, setIsAnimating] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Touch handling states
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTouching, setIsTouching] = useState(false);

  const urlUpdatedRef = useRef(false);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const updateUrlImmediately = (newReelId) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('reelId', newReelId);
    const newUrl = `${location.pathname}?${urlParams.toString()}`;
    if (newUrl !== window.location.href) {
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      navigate(newUrl, { replace: true, state: { forceUpdate: Date.now() } });
    }
    urlUpdatedRef.current = true;
  };

  const handleIndexChange = (newIndex, dir = "none") => {
    if (reels.length === 0 || isAnimating) return;

    const newReelId = reels[newIndex]?.id;
    if (newReelId) {
      setDirection(dir);
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex(newIndex);
        updateUrlImmediately(newReelId);
      }, 50);

      setTimeout(() => {
        setIsAnimating(false);
        setDirection("none");
      }, 300);
    }
  };

  useEffect(() => {
    if (reels.length > 0) {
      const urlParams = new URLSearchParams(location.search);
      const urlReelId = urlParams.get('reelId');
      if (urlReelId) {
        const foundIndex = reels.findIndex(reel => reel.id === urlReelId);
        if (foundIndex !== -1) {
          setCurrentIndex(foundIndex);
          urlUpdatedRef.current = true;
          return;
        }
      }
      if (!urlUpdatedRef.current) {
        updateUrlImmediately(reels[0].id);
      }
    }
  }, [reels, location.search]);

  useEffect(() => {
    if (reels.length > 0 && currentIndex >= 0 && currentIndex < reels.length) {
      const currentReelId = reels[currentIndex]?.id;
      if (currentReelId && !urlUpdatedRef.current) {
        updateUrlImmediately(currentReelId);
      }
    }
  }, [currentIndex, reels]);

  const restartVideo = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    if (!isAnimating) {
      restartVideo();
    }
  }, [currentIndex, isAnimating]);

  const handleNext = () => handleIndexChange((currentIndex + 1) % reels.length, "down");
  const handlePrev = () => handleIndexChange((currentIndex - 1 + reels.length) % reels.length, "up");

  // Touch handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
    setIsTouching(true);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || isAnimating) {
      setIsTouching(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe) {
      handleNext(); // Swipe up = next reel
    } else if (isDownSwipe) {
      handlePrev(); // Swipe down = previous reel
    }

    setIsTouching(false);
  };

  // Desktop keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, reels.length]);

  const handleBackToHome = () => navigate("/");

  const currentReel = reels[currentIndex];

  return (
    <div 
      className="h-screen relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Sticky UI — never moves */}
      <button
        onClick={handleBackToHome}
        className="absolute top-4 left-4 z-30 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-colors"
        aria-label="Back to Home"
      >
        <ArrowLeft size={20} />
      </button>

      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30">
        <ReelsToggleBar />
      </div>

      {/* Desktop Navigation Buttons - Hidden on Mobile */}
      <div className="hidden md:flex flex-col items-center space-y-4 absolute right-6 top-1/2 transform -translate-y-1/2 z-30">
        <button
          onClick={handlePrev}
          className="flex items-center my-2 justify-center w-12 h-12 bg-gray-700/60 hover:bg-gray-700 !rounded-full text-white"
          aria-label="Previous reel"
        >
          <ChevronUp size={28} />
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 bg-gray-700/60 hover:bg-gray-700 !rounded-full text-white"
          aria-label="Next reel"
        >
          <ChevronDown size={28} />
        </button>
      </div>

      {/* ReelItem receives animation props — it will handle internal slide */}
      <ReelItem
        key={currentReel?.id || 'empty'}
        reel={currentReel}
        videoRef={videoRef}
        onNext={handleNext}
        onPrev={handlePrev}
        isAnimating={isAnimating}
        animationDirection={direction}
        showMobileControls={false} // Don't show mobile nav buttons in ReelItem
      />
    </div>
  );
};

export default ReelsFeed;
