import React from 'react';
import { Link } from 'react-router-dom';

// Placeholder images for categories
import womenImg from '../../../assets/images/placeholder.png';
import menImg from '../../../assets/images/placeholder.png';
import kidsImg from '../../../assets/images/placeholder.png';
import accessoriesImg from '../../../assets/images/placeholder.png';
import shoesImg from '../../../assets/images/placeholder.png';
import bagsImg from '../../../assets/images/placeholder.png';

const TopCategories = () => {
  const categories = [
    { name: 'Women', image: womenImg, path: '/categories/women' },
    { name: 'Men', image: menImg, path: '/categories/men' },
    { name: 'Kids', image: kidsImg, path: '/categories/kids' },
    { name: 'Accessories', image: accessoriesImg, path: '/categories/accessories' },
    { name: 'Shoes', image: shoesImg, path: '/categories/shoes' },
    { name: 'Bags', image: bagsImg, path: '/categories/bags' },
    { name: 'Women', image: womenImg, path: '/categories/women' },
    { name: 'Men', image: menImg, path: '/categories/men' },
    { name: 'Kids', image: kidsImg, path: '/categories/kids' },
    { name: 'Accessories', image: accessoriesImg, path: '/categories/accessories' },
    { name: 'Shoes', image: shoesImg, path: '/categories/shoes' },
    { name: 'Bags', image: bagsImg, path: '/categories/bags' },
  ];

  return (
    <section className="top-categories mx-2 lg:mx-20 my-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center pb-8">Top Categories</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              className="flex flex-col items-center group relative z-0 hover:z-10 transition-all duration-300 !no-underline"
              style={{ marginLeft: index !== 0 ? '-1rem' : '0' }} // Overlap effect
            >
              <div className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-transform duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm md:text-base font-medium text-gray-800">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;