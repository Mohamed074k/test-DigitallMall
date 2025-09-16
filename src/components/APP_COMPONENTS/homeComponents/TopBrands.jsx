import React from 'react';
import LogoLoop from './LogoLoop';

// Placeholder logo images for top 10 brands
const brandLogos = [
  { src: '/images/placeholder.png', alt: 'Brand 1', href: '/categories/brand1' },
  { src: '/images/placeholder.png', alt: 'Brand 2', href: '/categories/brand2' },
  { src: '/images/placeholder.png', alt: 'Brand 3', href: '/categories/brand3' },
  { src: '/images/placeholder.png', alt: 'Brand 4', href: '/categories/brand4' },
  { src: '/images/placeholder.png', alt: 'Brand 5', href: '/categories/brand5' },
  { src: '/images/placeholder.png', alt: 'Brand 6', href: '/categories/brand6' },
  { src: '/images/placeholder.png', alt: 'Brand 7', href: '/categories/brand7' },
  { src: '/images/placeholder.png', alt: 'Brand 8', href: '/categories/brand8' },
  { src: '/images/placeholder.png', alt: 'Brand 9', href: '/categories/brand9' },
  { src: '/images/placeholder.png', alt: 'Brand 10', href: '/categories/brand10' },
];

const TopBrands = () => {
  return (
    <section className="top-brands mx-0 lg:mx-20 my-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Top Brands</h2>
        <div className="relative h-[200px] md:h-[240px] overflow-hidden my-10">
          <LogoLoop
            logos={brandLogos}
            speed={240}
            direction="left"
            logoHeight={96} // Increased from 80 to 96
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#ffffff"
            ariaLabel="Top brands"
          />
        </div>
      </div>
    </section>
  );
};

export default TopBrands;