// src/components/reelsComponents/ReelsFeed.jsx - Animation props passed to ReelItem only
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react";
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

  const urlUpdatedRef = useRef(false);

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
    if (reels.length === 0) return;

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
    <div className="h-screen relative overflow-hidden">
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

      {/* ReelItem receives animation props — it will handle internal slide */}
      <ReelItem
        key={currentReel?.id || 'empty'}
        reel={currentReel}
        videoRef={videoRef}
        onNext={handleNext}
        onPrev={handlePrev}
        isAnimating={isAnimating}
        animationDirection={direction}
      />
    </div>
  );
};

export default ReelsFeed;