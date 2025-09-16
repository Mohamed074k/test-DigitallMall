import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const LogoLoop = ({
  logos,
  speed = 240,
  direction = 'left',
  logoHeight = 96, // Increased from 80 to 96 for larger logos
  gap = 40,
  pauseOnHover = true,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = '#ffffff',
  ariaLabel = 'Logo slider',
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const logosWidth = container.scrollWidth / 2; // Half the width since logos are duplicated
    let position = 0;

    const animate = () => {
      if (!isPaused) {
        position = direction === 'left' ? position - 1 : position + 1;
        if (direction === 'left' && position <= -logosWidth) {
          position = 0;
        } else if (direction === 'right' && position >= 0) {
          position = -logosWidth;
        }
        container.style.transform = `translateX(${position}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPaused, direction]);

  const handleMouseEnter = () => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) setIsPaused(false);
  };

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
    >
      <div
        ref={containerRef}
        className="flex"
        style={{
          gap: `${gap}px`,
          whiteSpace: 'nowrap',
          animation: isPaused ? 'none' : undefined,
        }}
      >
        {/* Render logos twice for infinite loop */}
        {logos.concat(logos).map((logo, index) => (
          <Link
            key={`${logo.alt}-${index}`}
            to={logo.href}
            className={`flex flex-col items-center flex-shrink-0 transition-transform duration-300 !no-underline`}
            style={{ height: `${logoHeight + 32}px` }} // Adjusted for larger logo and text
          >
            <div className="w-[96px] h-[96px] rounded-full overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg">
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 text-sm md:text-base font-medium text-gray-800 group-hover:text-indigo-600">
              {logo.alt}
            </span>
          </Link>
        ))}
      </div>
      {/* Fade-out effect */}
      {fadeOut && (
        <>
          <div
            className="absolute top-0 left-0 h-full w-16"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
            }}
          />
          <div
            className="absolute top-0 right-0 h-full w-16"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
            }}
          />
        </>
      )}
    </div>
  );
};

export default LogoLoop;