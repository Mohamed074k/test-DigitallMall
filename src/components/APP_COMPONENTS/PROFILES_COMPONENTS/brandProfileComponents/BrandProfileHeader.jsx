// src/components/APP_COMPONENTS/profilesComponents/brandProfileComponents/BrandProfileHeader.jsx
import React from 'react';
import { Share, UserPlus, UserCheck, Heart } from 'lucide-react';
import { useBrandProfile } from '../../../../context/AppContext/AppBrandProfileContext';

const BrandProfileHeader = () => {
  const { brand, loading, toggleFollow, toggleFavorite } = useBrandProfile();

  if (loading || !brand) {
    return (
      <div className="bg-white rounded-lg p-6 animate-pulse w-full max-w-xl">
        <div className="space-y-6">
          {/* Logo + Name + Description Skeleton */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-200"></div>
            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto md:mx-0"></div>
              <div className="h-4 bg-gray-200 rounded w-full md:w-3/4 mx-auto md:mx-0"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
            <div className="h-4 bg-gray-200 rounded mx-auto md:mx-0 w-16"></div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-row gap-3 justify-center md:justify-start">
            <div className="h-11 bg-gray-200 rounded-lg w-[70%] md:w-32"></div>
            <div className="h-11 bg-gray-200 rounded-lg w-[30%] md:w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-4xl">
      <div className="space-y-6">

        {/* Logo + Name + Description + Stats (tablet/desktop inside) */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-4 md:gap-6">
          {/* Logo */}
          <img
            src={brand.logo || "/images/placeholder.png"}
            alt={brand.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white"
          />

          {/* Name + Description + Stats (tablet/desktop) */}
          <div className="flex-1 space-y-3 text-center md:!text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {brand.name}
            </h1>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {brand.description || "No description available."}
            </p>

            {/* Stats Row: hidden on mobile, shown on tablet/desktop */}
            <div className="hidden md:grid grid-cols-4 gap-3 pt-2">
              <StatItem label="Followers" value={brand.followers.toLocaleString()} />
              <StatItem label="Products" value={brand.productsCount} />
              <StatItem label="Reels" value={brand.reelsCount} />
              <StatItem label="Likes" value={brand.likes.toLocaleString()} />
            </div>
          </div>
        </div>

        {/* Stats Row (mobile only) */}
        <div className="grid grid-cols-2 gap-3 md:hidden">
          <StatItem label="Followers" value={brand.followers.toLocaleString()} />
          <StatItem label="Products" value={brand.productsCount} />
          <StatItem label="Reels" value={brand.reelsCount} />
          <StatItem label="Likes" value={brand.likes.toLocaleString()} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-3 justify-center md:justify-start">
          {/* Follow Button */}
          <button
            onClick={toggleFollow}
            className={`px-6 py-2.5 !rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 w-[50%] md:w-auto min-w-[120px] ${
              brand.isFollowing
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {brand.isFollowing ? (
              <>
                <UserCheck className="w-4 h-4" />
                <span>Following</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Follow</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button className="!px-0 md:!px-6 py-2.5 border border-gray-300 !rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2 w-[25%] md:w-auto min-w-[10px]">
            <Share className="w-4 h-4" />
            <span className="hidden md:inline">Share</span>
          </button>
          
          {/* Favorite Button */}
              <button
                      onClick={toggleFavorite}
                      className={`px-0 py-0 !rounded-lg font-medium transition-colors flex items-center justify-center  ${
                        brand.isFavorited
                          ? 'bg-transparent text-red-500 hover:bg-red-600'
                          : ' text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Heart className={` ${brand.isFavorited ? 'fill-current' : ''}`} />
                      <span className="hidden md:inline">{brand.isFavorited ? '' : ''}</span>
                    </button>
        </div>

      </div>
    </div>
  );
};

// Reusable Stat Item
const StatItem = ({ label, value }) => (
  <div className="text-center md:text-left p-2 bg-gray-50 rounded-lg">
    <div className="text-lg font-bold text-gray-900">{value}</div>
    <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
  </div>
);

export default BrandProfileHeader;
