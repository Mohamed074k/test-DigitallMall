import React, { useState, useEffect, useRef } from "react";

const Carousel = ({
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = true,
  images = [],
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Default images if none provided
  const defaultImages = [
    "/images/slide-1.jpg",
    "/images/slide-2-b.jpg",
    "/images/slide-3.jpg",
  ];

  const carouselImages = images.length > 0 ? images : defaultImages;

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (loop) {
            return (prevIndex + 1) % carouselImages.length;
          } else {
            return prevIndex < carouselImages.length - 1
              ? prevIndex + 1
              : prevIndex;
          }
        });
      }, autoplayDelay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayDelay, loop, carouselImages.length, isHovered]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsHovered(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        {/* Images container */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${carouselImages.length * 100}%`,
          }}
        >
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: `${100 / carouselImages.length}%` }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.warn(`Failed to load image: ${image}`);
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex !space-x-2 z-10">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 !rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
