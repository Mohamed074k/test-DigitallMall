import React from 'react';
import Carousel from './Carousel';

// Import images from assets folder (recommended approach for better optimization)
import slide1 from '../../../assets/images/slide-1.jpg';
import slide2 from '../../../assets/images/slide-2-b.jpg';
import slide3 from '../../../assets/images/slide-3.jpg';

const Hero = () => {
  const carouselImages = [slide1, slide2, slide3];

  return (
    <section className="hero pb-3 mx-2 lg:mx-20 my-10">
      <div className="relative bg-gray-900 text-white rounded-3xl mx-3 overflow-hidden h-[550px] md:h-[600px]">
        {/* Carousel Component */}
        <div style={{ height: '600px', position: 'relative' }}>
          <Carousel
            baseWidth={300}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            images={carouselImages}
            className="h-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
