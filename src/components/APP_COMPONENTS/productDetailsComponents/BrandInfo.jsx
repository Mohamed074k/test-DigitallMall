// src/components/APP_COMPONENTS/productDetailsComponents/BrandInfo.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BrandInfo = ({ brand, brandLogo, brandDescription }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="mt-8 p-6 border rounded-lg bg-white shadow-md relative">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        {/* Brand Logo */}
        <div className="w-20 h-20 flex-shrink-0">
          <img 
            src={brandLogo} 
            alt={`${brand} logo`}
            className="w-full h-full object-contain !rounded-md"
          />
        </div>
        
        {/* Brand Info */}
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-1">{brand}</h3>
          <p className="text-sm text-gray-600 mb-3">Official Store</p>
          <p className="text-gray-700 text-sm leading-relaxed">
            {brandDescription}
          </p>
        </div>
        
        {/* Action Buttons - Desktop Position */}
        <div className="hidden md:flex flex-col sm:flex-row gap-3">
          <button
            onClick={toggleFollow}
            className={`px-4 py-2 text-sm font-medium !rounded-lg transition-colors min-w-[120px] ${
              isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          
          <Link
            to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center !no-underline whitespace-nowrap"
          >
            Show Items
          </Link>
        </div>
      </div>
      
      {/* Action Buttons - Mobile Position (Top Right) */}
      <div className="flex flex-col gap-2 md:hidden absolute top-4 right-4">
        <button
          onClick={toggleFollow}
          className={`px-3 py-1 text-xs font-medium !rounded-lg transition-colors min-w-[80px] ${
            isFollowing
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
        
        <Link
          to={`/brand/${brand.toLowerCase().replace(/\s+/g, '-')}`}
          className="px-3 py-1 text-xs font-medium text-black border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-center !no-underline whitespace-nowrap"
        >
          Show Items
        </Link>
      </div>
    </div>
  );
};

export default BrandInfo;